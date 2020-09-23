<template>
  <tbody>
    <tr v-for="row in rows" :key="rowId(row)">
      <td class="avatar">
        <v-avatar :color="avatarColor(row)" size="36">
          <span class="white--text">
            {{ avatarContents(row) }}
          </span>
        </v-avatar>
      </td>
      <td class="name" v-html="rowName(row)">
      </td>
      <ScheduleCell v-for="date in dates"
        :activity="activities[rowId(row)][date.isoDate]"
        :key="date.isoDate"
        :isHoliday="holidays.indexOf(date.isoDate) >= 0"
      />
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { MyDate } from '@/utils/date.utils';
import ScheduleCell from './scheduleCell.component.vue';

export default Vue.extend({
  name: 'TimelineGridBody',
  components: {
    ScheduleCell,
  },
  props: {
    rows: Array,
    activities: {
      type: Object as () => {[personId: string]: {[isoDate: string]: IActivity}},
    },
    rowName: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
    },
    rowId: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
    },
    avatarContents: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
    },
    avatarColor: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
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
