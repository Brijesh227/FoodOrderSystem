import React, { useEffect, useReducer } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import firebaseDb from "../../Firebase/firebaseconfig";
import { ref, update, onValue} from "firebase/database";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = props => {
  
  const { foodtype, foodName } = useParams();
  const navigate = useNavigate();

  let initialState = {
    description: "",
    price: 0
  }

  function actionGenerator(type,value) {
    return {
      type,
      payload: {
        value
      }
    }
  }

  const reducer = (state = initialState,action) => {
    switch (action.type) {
      case 'DESC':
        return { 
          ...state,
          description: action.payload.value
        }
      case 'PRICE':
        return { 
          ...state,
          price: action.payload.value
        }
      default :
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const dbRef = ref(firebaseDb, `FoodDish/${foodName}`);
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.key === 'description'){
          dispatch(actionGenerator('DESC',childSnapshot.val()));
        } 
        if(childSnapshot.key === 'price') {
          dispatch(actionGenerator('PRICE',childSnapshot.val()));
        }
      });
    });
  }, [foodName])
  
  const EditItem = (event) => {
    event.preventDefault();
    const itemRef = ref(firebaseDb, `FoodDish/${foodName}`);
    if(state.description && state.price) {
      update(itemRef, {
        description: state.description,
        price: state.price,
      })
      .then(() => {
        toast.success("Item Updated successfully");
        handleClose();
      })
      .catch((error) => {
        toast.error("Error updating item");
      });
    } else {
      toast.error("All field are required.");
    }
  }
  
  const handleClose = () => {
    props.handleClickOpen(false);
    navigate(-1);
  };
  
  return (
    <Dialog open={props.openDialogue} onClose={handleClose}>
      <DialogTitle>Edit FoodDish</DialogTitle>
      <DialogContent>
        <Grid 
          container 
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="Description"
              value={state.description}
              variant="standard"
              onChange={(e) => dispatch(actionGenerator('DESC',e.target.value))}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Price"
              type="number"
              value={state.price}
              InputProps={{
                inputProps: { min: 0 }
              }}
              variant="standard"
              onChange={(e) => dispatch(actionGenerator('PRICE',e.target.value))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={EditItem}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit;