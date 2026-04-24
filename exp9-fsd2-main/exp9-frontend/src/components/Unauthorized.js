import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Unauthorized() {
  const location = useLocation();
  const navigate = useNavigate();
  const required = location.state?.requiredRoles?.join(", ") || "ADMIN";
  const current = location.state?.currentRole || "Unknown";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Card sx={{ maxWidth: 640, borderRadius: 3, width: "100%" }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h4" fontWeight={700}>
              Access Denied
            </Typography>

            <Alert severity="error">
              Your role is <strong>{current}</strong>. Required role: <strong>{required}</strong>.
            </Alert>

            <Typography color="text.secondary">
              This page demonstrates frontend role protection. Unauthorized users are blocked before
              protected actions can be performed.
            </Typography>

            <Stack direction="row" spacing={1.5}>
              <Button variant="contained" onClick={() => navigate("/")}>
                Go to Login
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
