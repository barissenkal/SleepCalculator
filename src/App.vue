<script setup></script>

<template>
  <router-view></router-view>
  <div class="nav-bar">
    <div class="nav-item">
      <router-link to="/wake-up">Wake Up</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/bed-time">Bed Time</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/settings">Settings</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 calc(10px + env(safe-area-inset-bottom));
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  background-color: #111; // TODO: move colors to a constants file
  .nav-item {
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      color: #ddd;
    }
  }
}
@media (prefers-color-scheme: light) {
  .nav-bar {
    // TODO: move colors to a constants file
    background-color: #ddd;
    .nav-item {
      a {
        color: #111;
      }
    }
  }
}
</style>
