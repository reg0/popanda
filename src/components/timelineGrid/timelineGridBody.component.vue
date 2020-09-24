<template>
  <tbody>
    <tr v-for="row in rows" :key="rowId(row)">
      <td class="avatar">
        <slot name="avatar" v-bind:row="row"></slot>
      </td>
      <td class="name" v-html="rowName(row)">
      </td>
      <slot name="cell" v-bind:row="row"></slot>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IPerson } from '@/interfaces/models/person.model.interface';

export default Vue.extend({
  name: 'TimelineGridBody',
  props: {
    rows: Array,
    rowName: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
    },
    rowId: {
      type: Function as PropType<(person: IPerson) => string>,
      required: true,
    },
  },
});
</script>
