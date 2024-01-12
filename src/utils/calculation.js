// @ts-check

import settings from "./settings";

const MINUTE_MS = 60 * 1000;

/** @typedef {import('../enums').WakeUpTime} WakeUpTime */

/**
 * @param {Date} [now]
 * @returns {Array<WakeUpTime>}
 */
export function getWakeUpTimes(now = new Date()) {
  const nowMs = now.valueOf();
  const {
    TimeToFallAsleep,
    SleepCycleLength,
    CycleCountStart,
    CyclesCountEnd,
  } = settings.getSettings();

  /** @type {Array<WakeUpTime>} */
  let times = [];

  for (let index = CycleCountStart; index <= CyclesCountEnd; index++) {
    times.push({
      cycle: index,
      date: new Date(
        nowMs + (TimeToFallAsleep + index * SleepCycleLength) * MINUTE_MS
      ),
    });
  }

  return times;
}
