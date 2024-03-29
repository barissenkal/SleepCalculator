// @ts-check

import settings from "./settings";

/**
 * @param {boolean} hour24
 * @returns {Intl.DateTimeFormat}
 */
function generateTimeFormatter(hour24) {
  return new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
    hour12: !hour24,
  });
}

/** @type {Intl.DateTimeFormat} */
let timeFormatter = generateTimeFormatter(
  settings.getSettings().TwentyFourHour
);

export function updateFormatters() {
  timeFormatter = generateTimeFormatter(settings.getSettings().TwentyFourHour);
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date) {
  return timeFormatter.format(date);
}

/**
 * @param {number} totalMinutes
 * @returns {string}
 */
export function formatHours(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  let formattedTime = `${hours}h`;

  if (minutes > 0) {
    formattedTime += ` ${minutes}m`;
  }

  return formattedTime;
}
