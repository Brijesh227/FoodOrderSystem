import React, { useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  CssBaseline,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseDb from "../../Firebase/firebaseconfig";
import { ref, child, get } from "firebase/database";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyLoggedInUser = JSON.parse(
      localStorage.getItem("loggedInUserID")
    );
    if (alreadyLoggedInUser?.userId) {
      navigate("/home");
    }
  }, []);

  const verifyUser = (data) => {
    const dbRef = ref(firebaseDb);
    get(child(dbRef, `/userPool`))
      .then((snapshot) => {
        for (const [key, value] of Object.entries(snapshot.val())) {
          if (
            value.email === data.get("email") &&
            value.password === data.get("password")
          ) {
            navigate("/home");
            localStorage.setItem(
              "loggedInUserID",
              JSON.stringify({ userId: key, role: value.role })
            );
            return;
          } else if (
            key ===
            Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]
          ) {
            toast.error("Please enter valid credentials");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password")) {
      await verifyUser(data);
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={login}
          sx={{ alignItems: "center", marginTop: 10 }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid>
              <h4>Login</h4>
            </Grid>
            <Grid item md={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
            <Grid item md={4}>
              <Button type="submit" color="primary" variant="contained">
                {" "}
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;
