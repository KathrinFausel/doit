<script setup>
import {store} from '@/store/store'
</script>

<template>
  <h1>Archive</h1>

    <v-container class="pa-5" v-if="store.archiveTasks">
      <ListItemArchive v-for="item in store.archiveTasks"
                :key="item.id" :item="item"></ListItemArchive>
    </v-container>
  <v-container class="pa-5" v-if="store.archiveTasks.length===0">
    <p>No Tasks in Archive</p>
  </v-container>

</template>

<style scoped>

</style>
