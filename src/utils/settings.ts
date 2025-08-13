import { SettingKeys, SettingsObject } from "../types";

const LOCAL_STORAGE_KEY = "settings";

const DEFAULT_SETTINGS: Readonly<SettingsObject> = Object.freeze({
  [SettingKeys.TimeToFallAsleep]: 20, // minutes
  [SettingKeys.SleepCycleLength]: 90, // minutes
  [SettingKeys.CycleCountStart]: 3,
  [SettingKeys.CyclesCountEnd]: 6,
  [SettingKeys.IdealWakeUp]: 600, // 10:00
  [SettingKeys.TwentyFourHour]: true,
  [SettingKeys.BestCycle]: 5,
  [SettingKeys.CycleClock]: true,
  [SettingKeys.DarkerMode]: false,
});

const SHORT_SETTINGS_ORDER = [
  SettingKeys.TimeToFallAsleep,
  SettingKeys.SleepCycleLength,
  SettingKeys.CycleCountStart,
  SettingKeys.CyclesCountEnd,
  SettingKeys.IdealWakeUp,
  SettingKeys.TwentyFourHour,
  SettingKeys.BestCycle,
  SettingKeys.CycleClock,
  SettingKeys.DarkerMode,
];

let tempSettings: SettingsObject | null = null;

function _fillAndGetTemp(): SettingsObject {
  if (tempSettings == null) {
    let saved: Partial<SettingsObject> = {};
    try {
      const savedJSON = localStorage.getItem(LOCAL_STORAGE_KEY) || "{}";
      saved = JSON.parse(savedJSON) || {};
    } catch (error) {
      console.error("Failed to read settings from localStorage", error);
    }

    tempSettings = {
      ...DEFAULT_SETTINGS,
      ...saved,
    };
  }
  return tempSettings;
}

function _saveSettings() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tempSettings));
  } catch (error) {
    console.error("Failed to write settings to localStorage", error);
  }
}

export default {
  getSettings(): SettingsObject {
    return _fillAndGetTemp();
  },
  updateSettings(update: Partial<SettingsObject>) {
    tempSettings = {
      ..._fillAndGetTemp(),
      ...update,
    };
    _saveSettings();
  },
  resetSetting(key: SettingKeys) {
    this.updateSettings({ [key]: DEFAULT_SETTINGS[key] });
  },
  resetSettings() {
    this.updateSettings(DEFAULT_SETTINGS);
  },
  exportSettings(): string {
    _fillAndGetTemp();
    const shortSettingsArray = SHORT_SETTINGS_ORDER.map(
      (key) => tempSettings![key]
    );
    return shortSettingsArray.join("|");
  },
  importSettings(shortSettings: string) {
    const shortSettingsArray = shortSettings.split("|");

    const parsedSettings = {};
    for (let index = 0; index < shortSettingsArray.length; index++) {
      if (
        shortSettingsArray[index] == null ||
        shortSettingsArray[index] == ""
      ) {
        console.log("Skipping value since missing or invalid");
        continue;
      }

      const key = SHORT_SETTINGS_ORDER[index];
      if (key == null) {
        console.error(
          "SHORT_SETTINGS_ORDER does not match imported settings",
          index,
          shortSettingsArray[index]
        );
        break;
      }
      parsedSettings[key] = JSON.parse(JSON.parse(shortSettingsArray[index]));
    }

    this.updateSettings(parsedSettings);
  },
};
