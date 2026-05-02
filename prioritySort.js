const PRIORITY = {
  placement: 1,
  result: 2,
  event: 3,
};

export function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const pa = PRIORITY[a.type?.toLowerCase()] ?? 99;
    const pb = PRIORITY[b.type?.toLowerCase()] ?? 99;

    if (pa !== pb) return pa - pb;

    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}
