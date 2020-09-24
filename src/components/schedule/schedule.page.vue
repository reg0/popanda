<template>
  <div class="content-wrapper">
    <Navigation :scale="scale" @scaleChanged="scaleChanged" />
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
import { ActivityTypes } from '@/interfaces/enums/activityType.enum';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson, IPersonWithSchedule } from '@/interfaces/models/person.model.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';
import activityTypesService from '@/services/stubs/activityTypes.stub.service';
import holidaysService from '@/services/holidays.service';
import scheduleService from '@/services/stubs/activities.stub.service';
import peopleService from '@/services/stubs/people.stub.service';
import teamsService from '@/services/stubs/teams.stub.service';
import scheduleStatsService from '@/services/scheduleStats.service';
import { fontColorForBackground } from '@/utils/color.utils';
import { findDateTo, SCALE_BIWEEKLY } from '@/utils/date.utils';
import Schedule from './schedule.component.vue';
import Navigation from './scheduleNavigation.component.vue';

const async = require('neo-async'); // eslint-disable-line @typescript-eslint/no-var-requires

export interface TeamData {
  loading: boolean;
  loaded: boolean;
  activityTypesLoading: boolean;
  activityTypesLoaded: boolean;
  statsLoading: boolean;
  statsLoaded: boolean;
  people: IPerson[];
  activities: {[personId: string]: IActivity[]};
  activityTypes: ActivityTypes[];
  stats: {[activityTypeLabel: string]: {[isoDate: string]: number}};
}

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
          this.updateTeamsData(team.id, {
            loading: false,
            loaded: false,
            activityTypesLoading: false,
            activityTypesLoaded: false,
            statsLoading: false,
            statsLoaded: false,
            people: [] as IPerson[],
            activityTypes: [],
            activities: {},
            stats: {},
          });
        });
        this.openTeamsChanged([0]);
      }
    });
    holidaysService.getHolidays(this.isoDateFrom, this.isoDateTo).then((h) => {
      this.holidays = h;
    });
  },

  methods: {
    async scaleChanged(newScale: number) {
      this.scale = newScale;

      async.eachSeries(
        this.openTeamsIndexes.map((teamIdx) => this.teams[teamIdx].id),
        (teamId: string, done: () => void) => this.loadSchedule(teamId).then(done),
      );
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
    loadTeamData(teamId: string) {
      this.updateTeamsData(teamId, {
        ...this.teamsData[teamId],
        loading: true,
        activityTypesLoading: true,
      });
      Promise.all([
        peopleService.getTeammates(teamId),
        activityTypesService.getActivityTypes(teamId),
      ]).then(([people, activityTypes]) => {
        this.updateTeamsData(teamId, {
          ...this.teamsData[teamId],
          people,
          activityTypes,
          activityTypesLoading: false,
          activityTypesLoaded: true,
        });
        this.loadSchedule(teamId);
      });
    },
    loadSchedule(teamId: string) {
      this.updateTeamsData(teamId, {
        ...this.teamsData[teamId],
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
          ...this.teamsData[teamId],
          activities: this.mapActivitiesByPersonId(schedule),
          loading: false,
          loaded: true,
          statsLoading: true,
        });
        return scheduleStatsService.getStats(schedule);
      }).then((stats) => {
        this.updateTeamsData(teamId, {
          ...this.teamsData[teamId],
          statsLoading: false,
          statsLoaded: true,
          stats,
        });
      });
    },
    updateTeamsData(teamId: string, data: TeamData) {
      this.teamsData = {
        ...this.teamsData,
        [teamId]: data,
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
