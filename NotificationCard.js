import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { timeAgo } from "@/utils/timeAgo";

// spec: placement → green, result → blue, event → gray
const TYPE_CHIP = {
  Placement: { color: "success", label: "Placement" },
  Result:    { color: "primary", label: "Result" },
  Event:     { color: "default", label: "Event" },
};

export default function NotificationCard({ notification, seen, onClick }) {
  const { type, message, timestamp } = notification;
  const chip = TYPE_CHIP[type] ?? { color: "default", label: type };

  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: "pointer",
        opacity: seen ? 0.55 : 1,
        backgroundColor: seen ? "grey.50" : "background.paper",
        transition: "box-shadow 0.15s ease, opacity 0.2s ease",
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
      }}
    >
      <CardContent sx={{ pb: "14px !important" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip label={chip.label} color={chip.color} size="small" />
            {!seen && (
              <FiberManualRecordIcon sx={{ fontSize: 9, color: "primary.main" }} />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {timeAgo(timestamp)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.primary"
          fontWeight={seen ? 400 : 600}
          sx={{ lineHeight: 1.6 }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
