import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Components/Pages/LandingPage/Main";
import Navbar from "./Components/Layout/Header/Navbar";
import Footer from "./Components/Layout/Footer/Footer";
import Categories from "./Components/Pages/CategoriesPage/Categories";
import BlogsData from "./Components/Pages/Blogs/BlogsData";
import BlogDetails from "./Components/Pages/BlogDescription/BlogDetails";
import BookPages from "./Components/Pages/BookReading/BookPages";
import ItemDetail from "./Components/Pages/ItemDetails/ItemInfo";
import Preloaders from "./Components/Helpers/Loading/Preloaders";

// auth
import Login from "./Components/Auth/LoginUser/Login";
import SignUp from './Components/Auth/RegisterUser/Register'
import CustomNavBar from "./Components/CustomNavBar/CustomNavBar";
import Pricing from "./Components/Pricing/Pricing";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

//notifications
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function App() {
  return (
    <div>
      <Router>
        {/* <Preloaders/> */}
        <CustomNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/BlogsData" element={<BlogsData />} />
          <Route path="/BlogDetails" element={<BlogDetails />} /> */}
          {/* <Route path="/BookPages" element={<BookPages />} /> */}
          {/* <Route path="/Categories" element={<Categories />} /> */}
          <Route path="/ItemDetail" element={<ItemDetail />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
