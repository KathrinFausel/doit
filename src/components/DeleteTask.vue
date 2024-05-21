<script setup>
import {store} from '@/store/store'
const props = defineProps(['id'])
import { useRoute } from 'vue-router'

const isArichveRoute = useRoute().path.includes('archive')

</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" class="d-flex justify-center">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Delete Task?">
        <v-card-text>
          Are you sure that you want to delete this task?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancel"
            @click="isActive.value = false"
            variant="outlined"
          ></v-btn>
          <v-btn
            type="submit"
            text="Delete"
            color="primary"
            variant="flat"
            @click=" store.deleteTask(props.id, isArichveRoute); isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
