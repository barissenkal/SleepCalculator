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
@import "./variables.scss";

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  padding-bottom: $nav-bar-padding-bottom;
  box-shadow: 0px -2px 5px rgba($black, 0.1);
  background-color: $nav-background;
  .nav-item {
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      color: $ghost-white;
      &.router-link-active {
        color: $soft-white;
      }
    }
  }
}
@media (prefers-color-scheme: light) {
  .nav-bar {
    background-color: invert($nav-background);
    .nav-item {
      a {
        color: $soft-black;
        &.router-link-active {
          color: $black;
        }
      }
    }
  }
}
</style>
