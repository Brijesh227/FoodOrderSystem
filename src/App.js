import './App.css';
import Maincontainer from './components/Maincontainer';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import AddItem from './components/Home/AddItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Maincontainer />}>
          <Route path="addItem" element={<AddItem />} />
          <Route path=":foodtype" element={<Home />} />
          <Route path=":foodtype/edit/:foodName" element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        pauseOnHover
      />
    </div>
  );
}

export default App;
