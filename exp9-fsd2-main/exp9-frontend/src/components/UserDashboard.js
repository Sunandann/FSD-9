import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import client from "../api/client";
import { getSession } from "../utils/session";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const session = getSession();
  const navigate = useNavigate();

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await client.get("/api/user/profile");
      setProfile(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("401 Unauthorized: Please login again.");
      } else if (err.response?.status === 403) {
        setError("403 Forbidden: You do not have permission.");
      } else {
        setError("Could not load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          User Dashboard
        </Typography>
        <Typography color="text.secondary">
          Accessible to USER and ADMIN roles.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Button variant="contained" color="success" onClick={loadProfile} disabled={loading}>
              {loading ? <CircularProgress size={22} color="inherit" /> : "Get /api/user/profile"}
            </Button>

            {session?.role === "ADMIN" ? (
              <Button variant="outlined" color="warning" onClick={() => navigate("/admin")}>
                Go to Admin Dashboard
              </Button>
            ) : (
              <Alert severity="info" sx={{ mb: 0 }}>
                Admin controls are hidden for USER role.
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      {profile && (
        <Card sx={{ borderRadius: 3, backgroundColor: "#f8fcff" }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Profile Response
            </Typography>
            <Typography>
              <strong>Message:</strong> {profile.message}
            </Typography>
            <Typography>
              <strong>Username:</strong> {profile.username}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
