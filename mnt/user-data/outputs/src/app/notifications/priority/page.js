"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { fetchNotifications } from "@/services/api";
import { Log } from "@/middleware/logger";
import NotificationCard from "@/components/notifications/NotificationCard";
import NotificationSkeleton from "@/components/notifications/NotificationSkeleton";
import EmptyState from "@/components/notifications/EmptyState";
import { useSeenNotifications } from "@/hooks/useSeenNotifications";
import { sortByPriority } from "@/utils/prioritySort";

const LIMIT = 50;

export default function PriorityInboxPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { markAsSeen, isSeen } = useSeenNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "Priority inbox loaded");
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    setError(null);

    await Log("frontend", "info", "api", "Fetching notifications for priority inbox");

    try {
      const data = await fetchNotifications({ page: 1, limit: LIMIT, type: "" });
      const raw = data.notifications || data;
      setNotifications(sortByPriority(raw));
      await Log("frontend", "info", "api", "Priority inbox notifications displayed");
    } catch (err) {
      setError("Something went wrong while loading notifications.");
      await Log("frontend", "error", "api", "Failed to fetch priority inbox notifications");
    } finally {
      setLoading(false);
    }
  }

  function handleCardClick(id) {
    Log("frontend", "info", "component", "Notification marked as seen");
    markAsSeen(id);
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 6, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" color="text.primary">Priority Inbox</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Sorted by importance: Placement → Result → Event, then latest first
        </Typography>
      </Box>

      {loading && <NotificationSkeleton count={5} />}

      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={loadNotifications}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <EmptyState message="Your priority inbox is empty" />
      )}

      {!loading && !error && notifications.map((n, idx) => (
        <NotificationCard
          key={n.id ?? idx}
          notification={n}
          seen={isSeen(n.id)}
          onClick={() => handleCardClick(n.id)}
        />
      ))}
    </Container>
  );
}
