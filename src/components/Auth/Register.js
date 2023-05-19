import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  CssBaseline,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseDb from "../../Firebase/firebaseconfig";
import { ref, set, push, get, child } from "firebase/database";

const Register = () => {
  const [emailValid, setemailValid] = useState(false);
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const dbRef = ref(firebaseDb);
    get(child(dbRef, `/userPool`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserArray(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const checkUserExisted = async (data) => {
    for (const element of Object.values(userArray)) {
      if (element.email === data.get("email")) {
        toast.error("User already existed.");
        return true;
      }
    }
    return false;
  };

  const createUser = async (user) => {
    const isUserExisted = await checkUserExisted(user);
    if (!isUserExisted) {
      const userPoolRef = ref(firebaseDb, "userPool");
      const newUserRef = push(userPoolRef);
      return set(newUserRef, {
        email: user.get("email"),
        firstname: user.get("firstname"),
        lastname: user.get("lastname"),
        role: "user",
        password: user.get("password"),
      })
        .then(() => {
          toast.success("User created successfully");
          return true;
        })
        .catch((error) => {
          toast.error("Error creating user");
          return false;
        });
    }
    return false;
  };

  const navigate = useNavigate();
  const registerUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("email") &&
      data.get("firstname") &&
      data.get("lastname") &&
      data.get("password")
    ) {
      const isCreated = await createUser(data);
      if (isCreated) {
        navigate("/login");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const handleEmailChange = (event) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(event.target.value)) {
      setemailValid(false);
    } else {
      setemailValid(true);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={registerUser}
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
              <h4>Register</h4>
            </Grid>
            <Grid item md={12}>
              <TextField name="firstname" label="Firstname" required />
            </Grid>
            <Grid item md={12}>
              <TextField name="lastname" label="Lastname" required />
            </Grid>
            <Grid item md={12}>
              <TextField
                name="email"
                label="Email"
                error={emailValid}
                onChange={handleEmailChange}
                required
                helperText={emailValid ? "Enter a valid email." : ""}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                name="password"
                type="password"
                label="Password"
                required
              />
            </Grid>
            <Grid item md={4}>
              <Button type="submit" color="primary" variant="contained">
                {" "}
                Register{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Register;
