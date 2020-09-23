<template>
  <tbody>
    <tr v-for="person in rowsCount" :key="person">
      <td class="avatar">&nbsp;</td>
      <td class="name">&nbsp;</td>
      <td v-for="date in datesCount" :key="date">&nbsp;</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TimelineGridBodyStub',
  props: {
    datesCount: Number,
    rowsCount: Number,
  },
});
</script>
