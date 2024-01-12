const LOCAL_STORAGE_KEY = "settings";

enum SettingKeys {
  TimeToFallAsleep = "TimeToFallAsleep",
  SleepCycleLength = "SleepCycleLength",
  CycleCountStart = "CycleCountStart",
  CyclesCountEnd = "CyclesCountEnd",
  IdealWakeUp = "IdealWakeUp",
  TwentyFourHour = "TwentyFourHour",
  BestCycle = "BestCycle",
}

type SettingsObject = {
  [SettingKeys.TimeToFallAsleep]: number;
  [SettingKeys.SleepCycleLength]: number;
  [SettingKeys.CycleCountStart]: number;
  [SettingKeys.CyclesCountEnd]: number;
  [SettingKeys.IdealWakeUp]: number;
  [SettingKeys.TwentyFourHour]: boolean;
  [SettingKeys.BestCycle]: number;
};

const DEFAULT_SETTINGS: Readonly<SettingsObject> = Object.freeze({
  [SettingKeys.TimeToFallAsleep]: 20, // minutes
  [SettingKeys.SleepCycleLength]: 90, // minutes
  [SettingKeys.CycleCountStart]: 3,
  [SettingKeys.CyclesCountEnd]: 6,
  [SettingKeys.IdealWakeUp]: 36000, // 10:00
  [SettingKeys.TwentyFourHour]: true,
  [SettingKeys.BestCycle]: 5,
});

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
  KEY: SettingKeys,
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
    this.setSetting(key, DEFAULT_SETTINGS[key]);
  },
  resetSettings() {
    tempSettings = {
      ...DEFAULT_SETTINGS,
    };
  },
};
