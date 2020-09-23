<template>
  <tbody>
    <tr v-for="person in people" :key="person.id">
      <td class="avatar">
        <v-avatar color="primary" size="36">
          <span class="white--text">
            {{ person.initials }}
          </span>
        </v-avatar>
      </td>
      <td class="name">
        {{ person.lastName.replaceAll(/[\s]*-[\s]*/g, '&#8209;') }}
        {{ person.firstName.replaceAll(/[\s]/g, '&#0160;') }}
      </td>
      <ScheduleCell v-for="activity in activities[person.id]"
        :activity="activity"
        :key="activity.id"
        :iSholiday="holidays.indexOf(activity.isoDate) >= 0"
      />
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { MyDate } from '@/utils/date.utils';
import ScheduleCell from './scheduleCell.component.vue';

export default Vue.extend({
  name: 'ScheduleHeader',
  components: {
    ScheduleCell,
  },
  props: {
    people: {
      type: Array as () => IPerson[],
    },
    activities: {
      type: Object as () => {[personId: string]: IActivity[]},
    },
    dates: {
      type: Array as () => MyDate[],
    },
    holidays: {
      type: Array as () => string[],
    },
  },
});
</script>
