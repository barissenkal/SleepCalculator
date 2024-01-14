<script setup lang="ts">
import { ref } from "vue";
import CheckboxInput from "../components/input/Checkbox.vue";
import RangedNumberInput from "../components/input/RangedNumber.vue";
import TimeInput from "../components/input/Time.vue";
import type { SettingsObject } from "../utils/settings";
import settings from "../utils/settings";
import { updateFormatters } from "../utils/format";
import { updateDarkerMode } from "../utils/darkerMode";

const currentSettings = ref<SettingsObject>(settings.getSettings());

const saveActive = ref<boolean>(false);
const resetActive = ref<boolean>(false);

async function saveButton() {
  settings.updateSettings(currentSettings.value);
  updateFormatters();
  updateDarkerMode();
}
async function resetButton() {
  settings.resetSettings();
  updateFormatters();
  updateDarkerMode();
  currentSettings.value = settings.getSettings();
}
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="settingsBox">
      <CheckboxInput
        v-model="currentSettings.TwentyFourHour"
        title="24 Hour Clock"
      />
      <CheckboxInput
        v-model="currentSettings.CycleClock"
        title="Tap for Sleep Duration"
      />
    </div>
    <div class="settingsBox">
      <TimeInput v-model="currentSettings.IdealWakeUp" title="Ideal Wake Up" />
    </div>
    <div class="settingsBox">
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
    </div>
    <div class="settingsBox">
      <RangedNumberInput
        v-model="currentSettings.CycleCountStart"
        :min="1"
        :max="currentSettings.CyclesCountEnd"
        title="Lowest Cycle shown"
      />
      <RangedNumberInput
        v-model="currentSettings.CyclesCountEnd"
        :min="currentSettings.CycleCountStart"
        :max="10"
        title="Largest Cycle Shown"
      />
      <RangedNumberInput
        v-model="currentSettings.BestCycle"
        :min="0"
        :max="10"
        title="Cycle Count Target"
      />
    </div>
    <div class="settingsBox">
      <CheckboxInput v-model="currentSettings.DarkerMode" title="Darker Mode" />
    </div>
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
@import "../components/input/inputStyles.scss";

$extra-padding: 48px;
$margin-top: env(safe-area-inset-top);
$padding-bottom: calc(
  $extra-padding + $nav-bar-height + $nav-bar-padding-bottom
);

.settings {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - ($margin-top + $padding-bottom));
  margin-top: $margin-top;
  padding-bottom: $padding-bottom;
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

@media only print and (prefers-color-scheme: light) {
  .editBar {
    .editButton {
      color: $soft-black;
      border-top-color: rgba($black, 0.1);
      border-left-color: rgba($black, 0.1);
      border-right-color: rgba($black, 0.1);
      border-bottom-color: rgba($black, 0.1);
      &:active {
        background-color: rgba($black, 0.1);
      }
    }
  }
}
</style>
