import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    const getData = async () => {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        if (!parsedUser) {
            navigate("/Login");
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        children
    );
};

export default ProtectedRoute