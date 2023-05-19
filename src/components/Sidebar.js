import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseDb from "../Firebase/firebaseconfig";
import { child, get, ref } from "firebase/database";

const Sidebar = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(firebaseDb);
    get(child(dbRef, `FoodCategory`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFoodCategory([...Object.keys(snapshot.val())]);
          navigate(`/home/${Object.keys(snapshot.val())[0]}`, {
            state: {
              category: Object.keys(snapshot.val())[0],
            },
          });
        }
      })
      .catch((error) => {
        toast.error("Error fetching food category");
      });

    // axios.get("https://jsonplaceholder.typicode.com/posts")
    // .then((res) => {
    //   setFoodCategory(res.data.filter((foodCategory) => foodCategory.title.length < 20));
    // })
    // .catch((err) => {
    // })
  }, []);

  const handleListItemClick = (item, index) => {
    navigate(`/home/${item}`, {
      state: {
        category: item,
      },
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {foodCategory &&
              foodCategory.map((foodCategory, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleListItemClick(foodCategory, 0)}
                  >
                    <ListItemText primary={foodCategory} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
