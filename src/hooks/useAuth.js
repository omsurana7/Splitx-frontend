import { useEffect, useState } from "react";

const useAuth = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setUserId(parseInt(id));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUserId(null);
    window.location.href = "/login";
  };

  return { userId, logout };
};

export default useAuth;
