import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SharedBrain from "./pages/SharedBrain";
import PageNotFound from "./pages/PageNotFound";
import { JSX } from "react";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import { PuffLoader } from "react-spinners";
import Sidebar from "./components/Sidebar";
import Documents from "./pages/Documents";
import Youtube from "./pages/Youtube";
import Twitter from "./pages/Twitter";
import Tags from "./pages/Tags";
import Links from "./pages/Links";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <PuffLoader color="#5046e5" size="100" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full flex h-screen">
      <div className="h-screen hidden lg:block">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/twitter"
          element={<PrivateRoute element={<Twitter />} />}
        />
        <Route
          path="/youtube"
          element={<PrivateRoute element={<Youtube />} />}
        />
        <Route
          path="/documents"
          element={<PrivateRoute element={<Documents />} />}
        />
        <Route path="/brain/share/:id" element={<SharedBrain />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
