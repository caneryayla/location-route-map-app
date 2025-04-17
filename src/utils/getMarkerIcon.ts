export function getMarkerIcon(
  color: string
): google.maps.Icon | { url: string } {
  const svg = `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M512 85.333c-164.949 0-298.667 133.739-298.667 298.667 
      0 164.949 298.667 554.667 298.667 554.667s298.667-389.717 
      298.667-554.667C810.667 219.072 676.949 85.333 
      512 85.333z m0 448a149.333 149.333 0 1 1 0-298.666 
      149.333 149.333 0 0 1 0 298.666z" fill="${color}" />
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
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  }

  return { url };
}
