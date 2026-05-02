"use client";

import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { label: "All", href: "/notifications" },
  { label: "Priority Inbox", href: "/notifications/priority" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "background.paper", borderBottom: "1px solid #E2E8F0" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <NotificationsIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ flexGrow: 0, mr: 3 }}>
            Notifications
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  size="small"
                  variant={isActive ? "contained" : "text"}
                  disableElevation
                  sx={{
                    color: isActive ? "white" : "text.secondary",
                    backgroundColor: isActive ? "primary.main" : "transparent",
                    "&:hover": { backgroundColor: isActive ? "primary.dark" : "grey.100" },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
