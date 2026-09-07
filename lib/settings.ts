export interface PortalSettings {
  themeAccent: "yellow" | "pink" | "blue" | "emerald" | "purple";
  viewerPreference: "split" | "video" | "notes";
  watermarkDensity: "low" | "medium" | "high";
  defaultReadingMode: "light" | "dark" | "sepia" | "midnight";
  notificationsEnabled: boolean;
}

export const DEFAULT_SETTINGS: PortalSettings = {
  themeAccent: "yellow",
  viewerPreference: "split",
  watermarkDensity: "medium",
  defaultReadingMode: "dark",
  notificationsEnabled: true,
};

export function getPortalSettings(): PortalSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem("portal_settings");
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch (e) {
    console.error("Error reading portal settings:", e);
  }
  return DEFAULT_SETTINGS;
}

export function savePortalSettings(settings: Partial<PortalSettings>): PortalSettings {
  const current = getPortalSettings();
  const updated = { ...current, ...settings };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("portal_settings", JSON.stringify(updated));
      window.dispatchEvent(new Event("portal_settings_updated"));
    } catch (e) {
      console.error("Error saving portal settings:", e);
    }
  }
  return updated;
}

export function getWatermarkOpacity(density: "low" | "medium" | "high"): number {
  switch (density) {
    case "low":
      return 0.15;
    case "medium":
      return 0.35;
    case "high":
      return 0.55;
    default:
      return 0.35;
  }
}
