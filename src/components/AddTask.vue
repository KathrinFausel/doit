<script setup>
import {store} from '@/store/store'

import { ref } from 'vue';

const newTask = ref('');
const rules = [
  (value) => {
    if (value) return true;
    return 'You must enter a task.';
  },
];

function saveTask() {
  store.addTask(newTask.value);
  newTask.value = ''
}

</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="Add Task"
        variant="elevated"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Add Task">
        <v-card-text>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent>
              <v-text-field
                v-model="newTask"
                :rules="rules"
                label="Add Task"
                clearable
                autofocus
              ></v-text-field>
              <v-card-actions class="d-flex justify-end">
                <v-btn
                  text="Cancel"
                  @click="newTask=''; isActive.value = false"
                  variant="outlined"
                ></v-btn>
                <v-btn
                  type="submit"
                  text="Save"
                  color="primary"
                  variant="flat"
                  @click=" saveTask(); isActive.value = false"
                ></v-btn>

              </v-card-actions>
            </v-form>
          </v-sheet>
        </v-card-text>

      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
