import MuiProvider from "@/components/MuiProvider";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export const metadata = {
  title: "Notification Inbox",
  description: "Manage your notifications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        <MuiProvider>
          <Navbar />
          <Box component="main" sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
            {children}
          </Box>
        </MuiProvider>
      </body>
    </html>
  );
}
