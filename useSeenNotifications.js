import { useEffect, useState } from "react";

const STORAGE_KEY = "seenNotifications";

export function useSeenNotifications() {
  const [seenIds, setSeenIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSeenIds(JSON.parse(stored));
  }, []);

  function markAsSeen(id) {
    if (seenIds.includes(id)) return;

    const updated = [...seenIds, id];
    setSeenIds(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function isSeen(id) {
    return seenIds.includes(id);
  }

  return { markAsSeen, isSeen };
}
