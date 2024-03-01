export interface CycleItem {
  cycle: number;
  date: Date;
}

export const enum SettingKeys {
  TimeToFallAsleep = "TimeToFallAsleep",
  SleepCycleLength = "SleepCycleLength",
  CycleCountStart = "CycleCountStart",
  CyclesCountEnd = "CyclesCountEnd",
  IdealWakeUp = "IdealWakeUp",
  TwentyFourHour = "TwentyFourHour",
  BestCycle = "BestCycle",
  CycleClock = "CycleClock",
  DarkerMode = "DarkerMode",
}

export type SettingsObject = {
  [SettingKeys.TimeToFallAsleep]: number;
  [SettingKeys.SleepCycleLength]: number;
  [SettingKeys.CycleCountStart]: number;
  [SettingKeys.CyclesCountEnd]: number;
  [SettingKeys.IdealWakeUp]: number;
  [SettingKeys.TwentyFourHour]: boolean;
  [SettingKeys.BestCycle]: number;
  [SettingKeys.CycleClock]: boolean;
  [SettingKeys.DarkerMode]: boolean;
};
