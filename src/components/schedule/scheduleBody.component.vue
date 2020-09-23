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
      <td v-for="activity in activities[person.id]" :key="activity.id">
        <div class="cell-icons">
        <v-tooltip top v-if="activity.commentForSuperior || activity.commentPublic">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" x-small color="normal">mdi-comment-alert-outline</v-icon>
          </template>
          <div>
            <span v-if="activity.commentPublic">{{ activity.commentPublic }}</span>
            <br v-if="activity.commentForSuperior && activity.commentPublic" />
            <span v-if="activity.commentForSuperior">{{ activity.commentForSuperior }}</span>
          </div>
        </v-tooltip>
        </div>
        <div class="cell-color" :style="{backgroundColor: activity.type.color, color: fontColorForBg(activity.type.color)}">
          <span class="dayNumber">{{ getDayNumber(activity.isoDate) }}</span>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { MyDate } from '@/utils/date.utils';
import { fontColorForBackground } from '@/utils/color.utils';

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
  data: () => ({
    show: true,
  }),
  methods: {
    fontColorForBg(bgColor: string) {
      return fontColorForBackground(bgColor);
    },
    getDayNumber(isoDate: string) {
      return new MyDate(isoDate).day;
    },
  },
});
</script>
