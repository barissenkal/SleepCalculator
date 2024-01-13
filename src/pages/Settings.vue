<script setup lang="ts">
import { ref } from "vue";
import SwitchInput from "../components/input/Switch.vue";
import RangedNumberInput from "../components/input/RangedNumber.vue";
import TimeInput from "../components/input/Time.vue";
import type { SettingsObject } from "../utils/settings";
import settings from "../utils/settings";
import { updateFormatters } from "../utils/format";

const currentSettings = ref<SettingsObject>(settings.getSettings());

const saveActive = ref<boolean>(false);
const resetActive = ref<boolean>(false);

async function saveButton() {
  settings.updateSettings(currentSettings.value);
  updateFormatters();
}
async function resetButton() {
  settings.resetSettings();
  updateFormatters();
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
    <SwitchInput
      v-model="currentSettings.CycleClock"
      title="Cycle Sleep Duration"
    />
  </div>
  <div class="editBar">
    <button
      class="editButton"
      :class="{ updating: saveActive }"
      @click="saveButton"
      :disabled="resetActive"
      @touchstart="saveActive = true"
      @touchend="saveActive = false"
    >
      Save
    </button>
    <button
      class="editButton"
      :class="{ updating: resetActive }"
      @click="resetButton"
      :disabled="saveActive"
      @touchstart="resetActive = true"
      @touchend="resetActive = false"
    >
      Reset
    </button>
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
  padding-bottom: calc($nav-bar-height + $nav-bar-padding-bottom);
  display: flex;
  justify-content: center;
  align-items: center;
  .editButton {
    padding: 12px;
    flex-grow: 1;
    color: $soft-white;
    border-radius: 0;
    border-top: 2px solid rgba($white, 0.1);
    border-left: 1px solid rgba($white, 0.1);
    border-right: 1px solid rgba($white, 0.1);
    border-bottom: 2px solid rgba($white, 0.1);
    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
    &.updating, // NOTE: On iOS Safari, tapping a button does not change it to the 'active' state.
    &:active {
      background-color: rgba($white, 0.1);
    }
  }
}
</style>
