import React,{ useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebaseDb from "../../Firebase/firebaseconfig";
import { ref, set, get, child, } from "firebase/database";
import { Box, TextField, Button, Container, Autocomplete, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {

  const [categoryList,setCategoryList] = useState([]);
  const navigate = useNavigate();

  const createItem = async (event) => {
    event.preventDefault();
    const item = new FormData(event.currentTarget);
    const itemRef = ref(firebaseDb, 'FoodDish/' + item.get("name"));
    if(item.get("description") && item.get("price") && item.get("category") && item.get("name")) {
      await set(itemRef, {
        description: item.get("description"),
        price: item.get("price"),
        category: item.get("category"),
      })
      .then(() => {
        toast.success("Item Added successfully");
        navigate(-1);
      })
      .catch((error) => {
        toast.error("Error adding item");
      });
    }else {
      toast.error("All fields are required");
    }
  }

  useEffect(() => {
    const dbRef = ref(firebaseDb);
    get(child(dbRef, '/FoodCategory')).then((snapshot) => {
      setCategoryList(Object.keys(snapshot.val()));
    }).catch((error) => {
      console.error(error);
    });
  }, [])
  

  return (
      <Container fixed>
        <Box
          component="form"
          noValidate
          onSubmit={createItem}
        >
          <Grid 
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid >
              <h3>Add Item</h3>
            </Grid> 
            <Grid item>
              <TextField
                name="name"
                label="Name"
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                name="description"
                label="Description"
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Price"
                type="number"
                name="price"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Autocomplete
                disablePortal
                options={categoryList}
                sx={{minWidth:210}}
                renderInput={(params) => <TextField {...params} name="category" label="Category"/>}
              />
            </Grid>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">ADD ITEM</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
  )
}

export default AddItem