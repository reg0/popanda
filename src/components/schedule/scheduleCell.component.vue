<template>
  <td v-if="activity" :class="{holiday: isHoliday}">
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
  <td v-else :class="{holiday: isHoliday}">
    <div class="cell-icons"></div>
    <div class="cell-color">
      <span class="dayNumber">{{ getDayNumber(isoDate) }}</span>
    </div>
  </td>
</template>

<script lang="ts">
import Vue from 'vue';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { MyDate } from '@/utils/date.utils';
import { fontColorForBackground } from '@/utils/color.utils';

export default Vue.extend({
  name: 'ScheduleCell',
  props: {
    activity: Object as () => IActivity,
    isHoliday: Boolean,
    isoDate: String,
  },
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
