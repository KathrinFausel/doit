<script setup>
import {store} from '@/store/store'
import {ref} from "vue";

const props = defineProps(['item'])
let title = ref(props.item.title)
let isEdited = ref(false)
let prio = ref('')
let prioColor = ref('')

function required (v) {
  return !!v || 'Field is required'
}
function setPrio(newPrio) {
  prio.value = newPrio;
  switch (newPrio) {
    case 'high':
      prioColor.value = 'red'
      break
    case 'medium':
      prioColor.value = 'orange'
      break
    case 'low':
      prioColor.value = 'green'
      break
  }
}
</script>

<template>
  <v-card>
    <v-card-text>
      <div class="d-flex align-center">
        <v-checkbox hide-details :model-value="props.item.completed" color="primary"
                    @click="store.changeCompletionStatus(props.item.id)"></v-checkbox>
        <p v-if="!isEdited" :class="{ 'task-completed' : props.item.completed }">{{ title }}</p>
        <v-text-field
          class="size"
          autofocus
          v-if="isEdited"
          v-model="title"
          clearable
          :rules="[required]"
          append-icon="mdi-check"
          @click:append="store.editTask(props.item.id, title); isEdited=!isEdited"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-chip v-if="prio" :color="prioColor">
        {{ prio }}
        <v-icon icon="mdi-close-circle-outline" class="ml-2" @click="prio=''"></v-icon>
      </v-chip>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item @click="isEdited=!isEdited" class="d-flex justify-center">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <DeleteTask :id="props.item.id"></DeleteTask>
          <v-divider></v-divider>
          <v-list-item @click="store.archiveTask(props.item.id)" class="d-flex justify-center">
            <v-list-item-title>Archive</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title>Prioritize
                  <v-icon icon="mdi-triangle-small-down"></v-icon>
                </v-list-item-title>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item @click="setPrio('high')">
                <v-list-item-title>High</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="setPrio('medium')">
                <v-list-item-title>Medium</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="setPrio('low')">
                <v-list-item-title>Low</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

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

.v-checkbox {
  min-width: 40px;
}

</style>
