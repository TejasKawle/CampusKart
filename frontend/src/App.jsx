import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SellProduct from "./components/SellProduct";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import Cursor from "./components/Cursor";
const App = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Cursor />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
