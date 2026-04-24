import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import client from "../api/client";
import { deriveRole, getSession, saveSession } from "../utils/session";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate(session.role === "ADMIN" ? "/admin" : "/user", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await client.post("/api/auth/login", {
        username,
        password
      });

      const role = deriveRole(response.data.roles);

      if (!role) {
        throw new Error("Role mapping failed. Backend did not return expected roles.");
      }

      const authToken =
        response.data.basicAuthToken ||
        `Basic ${window.btoa(`${username}:${password}`)}`;

      saveSession({
        username: response.data.username || username,
        role,
        authToken
      });

      navigate(role === "ADMIN" ? "/admin" : "/user", { replace: true });
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError(err.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="py-5">
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                RBAC Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in with your Experiment 7 backend user.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />

                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
                </Button>
              </Stack>
            </form>

            <Alert severity="info">
              USER: user1 / user123 | ADMIN: admin1 / admin123
            </Alert>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
