<template>
  <thead>
    <tr>
      <th> </th>
      <th class="row-title">year</th>
      <th v-for="year in colspans.years" :colspan="year.colspan" :key="year.date.year">{{year.date.year}}</th>
    </tr>
    <tr>
      <th> </th>
      <th class="row-title">month</th>
      <th v-for="month in colspans.months" :colspan="month.colspan" :key="month.date.month">{{getMonthName(month.date)}}</th>
    </tr>
    <tr>
      <th> </th>
      <th class="row-title">week</th>
      <th v-for="week in colspans.weeks" :colspan="week.colspan" :key="week.date.week">{{week.date.week}}</th>
    </tr>
    <tr>
      <th> </th>
      <th class="row-title">day</th>
      <th v-for="date in dates" :key="date.isoDate" :class="isDayOff(date) ? 'sunday' : ''">
        {{date.day}}<br />{{getWeekdayName(date)}}
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { MyDate } from '@/utils/date.utils';

export default Vue.extend({
  name: 'TimelineGridHeader',
  props: {
    dates: {
      type: Array as () => MyDate[],
    },
    scale: Number,
  },
  computed: {
    colspans() {
      const result = {
        weeks: {} as {[week: number]: {date: MyDate; colspan: number}},
        months: {} as {[month: number]: {date: MyDate; colspan: number}},
        years: {} as {[year: number]: {date: MyDate; colspan: number}},
      };
      this.dates.forEach((date: MyDate) => {
        if (!result.weeks[date.week]) {
          result.weeks[date.week] = { date, colspan: 1 };
        } else {
          result.weeks[date.week].colspan += 1;
        }
        if (!result.months[date.month]) {
          result.months[date.month] = { date, colspan: 1 };
        } else {
          result.months[date.month].colspan += 1;
        }
        if (!result.years[date.year]) {
          result.years[date.year] = { date, colspan: 1 };
        } else {
          result.years[date.year].colspan += 1;
        }
      });
      return result;
    },
  },
  methods: {
    getMonthName(date: MyDate) {
      return moment(date.isoDate).format('MMMM');
    },
    getWeekdayName(date: MyDate) {
      return moment(date.isoDate).format('dd');
    },
    isDayOff(date: MyDate) {
      return moment(date.isoDate).isoWeekday() === 7;
    },
  },
});
</script>
