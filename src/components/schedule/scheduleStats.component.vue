<template>
  <TimelineGridBody v-if="statsLoaded"
    :rows="activityTypes"
    :rowName="rowName"
    :rowId="rowId"
    :avatarContents="avatarContents"
    :avatarColor="avatarColor"
  >
    <template v-slot:default="slotProps">
      <ScheduleStatsCell v-for="date in dates"
        :key="date.isoDate"
        :isHoliday="holidays.indexOf(date.isoDate) >= 0"
        :isoDate="date.isoDate"
        :value="stats[slotProps.row.label] ? stats[slotProps.row.label][date.isoDate] : 0"
      />
    </template>
  </TimelineGridBody>
  <TimelineGridBodyStub v-else-if="activityTypesLoaded" :rowsCount="activityTypes.length" :datesCount="dates.length" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import './schedule.scss';
import { MyDate } from '@/utils/date.utils';
import { ITeam } from '@/interfaces/models/team.model.interface';
import { ActivityType } from '@/interfaces/enums/activityType.enum';
import TimelineGridBody from '../timelineGrid/timelineGridBody.component.vue';
import TimelineGridBodyStub from '../timelineGrid/timelineGridBodyStub.component.vue';
import ScheduleStatsCell from './scheduleStatsCell.component.vue';

export default Vue.extend({
  name: 'ScheduleStats',

  components: {
    TimelineGridBody,
    TimelineGridBodyStub,
    ScheduleStatsCell,
  },

  props: {
    activityTypes: {
      type: Array as PropType<ActivityType[]>,
    },
    activityTypesLoaded: Boolean,
    statsLoaded: Boolean,
    team: {
      type: Object as () => ITeam,
    },
    holidays: {
      type: Array as () => string[],
    },
    dates: {
      type: Array as () => MyDate[],
    },
    stats: {
      type: Object as PropType<{[activityTypeLabel: string]: {[isoDate: string]: number}}>,
    },
    scale: Number,
  },
  methods: {
    rowName(activityType: ActivityType) {
      return activityType.label;
    },
    rowId(activityType: ActivityType) {
      return activityType.label;
    },
    avatarColor(activityType: ActivityType) {
      return activityType.color;
    },
    avatarContents() {
      return '';
    },
  },
});
</script>
