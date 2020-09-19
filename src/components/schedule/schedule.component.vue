<template>
  <div class="schedule">
    <table>
      <v-overlay :value="!data || data.loading" :absolute="true" :opacity="0.1">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <ScheduleHeader :dates="dates" :scale="scale" />
      <ScheduleBody v-if="data.loaded" :dates="dates" :people="data.people" :activities="data.activities" />
      <ScheduleBodyStub v-else :peopleCount="team.peopleCount" :datesCount="dates.length" />
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import './schedule.scss';
import { getArrayOfDates } from '@/utils/date.utils';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';
import ScheduleHeader from './scheduleHeader.component.vue';
import ScheduleBody from './scheduleBody.component.vue';
import ScheduleBodyStub from './scheduleBodyStub.component.vue';

export default Vue.extend({
  name: 'Schedule',

  components: {
    ScheduleHeader,
    ScheduleBody,
    ScheduleBodyStub,
  },

  props: {
    data: {
      type: Object as () => {people: IPerson[]; activities: {[personId: string]: IActivity[]}},
    },
    team: {
      type: Object as () => ITeam,
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
