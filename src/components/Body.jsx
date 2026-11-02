import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        }
        catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet />
            {/* Any children routers of body will render here */}
            <Footer />
        </div>
    )
}

export default Body
