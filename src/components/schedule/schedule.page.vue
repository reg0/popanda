<template>
  <div class="content-wrapper">
    <Navigation :scale="scale" @scaleChanged="scaleChanged" />
    <v-expansion-panels :hover="true" :multiple="true" :value="openTeamsIndexes" @change="openTeamsChanged">
      <v-expansion-panel v-for="team in teams" :key="team.id">
        <v-expansion-panel-header>{{ team.name }} [{{ team.peopleCount }}]</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Schedule :data="teamsData[team.id]" :team="team" :isoDateFrom="isoDateFrom" :isoDateTo="isoDateTo" :scale="scale" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss">
  .content-wrapper {
    max-width: 1150px;
    margin: 0 auto;

    & > div {
      width: 1000px;
    }
  }
</style>

<script lang="ts">
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson, IPersonWithSchedule } from '@/interfaces/models/person.model.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';
import scheduleService from '@/services/stubs/activities.stub.service';
import peopleService from '@/services/stubs/people.stub.service';
import teamsService from '@/services/stubs/teams.stub.service';
import Vue from 'vue';
import Schedule from './schedule.component.vue';
import Navigation from './scheduleNavigation.component.vue';

export interface TeamData {
  loading: boolean;
  loaded: boolean;
  people: IPerson[];
  activities: {[personId: string]: IActivity[]};
}

export default Vue.extend({
  name: 'SchedulePage',

  components: {
    Schedule,
    Navigation,
  },

  data: () => ({
    teams: [] as ITeam[],
    openTeamsIndexes: [] as number[],
    teamsData: { } as {[teamId: string]: TeamData},
    isoDateFrom: '2020-09-14',
    isoDateTo: '2020-09-27',
    scale: 14,
  }),

  created() {
    teamsService.getTeams().then((teams) => {
      this.teams = teams;
      if (teams.length) {
        teams.forEach((team) => {
          this.updateTeamsData(team.id, {
            loading: false,
            loaded: false,
            people: [] as IPerson[],
            activities: {},
          });
        });
        this.openTeamsChanged([0]);
      }
    });
  },

  methods: {
    scaleChanged(newScale: number) {
      this.scale = newScale;
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
      });
      peopleService.getTeammates(teamId).then((people) => {
        scheduleService.getSchedule(teamId, people.map((p) => p.id), this.isoDateFrom, this.isoDateTo).then((schedule) => {
          this.updateTeamsData(teamId, {
            ...this.teamsData[teamId],
            people,
            activities: this.mapActivitiesByPersonId(schedule),
            loading: false,
            loaded: true,
          });
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
  },
});
</script>