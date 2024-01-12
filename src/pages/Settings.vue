<script setup lang="ts">
import { ref } from "vue";
import SwitchInput from "../components/input/Switch.vue";
import RangedNumberInput from "../components/input/RangedNumber.vue";
import TimeInput from "../components/input/Time.vue";
import type { SettingsObject } from "../utils/settings";
import settings from "../utils/settings";

const currentSettings = ref<SettingsObject>(settings.getSettings());

function saveButton() {
  // console.log("currentSettings", JSON.stringify(currentSettings.value));
  settings.updateSettings(currentSettings.value);
}
function resetButton() {
  settings.resetSettings();
  currentSettings.value = settings.getSettings();
}
</script>

<template>
  <h1 class="header">Settings</h1>
  <div class="settings">
    <SwitchInput
      v-model="currentSettings.TwentyFourHour"
      title="24 Hour Clock"
    />
    <RangedNumberInput
      v-model="currentSettings.TimeToFallAsleep"
      :min="0"
      :max="60"
      title="Time to Fall Asleep"
    />
    <RangedNumberInput
      v-model="currentSettings.SleepCycleLength"
      :min="30"
      :max="120"
      title="Sleep Cycle Length"
    />
    <RangedNumberInput
      v-model="currentSettings.CycleCountStart"
      :min="1"
      :max="10"
      title="Lowest Cycle shown"
    />
    <RangedNumberInput
      v-model="currentSettings.CyclesCountEnd"
      :min="1"
      :max="10"
      title="Largest Cycle Shown"
    />
    <RangedNumberInput
      v-model="currentSettings.BestCycle"
      :min="1"
      :max="10"
      title="Cycle Count Target"
    />
    <TimeInput v-model="currentSettings.IdealWakeUp" title="Ideal Wake Up" />
  </div>
  <div class="editBar">
    <div class="saveButton" @click="saveButton">Save</div>
    <div class="resetButton" @click="resetButton">Reset</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

$side-padding: 8px;

.header {
  padding: 0 $side-padding;
  text-align: start;
  font-size: 40px;
}

.editBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 8px;
  padding-bottom: calc(12px + $nav-bar-height + $nav-bar-padding-bottom);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .saveButton {
  }
  .resetButton {
  }
}
</style>
