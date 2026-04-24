import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import client from "../api/client";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAdmin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await client.get("/api/admin/dashboard");
      setAdminData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("401 Unauthorized: Please login again.");
      } else if (err.response?.status === 403) {
        setError("403 Forbidden: Admin role required.");
      } else {
        setError("Could not load admin dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfileAsAdmin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await client.get("/api/user/profile");
      setUserData(response.data);
    } catch (err) {
      setError("Could not load user profile endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          ADMIN role has access to admin and user endpoints.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="contained" color="error" onClick={loadAdmin} disabled={loading}>
              {loading ? <CircularProgress size={22} color="inherit" /> : "Get /api/admin/dashboard"}
            </Button>

            <Button variant="outlined" color="success" onClick={loadUserProfileAsAdmin} disabled={loading}>
              Get /api/user/profile
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      {adminData && (
        <Card sx={{ borderRadius: 3, backgroundColor: "#fff5f5" }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Admin API Response
            </Typography>
            <Typography>
              <strong>Message:</strong> {adminData.message}
            </Typography>
            <Typography>
              <strong>Username:</strong> {adminData.username}
            </Typography>
          </CardContent>
        </Card>
      )}

      {userData && (
        <Card sx={{ borderRadius: 3, backgroundColor: "#f1fff3" }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              User API Response (as ADMIN)
            </Typography>
            <Typography>
              <strong>Message:</strong> {userData.message}
            </Typography>
            <Typography>
              <strong>Username:</strong> {userData.username}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
