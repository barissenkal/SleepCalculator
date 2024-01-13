import settings from "./settings"

export function updateDarkerMode() {
  const { DarkerMode } = settings.getSettings();
  const appEl = document.getElementById("app");
  if (DarkerMode) {
    appEl.classList.add("darker");
  } else {
    appEl.classList.remove("darker");
  }
}