import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
  isAuthenticated: boolean;
  image: string;
  name: string;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  postedContent: Post[];
  refreshTrigger: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  gettingDate: (date:Date)=>string;
}

interface Post {
  _id: string;
  title: string;
  link: string;
  type: string;
  date: Date;
  description: string;
  userId: {
    _id: string;
    username: string;
  };
  __v: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [postedContent, setPostedContent] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchingPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPostedContent(res.data.content);
        console.log(res.data.content);
      } catch (error: any) {
        console.log("Error fetching posts", error);
        if (error.response?.status === 401) {
          // maybe token expired or invalid
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/login"); // or wherever your login route is
        }
      } finally {
        setLoading(false);
      }
    };
    fetchingPosts();
  }, [refreshTrigger]);

  const verifyToken = async (token: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Token verified with backend:", res.data);
      return res.data.user;
    } catch (err) {
      console.error("❌ Token verification failed:", err);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<any>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        // Token is valid locally, now double-check with backend
        verifyToken(token)
          .then((validUser) => {
            if (validUser) {
              setUser(validUser);
              setIsAuthenticated(true);
            } else {
              logout(); // token might be tampered
            }
          })
          .catch((err) => {
            console.error("❌ Error verifying token on startup:", err);
            logout();
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // Token is expired
        logout();
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Invalid token on startup:", err);
      logout();
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    try {
      localStorage.setItem("token", token);
      const validUser = await verifyToken(token);
      if (validUser) {
        setUser(validUser);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        throw new Error("Invalid user from backend.");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

   const gettingDate = (date: Date) => {
     return new Date(date).toLocaleDateString("en-IN");
   };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        postedContent,
        refreshTrigger,
        setRefreshTrigger,
        gettingDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
