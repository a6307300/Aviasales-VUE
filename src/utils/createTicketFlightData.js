import { format, addMinutes } from "date-fns";

export function formatTime(item) {
  return `${format(new Date(item.date), "k:mm")} - ${format(
    addMinutes(new Date(item.date), item.duration),
    "k:mm"
  )}`;
}

export function formatDuration(duration) {
  return `${Math.floor(duration / 60)}ч ${
    duration - Math.floor(duration / 60) * 60
  }м`;
}

export function formatStops(stopsNumber) {
  return `${stopsNumber ? stopsNumber : "НЕТ"} ${
    stopsNumber === 1
      ? "ОСТАНОВКА"
      : (stopsNumber === 2) | (stopsNumber === 3) | (stopsNumber === 4)
      ? "ОСТАНОВКИ"
      : "ОСТАНОВОК"
  }`;
}
