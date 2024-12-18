<script setup lang="ts">
  import { ref } from "vue";
  import { RouterLink, RouterView } from "vue-router";
  import { requestNotificationPermission } from "@/firebase";

  const message = ref("尚未啟用地理位置檢測");
  // 模擬地理圍欄 (geofencing) 的目標座標
  const TARGET_COORDS = { latitude: 25.033964, longitude: 121.564468 }; // Foxconn Neihu

  const selectedItem = ref({});
  const menuItems = ref([
    { title: "Churches" },
    { title: "Venues" },
    { title: "CulturalAssets" },
    { title: "temples" },
  ]);

  const requestPermission = () => {
    requestNotificationPermission();
  };

  const startGeofencing = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        // 位置變更時會呼叫 callback
        (position) => {
          const { latitude, longitude } = position.coords;

          // 簡單的距離判斷 (可用更精確的計算)
          const distance = getDistance(
            latitude,
            longitude,
            TARGET_COORDS.latitude,
            TARGET_COORDS.longitude
          );

          if (distance < 100) {
            sendNotification("您已接近內湖鴻海大樓! 🚀");
          }

          message.value = `目前位置: ${latitude}, ${longitude}，距離目標 ${distance} 公尺`;
        },
        (error) => {
          console.error("Error getting location:", error);
          message.value = "無法取得位置資訊。";
        }
      );
    } else {
      message.value = "您的瀏覽器不支援地理位置功能。";
    }
  };

  const sendNotification = (content: string) => {
    if (Notification.permission === "granted") {
      new Notification("地理圍欄通知", { body: content });
    }
  };

  // 簡單計算兩點之間的距離 (單位: 公尺)
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // 地球半徑 (公尺)
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const onMenuClick = (item: Object) => {
    selectedItem.value = item;
  };
  const onSearchBluetooth = async () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"], // 可用來讀取 BLE 服務
      })
      .then((device: any) => {
        console.log(device.name);
      })
      .catch((error: any) => {
        console.error("藍牙配對失敗");
      });
  };
</script>

<template>
  <v-app>
    <header class="pa-2 bg-orange-lighten-3">
      <nav>
        <!-- <RouterLink to="/">
          <v-btn color="primary">Home</v-btn>
        </RouterLink>
        <RouterLink to="/about">
          <v-btn color="primary" class="ml-2">About</v-btn>
        </RouterLink> -->

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
        <v-btn type="button" color="secondary" class="ml-2" @click="onSearchBluetooth"
          >搜尋藍牙設備</v-btn
        >
        <v-btn class="ml-2" type="button" @click="startGeofencing">啟用地理位置檢測</v-btn>
        <v-btn class="ml-2" type="button" @click="requestPermission">啟用推播通知</v-btn>
      </nav>
    </header>
    <v-main class="bg-grey-lighten-2">
      <v-container fluid class="v-container">
        <div class="v-container__msg">{{ message }}</div>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  .v-container__msg {
    color: #ffffff;
    background-color: #800000;
    padding: 1rem;
  }
</style>
