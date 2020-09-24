<template>
  <td :class="{holiday: isHoliday}">
    {{ value ? value : '' }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';

export default Vue.extend({
  name: 'ScheduleStatsCell',
  props: {
    activity: Object as () => IActivity,
    isHoliday: Boolean,
    value: Number,
  },
});
</script>
