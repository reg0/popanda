<template>
  <thead>
    <tr>
      <th class="row-title">year</th>
      <th v-for="year in colspans.years" :colspan="year.colspan" :key="year.year">{{year.year}}</th>
    </tr>
    <tr>
      <th class="row-title">month</th>
      <th v-for="month in colspans.months" :colspan="month.colspan" :key="month.month">{{month.month}}</th>
    </tr>
    <tr>
      <th class="row-title">week</th>
      <th v-for="week in colspans.weeks" :colspan="week.colspan" :key="week.week">{{week.week}}</th>
    </tr>
    <tr>
      <th class="row-title">day</th>
      <th v-for="date in dates" :key="date.isoDate">{{date.day}}</th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { MyDate } from '@/utils/date.utils';
import Vue from 'vue';

export default Vue.extend({
  name: 'ScheduleHeader',
  props: {
    dates: {
      type: Array as () => MyDate[],
    },
    scale: Number,
  },
  computed: {
    colspans() {
      const result = {
        weeks: {} as {[week: number]: {week: number; colspan: number}},
        months: {} as {[month: number]: {month: number; colspan: number}},
        years: {} as {[year: number]: {year: number; colspan: number}},
      };
      this.dates.forEach((date: MyDate) => {
        if (!result.weeks[date.week]) {
          result.weeks[date.week] = { week: date.week, colspan: 1 };
        } else {
          result.weeks[date.week].colspan += 1;
        }
        if (!result.months[date.month]) {
          result.months[date.month] = { month: date.month, colspan: 1 };
        } else {
          result.months[date.month].colspan += 1;
        }
        if (!result.years[date.year]) {
          result.years[date.year] = { year: date.year, colspan: 1 };
        } else {
          result.years[date.year].colspan += 1;
        }
      });
      return result;
    },
  },
});
</script>
