import { onMounted, onUnmounted, ref } from "vue";

const MINUTE_MS = 60 * 1000;
const CHECK_INTERVAL_MS = 500;

// Shared by all callers. The timer runs only while a component uses it.
const now = ref<Date>(new Date());
let intervalTimerID: ReturnType<typeof setInterval> | null = null;
let userCount = 0;

/** Shared reactive `Date` that updates once the clock moved 60+ seconds. */
export function useMinuteNow() {

  onMounted(() => {
    userCount++;
    if (userCount > 1) return;

    now.value = new Date();
    intervalTimerID = setInterval(() => {
      const current = new Date();
      if (current.valueOf() - now.value.valueOf() >= MINUTE_MS) {
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
