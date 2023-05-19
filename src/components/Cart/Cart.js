import React from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector, connect } from 'react-redux';
import firebaseDb from "../../Firebase/firebaseconfig";
import { ref, push, set } from "firebase/database";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actionList, actionGenerator } from '../../Redux/action';

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (food) => dispatch(actionGenerator(actionList.REMOVE,food)),
    clearCart: () => dispatch({ type:actionList.CLEAR_CART })
  }
}

const Cart = (props) => {
  const cart = useSelector((state) => {
    return state.cart
  })
  const totalBill = useSelector((state) => {
    return state.cart.reduce((cartTotal, cartItem) => {
      const { price, quantity } = cartItem;
      cartTotal += Math.floor(quantity * price);
      return cartTotal;
    }, 0);
  })

  const placeOrder = () => {
    const { userId } = JSON.parse(localStorage.getItem('loggedInUserID'));
    const orderRef = ref(firebaseDb, `Orders/${userId}`);
    const newOrderRef = push(orderRef);
    return set(newOrderRef, cart)
    .then(() => {
      props.clearCart();
      toast.success("Order placed successfully");
    })
    .catch((error) => {
      toast.error("Error creating order");
    });
  }

  if (cart.every(food => food.quantity === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:"center",height:"100vh" }}>
        <h2>your bag is currently empty</h2>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent:"center" , marginTop: 10 }}>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          <div>
            My Cart
          </div>
          {cart.map((item,index) => (
            <ListItem
              key={index}
              disableGutters
              secondaryAction={
                <IconButton onClick={() => props.deleteItem(item)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.name} />
              <ListItemText secondary={item.quantity} sx={{ display: 'flex', justifyContent:"flex-end" }}/>
              <ListItemText secondary={item.price} sx={{ display: 'flex', justifyContent:"flex-end" }}/>
            </ListItem>
          ))}
          <Divider />
          <div>
            <Typography variant="h5" sx={{ my:2 }}>
              Total: {totalBill}
            </Typography>
            <Button 
              color="primary" 
              variant="contained"
              onClick={() => placeOrder()}
            > Order Now</Button>
          </div>
        </List>
      </Box>
    </>
  )
}

export default connect(null, mapDispatchToProps)(Cart);