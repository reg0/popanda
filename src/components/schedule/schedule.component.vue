<template>
  <div class="schedule">
    <table>
      <v-overlay :value="!teamData || teamData.loading" :absolute="true" :opacity="0.1">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <ScheduleHeader :dates="dates" :scale="scale" />
      <TimelineGridBody v-if="teamData.loaded"
        :dates="dates"
        :rows="teamData.people"
        :activities="activities"
        :holidays="holidays"
        :rowName="rowName"
        :rowId="rowId"
        :avatarContents="avatarContents"
        :avatarColor="avatarColor"
      />
      <ScheduleBodyStub v-else :peopleCount="team.peopleCount" :datesCount="dates.length" />
    </table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import './schedule.scss';
import { getArrayOfDates, MyDate } from '@/utils/date.utils';
import { ITeam } from '@/interfaces/models/team.model.interface';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';
import ScheduleHeader from './scheduleHeader.component.vue';
import TimelineGridBody from './timelineGridBody.component.vue';
import ScheduleBodyStub from './scheduleBodyStub.component.vue';
import { TeamData } from './schedule.page.vue';

export default Vue.extend({
  name: 'Schedule',

  components: {
    ScheduleHeader,
    TimelineGridBody,
    ScheduleBodyStub,
  },

  props: {
    teamData: {
      type: Object as PropType<TeamData>,
    },
    team: {
      type: Object as () => ITeam,
    },
    holidays: {
      type: Array as () => string[],
    },
    isoDateFrom: String,
    isoDateTo: String,
    scale: Number,
  },
  computed: {
    dates(): MyDate[] {
      return getArrayOfDates(this.isoDateFrom, this.isoDateTo);
    },
    activities(): {[personId: string]: {[isoDate: string]: IActivity}} {
      return Object.keys(this.teamData.activities).reduce((result, personId) => {
        /* eslint-disable no-param-reassign */
        if (!result[personId]) {
          result[personId] = {};
        }
        this.teamData.activities[personId].forEach((a) => {
          result[personId][a.isoDate] = a;
        });
        return result;
        /* eslint-enable no-param-reassign */
      }, {} as {[personId: string]: {[isoDate: string]: IActivity}});
    },
  },
  methods: {
    rowName(person: IPerson) {
      return `${person.lastName.replaceAll(/[\s]*-[\s]*/g, '&#8209;')} ${person.firstName.replaceAll(/[\s]/g, '&#0160;')}`;
    },
    rowId(person: IPerson) {
      return person.id;
    },
    avatarColor() {
      return 'primary';
    },
    avatarContents(person: IPerson) {
      return person.initials;
    },
  },
});
</script>
