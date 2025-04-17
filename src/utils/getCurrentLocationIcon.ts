export function getCurrentLocationIcon(color: string = "#007aff") {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="white" />
      <circle cx="20" cy="20" r="7" fill="${color}" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="${color}" stroke-opacity="0.3" stroke-width="4"/>
    </svg>
  `;
  const url = `data:image/svg+xml;base64,${btoa(svg)}`;

  const isReady =
    typeof window !== "undefined" &&
    window.google &&
    window.google.maps &&
    typeof window.google.maps.Size === "function" &&
    typeof window.google.maps.Point === "function";

  if (isReady) {
    return {
      url,
      scaledSize: new window.google.maps.Size(48, 48),
      anchor: new window.google.maps.Point(24, 24),
    };
  }

  return { url };
}
