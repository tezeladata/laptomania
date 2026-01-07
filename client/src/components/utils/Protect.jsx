import {useAuth} from "../../context/auth.context.jsx";
import {Navigate} from "react-router";

const Protect = ({children}) => {
    const {user} = useAuth();

    return user ? children : <Navigate to={"/login"} />
};

export default Protect;