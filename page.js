"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { fetchNotifications } from "@/services/api";
import { Log } from "@/middleware/logger";
import NotificationCard from "@/components/notifications/NotificationCard";
import NotificationSkeleton from "@/components/notifications/NotificationSkeleton";
import EmptyState from "@/components/notifications/EmptyState";
import { useSeenNotifications } from "@/hooks/useSeenNotifications";

const FILTER_OPTIONS = ["All", "Event", "Result", "Placement"];
const LIMIT = 10;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");

  const { markAsSeen, isSeen } = useSeenNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "Notifications page loaded");
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [page, selectedType]);

  async function loadNotifications() {
    setLoading(true);
    setError(null);

    const type = selectedType === "All" ? "" : selectedType;
    await Log("frontend", "info", "api", "Fetching filtered notifications");

    try {
      const data = await fetchNotifications({ page, limit: LIMIT, type });
      setNotifications(data.notifications || data);
      await Log("frontend", "info", "api", "Notifications displayed");
    } catch (err) {
      setError("Something went wrong while loading notifications.");
      await Log("frontend", "error", "api", "Failed to fetch filtered notifications");
    } finally {
      setLoading(false);
    }
  }

  function handleTypeChange(e) {
    Log("frontend", "info", "component", "Filter changed");
    setSelectedType(e.target.value);
    setPage(1);
  }

  function handlePrev() {
    Log("frontend", "info", "component", "Page changed");
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    Log("frontend", "info", "component", "Page changed");
    setPage((prev) => prev + 1);
  }

  function handleCardClick(id) {
    Log("frontend", "info", "component", "Notification marked as seen");
    markAsSeen(id);
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 6, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h5" color="text.primary">All Notifications</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Click a notification to mark it as read
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={selectedType} label="Filter" onChange={handleTypeChange}>
            {FILTER_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <EmptyState message="No notifications found" />
      )}

      {!loading && !error && notifications.map((n, idx) => (
        <NotificationCard
          key={n.id ?? idx}
          notification={n}
          seen={isSeen(n.id)}
          onClick={() => handleCardClick(n.id)}
        />
      ))}

      {!loading && !error && notifications.length > 0 && (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handlePrev}
            disabled={page === 1}
          >
            ← Previous
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60, textAlign: "center" }}>
            Page {page}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleNext}
            disabled={notifications.length < LIMIT}
          >
            Next →
          </Button>
        </Stack>
      )}
    </Container>
  );
}
