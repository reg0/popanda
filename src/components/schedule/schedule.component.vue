<template>
  <div class="schedule">
    <table>
      <v-overlay :value="!teamData || teamData.loading" :absolute="true" :opacity="0.1">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <TimelineGridHeader :dates="dates" :scale="scale" />
      <TimelineGridBody v-if="teamData.loaded"
        :rows="teamData.people"
        :rowName="rowName"
        :rowId="rowId"
      >
        <template v-slot:cell="slotProps">
          <ScheduleCell v-for="date in dates"
            :activity="activities[rowId(slotProps.row)][date.isoDate]"
            :key="date.isoDate"
            :isHoliday="holidays.indexOf(date.isoDate) >= 0"
            :isoDate="date.isoDate"
          />
        </template>
        <template v-slot:avatar="slotProps">
          <v-avatar :color="avatarColor(slotProps.row)" size="36">
            <span class="white--text">
              {{ avatarContents(slotProps.row) }}
            </span>
          </v-avatar>
        </template>
      </TimelineGridBody>
      <TimelineGridBodyStub v-else :rowsCount="team.peopleCount" :datesCount="dates.length" />
      <ScheduleStats
        :stats="teamData.stats"
        :statsLoaded="teamData.statsLoaded"
        :activityTypes="teamData.activityTypes"
        :activityTypesLoaded="teamData.activityTypesLoaded"
        :dates="dates"
        :holidays="holidays"
      >
      </ScheduleStats>
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
import holidaysService from '@/services/holidays.service';
import TimelineGridHeader from '../timelineGrid/timelineGridHeader.component.vue';
import TimelineGridBody from '../timelineGrid/timelineGridBody.component.vue';
import TimelineGridBodyStub from '../timelineGrid/timelineGridBodyStub.component.vue';
import ScheduleCell from './scheduleCell.component.vue';
import ScheduleStats from './scheduleStats.component.vue';
import { TeamData } from './teamData.dto';

export default Vue.extend({
  name: 'Schedule',

  components: {
    TimelineGridHeader,
    TimelineGridBody,
    TimelineGridBodyStub,
    ScheduleCell,
    ScheduleStats,
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
    hideWeekends: Boolean,
  },
  computed: {
    dates(): MyDate[] {
      return getArrayOfDates(this.isoDateFrom, this.isoDateTo).filter((d) => !this.hideWeekends || !holidaysService.isWeekend(d));
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
