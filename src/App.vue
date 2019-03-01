<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
  </div>
</template>