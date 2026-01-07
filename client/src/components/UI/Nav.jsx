import { Link } from "react-router";
import {useAuth} from "../../context/auth.context.jsx";

const Nav = () => {
    const {user, logout} = useAuth();


    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    {
                        user ? (
                            <>
                                <li>
                                    <Link to="/panel">
                                        Panel
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" onClick={logout}>
                                        Log out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                    Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Nav;