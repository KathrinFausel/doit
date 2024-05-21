<script setup>
import {store} from '@/store/store'

const props = defineProps(['item'])
</script>

<template>
  <v-card>
    <div class="d-flex align-center">
      <v-checkbox hide-details :model-value="props.item.completed" color="primary" disabled></v-checkbox>
      <p :class="{ 'task-completed' : props.item.completed }">{{ props.item.title }}</p>
    </div>

    <v-card-actions>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <DeleteTask :id="props.item.id"></DeleteTask>
          <v-divider></v-divider>
          <v-list-item @click="store.restoreTask(props.item.id)" class="d-flex justify-center">
            <v-list-item-title>Restore</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.task-completed {
  text-decoration: line-through;
}

.v-text-field {
  width: 500px;
}

.v-checkbox {
  min-width: 40px;
}
</style>
