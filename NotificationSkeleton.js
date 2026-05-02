import { Box, Card, CardContent, Skeleton } from "@mui/material";

function SkeletonCard() {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
          <Skeleton variant="rounded" width={72} height={24} />
          <Skeleton variant="text" width={80} />
        </Box>
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
}

export default function NotificationSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
