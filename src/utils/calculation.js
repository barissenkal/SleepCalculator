// @ts-check

import settings from "./settings";

const MINUTE_MS = 60 * 1000;

/** @typedef {import('../enums').CycleItem} CycleItem */

/**
 * @param {Date} [now]
 * @returns {Array<CycleItem>}
 */
export function getWakeUpTimes(now = new Date()) {
  const nowMs = now.valueOf();
  const {
    TimeToFallAsleep,
    SleepCycleLength,
    CycleCountStart,
    CyclesCountEnd,
  } = settings.getSettings();

  /** @type {Array<CycleItem>} */
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

/**
 * @param {number} idealWakeUpMinutes
 * @returns {Date}
 */
function _getNextWakeUpTime(idealWakeUpMinutes) {
  const now = new Date();
  const hours = Math.floor(idealWakeUpMinutes / 60);
  const minutes = idealWakeUpMinutes - hours * 60;

  const idealWakeUpDate = new Date(now);
  idealWakeUpDate.setHours(hours, minutes, 0, 0);

  if (
    now.getHours() > hours ||
    (now.getHours() === hours && now.getMinutes() >= minutes)
  ) {
    idealWakeUpDate.setDate(idealWakeUpDate.getDate() + 1);
  }

  return idealWakeUpDate;
}

/**
 * @param {number} idealWakeUpMinutes
 * @returns {Array<CycleItem>}
 */
export function getGoToBedTimes(idealWakeUpMinutes) {
  const wakeUpMs = _getNextWakeUpTime(idealWakeUpMinutes).valueOf();
  const {
    TimeToFallAsleep,
    SleepCycleLength,
    CycleCountStart,
    CyclesCountEnd,
  } = settings.getSettings();

  /** @type {Array<CycleItem>} */
  let times = [];

  for (let index = CyclesCountEnd; index >= CycleCountStart; index--) {
    times.push({
      cycle: index,
      date: new Date(
        wakeUpMs - (TimeToFallAsleep + index * SleepCycleLength) * MINUTE_MS
      ),
    });
  }

  return times;
}

/**
 * @param {string} timeStr
 * @returns {number} -- minutes
 */
export function parseTimeString(timeStr) {
  const [hourStr, minuteStr] = timeStr.split(":");
  return parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
}

/**
 * @param {number} totalMinutes
 * @returns {string} -- "XX:XX"
 */
export function getTimeString(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;
  return [hours, minutes].map((num) => ("" + num).padStart(2, "0")).join(":");
}
