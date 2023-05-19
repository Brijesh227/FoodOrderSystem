import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTwoToneIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CssBaseline,
  Container,
  Typography,
  CardActions,
} from "@mui/material";
import Edit from "./Edit";
import firebaseDb from "../../Firebase/firebaseconfig";
import {
  ref,
  query,
  equalTo,
  orderByChild,
  remove,
  onValue,
} from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { actionList, actionGenerator } from "../../Redux/action";

const mapDispatchToProps = (dispatch) => {
  return {
    increase: (food) => dispatch(actionGenerator(actionList.INCREASE, food)),
    decrease: (food) => dispatch(actionGenerator(actionList.DECREASE, food)),
  };
};

const Home = (props) => {
  const { foodtype } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [FoodDish, setFoodDish] = useState([]);
  const [openDialogue, setDialogue] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const cart = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    const foodArray = [];
    const dbRef = ref(firebaseDb, "/FoodDish");
    onValue(
      query(dbRef, orderByChild("category"), equalTo(foodtype)),
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const foodObject = {
            name: childSnapshot.key,
            quantity: 0,
            ...childSnapshot.val(),
          };
          foodArray.push(foodObject);
        });
        setFoodDish(foodArray);
      }
    );
  }, [location?.state?.category]);

  useEffect(() => {
    const loggedInUserDetail = JSON.parse(
      localStorage.getItem("loggedInUserID")
    );
    if (loggedInUserDetail?.role === "admin_user") {
      setIsAdminUser(true);
    }
  }, []);

  const deleteFoodDish = async (foodName) => {
    const itemRef = ref(firebaseDb, `FoodDish/${foodName}`);
    await remove(itemRef)
      .then(() => {
        const deleteFoodList = FoodDish.filter(
          (food) => food.name !== foodName
        );
        setFoodDish(deleteFoodList);
        toast.success("Item Updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating item");
      });
  };

  const handleClickOpen = async (isOpen, foodName) => {
    await setDialogue(isOpen);
    if (foodName) {
      navigate(`edit/${foodName}`);
    }
  };

  const getQuantity = (food) => {
    return cart.find((element) => element.name === food.name)?.quantity ?? 0;
  };

  return (
    <>
      <CssBaseline />
      <Container component="main">
        <Box sx={{ alignItems: "center", marginTop: 10 }}>
          {FoodDish &&
            FoodDish.map((food, index) => (
              <Card sx={{ maxWidth: 600, marginBottom: 5 }} key={index}>
                <CardHeader
                  action={
                    isAdminUser && (
                      <>
                        <IconButton
                          color="inherit"
                          onClick={() => handleClickOpen(true, food.name)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          onClick={() => deleteFoodDish(food.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )
                  }
                  title={food.name}
                  subheader={food.description}
                />
                <CardActions>
                  <div>
                    <Typography level="body3">Price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      {food.price}
                    </Typography>
                  </div>
                  <IconButton
                    variant="icon"
                    size="sm"
                    sx={{ ml: "auto" }}
                    onClick={() => props.increase(food)}
                  >
                    <AddTwoToneIcon />
                  </IconButton>
                  <Typography fontSize="lg">{getQuantity(food)}</Typography>
                  <IconButton
                    variant="icon"
                    size="sm"
                    sx={{ ml: "auto" }}
                    onClick={() => props.decrease(food)}
                  >
                    <RemoveOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </Box>
        <Edit
          openDialogue={openDialogue}
          handleClickOpen={handleClickOpen}
          setFoodDish={setFoodDish}
        />
      </Container>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Home);
