import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './page/HomePage/HomePage';
import Admin from './page/Admin/Admin';
import Login from './Component/Information/Login';
import Register from './Component/Information/Register';
import ManageUser from './page/Admin/MangeUser/ManageUser';
import ManageCar from './page/Admin/ManageCar/ManageCar';
import CreateCar from './page/Admin/ManageCar/CreateCar/CreateCar';
import DetailCar from './page/Admin/ManageCar/DetailCar/DetailCar';
import UpdateCar from './page/Admin/ManageCar/UpdateCar/UpdateCar';
import CreateTrip from './page/Admin/ManageTrip/CreateTrip/CreateTrip';
import TripDetail from './page/Admin/ManageTrip/TripDetail/TripDetail';
import ManageTrip from './page/Admin/ManageTrip/ManageTrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/manage-user' element={<ManageUser />}></Route>
        <Route path='/admin/manage-car' element={<ManageCar />}></Route>
        <Route path='/admin/manage-car/create' element={<CreateCar />}></Route>
        <Route path='/admin/manage-car/detail' element={<DetailCar />}></Route>
        <Route path='/admin/manage-car/update' element={<UpdateCar />}></Route>
        <Route path="/admin/manage-trip" element={<ManageTrip />}></Route>
        <Route path="/admin/manage-trip/detail" element={<TripDetail />}></Route>
        <Route path="/admin/manage-trip/create" element={<CreateTrip />}></Route>

      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Router>
  );
}

export default App;
