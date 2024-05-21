<template>
  <h1 class="pa-5 pa-sm-0">My Tasks </h1>
  <h2 class="pa-5 pa-sm-0">Open Tasks: {{ store.openTasks.length }} | Completed Tasks: {{
      store.completedTasks.length
    }}</h2>
  <v-card>
    <v-toolbar class="px-2">
      <v-text-field
        v-model="search"
        density="comfortable"
        placeholder="Search..."
        prepend-inner-icon="mdi-magnify"
        style="max-width: 300px;"
        variant="solo"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <AddTask></AddTask>
    </v-toolbar>

    <v-container v-if="filteredTasks().length!==0">
      <ListItem v-for="task in filteredTasks()"
                :key="task.title" :item="task"></ListItem>
    </v-container>
    <v-container v-if="store.areTasksAvailable && search.length===0">
      <v-skeleton-loader v-for="n in 10" type="list-item-two-line"></v-skeleton-loader>
    </v-container>
    <v-container v-if="!store.areTasksAvailable">
      <p>No Tasks</p>
    </v-container>
  </v-card>
</template>

<script setup>
//
import {store} from '@/store/store'
import AddTask from "@/components/AddTask.vue";
import {ref} from "vue";

let search = ref('')

function filteredTasks() {
  return store.tasks.filter((task) =>
    task.title.toLowerCase().includes(search.value.toLowerCase())
  );
}
</script>
