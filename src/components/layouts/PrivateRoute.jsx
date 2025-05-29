import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const {name,email:emails} = useSelector((state)=> state.userSlice)
  console.log(emails,"namee")
  const isLoading = false;
  const email = emails;
  const login = localStorage.getItem("login") === "true";
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email && !login) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
