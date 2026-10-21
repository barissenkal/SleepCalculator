import { onMounted, onUnmounted, ref } from "vue";

const MINUTE_MS = 60 * 1000;
const CHECK_INTERVAL_MS = 500;

function getCurrentMinute() {
  return new Date(Math.floor(Date.now() / MINUTE_MS) * MINUTE_MS);
}

// Shared by all callers. The timer runs only while a component uses it.
const now = ref<Date>(getCurrentMinute());
let intervalTimerID: ReturnType<typeof setInterval> | null = null;
let userCount = 0;

/** Shared reactive `Date`, rounded down to the minute. Updates each minute. */
export function useMinuteNow() {
  onMounted(() => {
    userCount++;
    if (userCount > 1) return;

    now.value = getCurrentMinute();
    intervalTimerID = setInterval(() => {
      const current = getCurrentMinute();
      if (current.valueOf() !== now.value.valueOf()) {
        now.value = current;
      }
    }, CHECK_INTERVAL_MS);
  });

  onUnmounted(() => {
    userCount--;
    if (userCount === 0 && intervalTimerID) {
      clearInterval(intervalTimerID);
    }
  });

  return now;
}
