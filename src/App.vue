<template>
  <v-app>
    <nav>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
          <v-img
            :width="100"
            aspect-ratio="16/9"
            cover
            src="./assets/logo.png"
          ></v-img>
        </v-app-bar-title>

      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item"
            :title="item.title"
            :to="item.link"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>

    <v-main class="ml-sm-16 mr-sm-16 ">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>

import {getTodos} from "@/clients/data";
import {store} from "@/store/store";
import {onMounted, ref, watch} from "vue";

const drawer = ref(false)
const group = ref(null)
const items = ref([
  {
    title: 'My Tasks',
    value: 'tasks',
    link: '/'
  },
  {
    title: 'Archive',
    value: 'archive',
    link: '/archive'
  }
])

watch(group, () => {
  drawer.value = false
})

onMounted(() => {
  getTodos().then((data) => store.setTasks(data))
    .catch(err => console.log(err.message))
})

</script>
