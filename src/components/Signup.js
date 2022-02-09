import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Linkof } from "react-router-dom";
import Home from "../Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Linkof to={`/Home`}>"go to home page"</Linkof>

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({
  User,
  setUser,
  userPassword,
  setUserPassword,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    // eslint-disable-next-line no-console
    register({
      email: data.get("email"),
      password: data.get("password"),
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
    });
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
    });
  };
  const navigate = useNavigate();
  const register = ({ email, password, firstname, lastname }) => {
    // console.log(userName, userPassword);
    console.log(email, password, firstname, lastname);
    fetch(`http://localhost:3001/users/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([firstname, password]),
    })
      .then((res) => res.json())
      .then((data) => {
        const { accessToken } = data;
        localStorage.accessToken = JSON.stringify(accessToken);
        accessToken
          ? setUser([firstname, localStorage.accessToken])
          : setUser(false);
        if (localStorage.accessToken) {
          navigate("/Home");
        }
      });
    setUserPassword("");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="signup">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "Background",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 3 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    <Linkof to={`/Signin`}>
                      Already have an account? Sign in
                    </Linkof>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
