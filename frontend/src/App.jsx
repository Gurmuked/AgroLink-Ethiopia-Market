import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardWatcher from "./components/Auth/DashboardWatcher";
import BuyerLayout from "./components/BuyerDashBoard/SideDetail/BuyerLayout";
import BuyerOverview from "./components/BuyerDashBoard/SideDetail/BuyerOverview";
import ProductsList from "./components/BuyerDashBoard/SideDetail/ProductsList";
import Orders from "./components/BuyerDashBoard/SideDetail/Orders";
import Transactions from "./components/BuyerDashBoard/SideDetail/Transactions";
import Profile from "./components/BuyerDashBoard/SideDetail/Profile";
import Settings from "./components/BuyerDashBoard/SideDetail/Settings";
import Reviews from "./components/BuyerDashBoard/SideDetail/Reviews";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import SellerLayout from "./components/SellerDashboard/SideDetail/SellerLayout";
import SellerOverview from "./components/SellerDashboard/SideDetail/SellerOverview";
import SellerAddProduct from "./components/SellerDashboard/SideDetail/SellerAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SystemFeature from "./components/Feature/SystemFeature";
import Services from "./pages/Services";
import About from "./pages/About";
import UploadDocs from "./components/Verification/UploadDocs";
import UploadKeb from "./components/Verification/UploadKeb";
import UploadSelf from "./components/Verification/UploadSelf";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <DashboardWatcher />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/features" element={<SystemFeature />} />
        <Route path="/services" element={<Services /> } />
        <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoute allowedRoles={["Trader"]} />}>
            <Route path="/buyer-dashboard" element={<BuyerLayout />}>
              <Route index element={<BuyerOverview />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="orders" element={<Orders />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="verification/upload-docs" element={<UploadDocs />} />
              <Route path="verification/upload-keb" element={<UploadKeb />} />
              <Route path="verification/upload-self" element={<UploadSelf />} />
              {/* Add additional buyer nested routes here */}
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Farmer"]} />}>
            <Route path="/seller-dashboard" element={<SellerLayout />}>
              <Route index element={<SellerOverview />} />
              <Route path="add-product" element={<SellerAddProduct />} />
              {/* Add additional seller nested routes here */}
            </Route>
          </Route>
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
