<template>
  <tbody>
    <tr v-for="person in people" :key="person.id">
      <td>
        {{ person.lastName.replaceAll(/[\s]*-[\s]*/g, '&#8209;') }}
        {{ person.firstName.replaceAll(/[\s]/g, '&#0160;') }}
      </td>
      <td v-for="activity in activities[person.id]" :key="activity.id">
        {{ activity.type }}
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { MyDate } from '@/utils/date.utils';

export default Vue.extend({
  name: 'ScheduleHeader',
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
  },
});
</script>
