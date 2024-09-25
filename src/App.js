
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './page/HomePage/HomePage';
import Admin from './page/Admin/Admin';
import Login from './Component/Information/Login'
import Register from './Component/Information/Register'
import ManageUser from './page/Admin/MangeUser/ManageUser'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/manage-user" element={<ManageUser />}></Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>

  );
}

export default App;
