import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { clearSession, getSession } from "../utils/session";

export default function AppShell({ children }) {
  const session = getSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

  if (!session) {
    return <div className="page-shell">{children}</div>;
  }

  return (
    <div className="page-shell">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Experiment 9 RBAC Frontend
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button color="inherit" onClick={() => navigate("/user")}>
              User Dashboard
            </Button>

            {session.role === "ADMIN" && (
              <Button color="inherit" onClick={() => navigate("/admin")}>
                Admin Dashboard
              </Button>
            )}

            <Chip
              size="small"
              color={session.role === "ADMIN" ? "warning" : "default"}
              label={`${session.username} (${session.role})`}
            />

            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Box>{children}</Box>
      </Container>
    </div>
  );
}
