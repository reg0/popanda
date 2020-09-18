<template>
  <tbody>
    <tr v-for="person in peopleCount" :key="person">
      <td class="row-title">&nbsp;</td>
      <td v-for="date in datesCount" :key="date">&nbsp;</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ScheduleBodyStub',
  props: {
    datesCount: Number,
    peopleCount: Number,
  },
});
</script>
