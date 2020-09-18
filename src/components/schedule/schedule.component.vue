<template>
  <div class="schedule" id="schedule">
    <v-overlay :value="!data || data.loading" :absolute="true" :opacity="0.1">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <table v-if="data.loaded">
      <thead>
        <tr>
          <th class="stck"></th>
          <th v-for="date in dates" :key="date.isoDate">{{date.week}}</th>
        </tr>
        <tr>
          <th class="stck"></th>
          <th v-for="date in dates" :key="date.isoDate">{{date.day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in data.people" :key="person.id">
          <td class="stck">
            {{ person.firstName }}
          </td>
          <td v-for="activity in data.activities[person.id]" :key="activity.id">
            {{ activity.type }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
  $color: navy;

  .schedule {
    width: 800px;
    // position: relative;
  }

  // table {
  //   width: 2000px;
  //   cursor: grab;
  // }

  // tr:nth-child(2n) {
  //   background: #f9f9f9;
  //   .stck {
  //     background: #f9f9f9;
  //   }
  // }

  // td, th {
  //   // border: solid 1px $color;
  //   min-width: 150px;
  // }

  // .stck {
  //   position: sticky;
  //   left: 0px;
  //   background: white;
  // }
</style>

<script lang="ts">
// import { PersonWithSchedule } from '@/models/person.model';
import Vue from 'vue';
import { getArrayOfDates } from '@/utils/date.utils';

export default Vue.extend({
  name: 'Schedule',
  props: {
    data: Object,
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
