<template>
  <main-layout>
    <schedule-page />
  </main-layout>
</template>

<script lang="ts">
import './assets/reset.css';
import Vue from 'vue';
import SchedulePage from './components/schedule/schedule.page.vue';
import MainLayout from './layouts/MainLayout.vue';

export default Vue.extend({
  name: 'App',

  components: {
    SchedulePage,
    MainLayout,
  },
});
</script>
