import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLoginSucc } from "../redux/auth/auth.action";

export default function PrivateRoute({ children }) {
  let token = localStorage.getItem("token");
  // console.log("Private",token)
  const dispatch = useDispatch();
  if (token) {
    dispatch(authLoginSucc({ token}));
    return children;
  }
  return <Navigate to={"/login"} />;
}
