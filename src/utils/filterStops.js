function filterStops(arr, arrStops) {
  if (!arrStops.length) {
    return arr;
  }
  const filtered = [];
  arr.forEach((item) => {
    arrStops.forEach((stop) => {
      if (item.segments[0].stops.length === stop.number) {
        filtered.push(item);
      }
    });
  });
  return filtered;
}

export default filterStops;
