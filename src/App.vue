<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  const selectedItem = ref(null);
  const menuItems = ref([
    { title: 'Churches' },
    { title: 'Venues' },
    { title: 'CulturalAssets' },
    { title: 'temples' },
  ]);

  const onMenuClick = (item) => {
    selectedItem.value = item;
  };
</script>

<template>
  <v-app>
    <header class="pa-2 bg-orange-lighten-3">
      <nav>
        <RouterLink to="/">
          <v-btn color="primary">Home</v-btn>
        </RouterLink>
        <RouterLink to="/about">
          <v-btn color="primary" class="ml-2">About</v-btn>
        </RouterLink>
        <!-- location 為 menu 展開時會往哪邊長 -->
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="primary" class="ml-2">Dropdown</v-btn>
          </template>
          <v-list>
            <!-- 給了 :value 才會有 cursor: point; -->
            <v-list-item
              v-for="(item, index) in menuItems"
              :key="index"
              :value="index"
              @click="onMenuClick(item)"
              >{{ item.title }}</v-list-item
            >
          </v-list>
        </v-menu>
      </nav>
    </header>
    <v-main class="bg-grey-lighten-2">
      <v-container fluid class="v-container">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
