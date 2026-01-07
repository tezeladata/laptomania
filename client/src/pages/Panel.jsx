import {useAuth} from "../context/auth.context.jsx";

const Panel = () => {
    const {user} = useAuth();

    return (
        <main>
            <h1>Panel</h1>

            <p>{user.fullname}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
        </main>
    )
};

export default Panel;