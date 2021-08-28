<template>
  <div class="content-wrapper">
    <Navigation
      :scale="scale"
      @scaleChanged="scaleChanged"
      @dateFromChanged="dateFromChanged"
      @hideWeekendsChanged="hideWeekendsChanged"
    />
    <v-expansion-panels :hover="true" :multiple="true" :value="openTeamsIndexes" @change="openTeamsChanged">
      <v-expansion-panel v-for="team in teams" :key="team.id">
        <v-expansion-panel-header :color="team.color" :style="{ color: fontColorForBg(team.color) }">
          {{ team.name }} [{{ team.peopleCount }}]
          <template v-slot:actions>
            <v-icon :color="fontColorForBg(team.color)">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Schedule
            :teamData="teamsData[team.id]"
            :team="team"
            :isoDateFrom="isoDateFrom"
            :isoDateTo="isoDateTo"
            :holidays="holidays"
            :hideWeekends="hideWeekends"
            :scale="scale"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import './schedulePage.scss';
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPersonWithSchedule } from '@/interfaces/models/person.model.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';
import activityTypesService from '@/services/stubs/activityTypes.stub.service';
import holidaysService from '@/services/holidays.service';
import scheduleService from '@/services/stubs/activities.stub.service';
import peopleService from '@/services/stubs/people.stub.service';
import teamsService from '@/services/teams.service';
import scheduleStatsService from '@/services/scheduleStats.service';
import { fontColorForBackground } from '@/utils/color.utils';
import { findDateTo, SCALE_BIWEEKLY, updateDateFrom } from '@/utils/date.utils';
import Schedule from './schedule.component.vue';
import { TeamData, TEAM_DATA_DEFAULT_VALUES } from './teamData.dto';
import Navigation from './scheduleNavigation.component.vue';

const async = require('neo-async'); // eslint-disable-line @typescript-eslint/no-var-requires

export default Vue.extend({
  name: 'SchedulePage',

  components: {
    Schedule,
    Navigation,
  },

  data: () => ({
    teams: [] as ITeam[],
    holidays: [] as string[],
    openTeamsIndexes: [] as number[],
    teamsData: { } as {[teamId: string]: TeamData},
    isoDateFrom: '2020-09-14',
    scale: SCALE_BIWEEKLY,
    hideWeekends: false,
  }),

  computed: {
    isoDateTo() {
      return findDateTo(this.isoDateFrom, this.scale);
    },
  },

  created() {
    teamsService.getTeams().then((teams) => {
      this.teams = teams;
      if (teams.length) {
        teams.forEach((team) => {
          this.updateTeamsData(team.id, TEAM_DATA_DEFAULT_VALUES);
        });
        this.openTeamsChanged([0]);
      }
    });
    this.loadHolidays();
  },

  methods: {
    hideWeekendsChanged(newValue: boolean) {
      this.hideWeekends = newValue;
    },
    scaleChanged(newScale: number) {
      this.scale = newScale;
      this.isoDateFrom = updateDateFrom(this.isoDateFrom, this.scale, 0);
      this.reloadOpenSchedules();
    },
    dateFromChanged(delta: 1 | -1) {
      this.isoDateFrom = updateDateFrom(this.isoDateFrom, this.scale, delta);
      this.reloadOpenSchedules();
    },
    openTeamsChanged(openTeams: number[]) {
      this.openTeamsIndexes = openTeams;
      openTeams
        .map((teamIdx) => this.teams[teamIdx].id)
        .forEach((teamId) => {
          if (!this.teamsData[teamId].loaded) {
            this.loadTeamData(teamId);
          }
        });
    },
    loadHolidays() {
      holidaysService.getHolidays(this.isoDateFrom, this.isoDateTo).then((h) => {
        this.holidays = h;
      });
    },
    loadTeamData(teamId: string) {
      this.updateTeamsData(teamId, {
        loading: true,
        activityTypesLoading: true,
      });
      Promise.all([
        peopleService.getTeammates(teamId),
        activityTypesService.getActivityTypes(teamId),
      ]).then(([people, activityTypes]) => {
        this.updateTeamsData(teamId, {
          people,
          activityTypes,
          activityTypesLoading: false,
          activityTypesLoaded: true,
        });
        this.loadSchedule(teamId);
      });
    },
    reloadOpenSchedules() {
      this.loadHolidays();
      async.eachSeries(
        this.openTeamsIndexes.map((teamIdx) => this.teams[teamIdx].id),
        (teamId: string, done: () => void) => this.loadSchedule(teamId).then(done),
      );
    },
    loadSchedule(teamId: string) {
      this.updateTeamsData(teamId, {
        loading: true,
        loaded: false,
        statsLoaded: false,
      });
      return scheduleService.getSchedule(
        teamId,
        this.teamsData[teamId].people.map((p) => p.id),
        this.isoDateFrom,
        this.isoDateTo,
      ).then((schedule) => {
        this.updateTeamsData(teamId, {
          activities: this.mapActivitiesByPersonId(schedule),
          loading: false,
          loaded: true,
          statsLoading: true,
        });
        return scheduleStatsService.getStats(schedule);
      }).then((stats) => {
        this.updateTeamsData(teamId, {
          statsLoading: false,
          statsLoaded: true,
          stats,
        });
      });
    },
    updateTeamsData(teamId: string, data: Partial<TeamData>) {
      this.teamsData = {
        ...this.teamsData,
        [teamId]: {
          ...this.teamsData[teamId],
          ...data,
        },
      };
    },
    mapActivitiesByPersonId(schedule: IPersonWithSchedule[]) {
      /* eslint-disable no-param-reassign */
      return schedule.reduce((result: {[personId: string]: IActivity[]}, person) => {
        result[person.id] = person.activitiesPerDay;
        return result;
      }, {});
      /* eslint-enable no-param-reassign */
    },
    fontColorForBg(bgColor: string) {
      return fontColorForBackground(bgColor);
    },
  },
});
</script>
