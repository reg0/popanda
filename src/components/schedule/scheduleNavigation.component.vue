<template>
  <v-toolbar id="navigation" :extended="!collapsed" :extension-height="collapsed ? 0 : 100">
    <v-btn icon @click="collapsed = !collapsed">
      <v-icon>{{ collapsed ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
    </v-btn>

    <v-toolbar-title>Navigation</v-toolbar-title>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="normal"
          v-bind="attrs"
          v-on="on"
          outlined
          class="scale-dropdown d-none d-sm-flex"
        >
          {{ scaleItems.find((it) => it.scale === scale).name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item) in scaleItems"
          :key="item.scale"
          @click="scaleItemClicked(item.scale)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <template v-if="!collapsed" #extension>
      <v-toolbar-title>Title2</v-toolbar-title>
    </template>
  </v-toolbar>
</template>
<style lang="scss">
  #navigation {
    transition: height 0.3s;
    margin-bottom: 30px;

    .scale-dropdown {
      margin-left: 50px;
      width: 112px
    }
  }
</style>
<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'Navigation',
  props: {
    scale: Number,
  },
  data: () => ({
    collapsed: true,
    scaleItems: [{ name: 'Weekly', scale: 7 }, { name: 'Bi-weekly', scale: 14 }, { name: 'Monthly', scale: 31 }],
  }),
  methods: {
    scaleItemClicked(newScale: number) {
      this.$emit('scaleChanged', newScale);
    },
  },
});
</script>
