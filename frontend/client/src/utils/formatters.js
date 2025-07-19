// src/utils/formatters.js

export function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = parseInt(match?.[1] || "0", 10);
  const minutes = parseInt(match?.[2] || "0", 10);
  return hours * 60 + minutes;
}

export function formatDuration(iso) {
  const totalMinutes = parseDuration(iso);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
