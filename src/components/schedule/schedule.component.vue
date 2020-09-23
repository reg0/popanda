<template>
  <div class="schedule">
    <table>
      <v-overlay :value="!data || data.loading" :absolute="true" :opacity="0.1">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <ScheduleHeader :dates="dates" :scale="scale" />
      <ScheduleBody v-if="data.loaded" :dates="dates" :people="data.people" :activities="data.activities" :holidays="holidays" />
      <ScheduleBodyStub v-else :peopleCount="team.peopleCount" :datesCount="dates.length" />
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import './schedule.scss';
import { getArrayOfDates } from '@/utils/date.utils';
import { ITeam } from '@/interfaces/models/team.model.interface';
import ScheduleHeader from './scheduleHeader.component.vue';
import ScheduleBody from './scheduleBody.component.vue';
import ScheduleBodyStub from './scheduleBodyStub.component.vue';
import { TeamData } from './schedule.page.vue';

export default Vue.extend({
  name: 'Schedule',

  components: {
    ScheduleHeader,
    ScheduleBody,
    ScheduleBodyStub,
  },

  props: {
    data: {
      type: Object as () => TeamData,
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
    dates() {
      return getArrayOfDates(this.isoDateFrom, this.isoDateTo);
    },
  },
});
</script>
