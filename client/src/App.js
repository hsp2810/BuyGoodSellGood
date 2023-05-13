import React, { useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import './utilities/styles/main.css';
import { authenticate } from './services/authenticate';
import Saved from './pages/Saved';
import Inventory from './pages/Inventory';
import InsertPost from './pages/InsertPost';
import { useDispatch } from 'react-redux';
import InventoryPost from './pages/InventoryPost';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import SavedPost from './pages/SavedPost';
import EditInventoryPost from './pages/EditInventoryPost';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const { status, data } = await authenticate('/login');

    if (status === 200) {
      dispatch({
        type: 'setLoginUserCredentials',
        payload: data,
      });
      dispatch({
        type: 'changeLogin',
        payload: 'false',
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home">
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="inventory">
            <Route index element={<Inventory />} />
            <Route path=":id" element={<InventoryPost />} />
            <Route path=":id/edit" element={<EditInventoryPost />} />
            <Route path="insert" element={<InsertPost />} />
          </Route>
          <Route path="saved">
            <Route index element={<Saved />} />
            <Route path=":id" element={<SavedPost />} />
          </Route>
          <Route path="post/:id" element={<Post />} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

/*
  
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
*/
