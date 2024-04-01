import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import './Navbar.css'
import SignUpForm from "./Signup.jsx";
import SignInPopup from "./SignIn.jsx";
import { useNavigate } from 'react-router-dom';
import PostAuth from "./PostAuth.jsx";


export default function Navbar() {
    const [auth, setAuth] = React.useState(false);
    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('user'));
        if (sessionData && sessionData.success) {
            setAuth(true);
        }
    }, []);
    const navigate = useNavigate();
    const handleLoginSuccess = () => {
            setAuth(true); // Update auth state when login is successful
    };
    const handleLogout = async () => {
        sessionStorage.clear();
        setAuth(false);
        navigate('/');}
        ;
    return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to="/" style={{ textDecoration: 'none' }}><p>RentAway</p></Link>
        </div>
        <div className="rent">
            <PostAuth onLoginSuccess={handleLoginSuccess} auth={auth}/>
        </div>
        <div className='log-in-out'>
          {!auth && <SignInPopup onLoginSuccess={handleLoginSuccess}/>}
          {!auth && <SignUpForm />}
          {auth && <Link to="/dashboard"><button className="in">Manage your posts</button></Link>  }
          {auth && <button className="up" onClick={handleLogout}>Logout</button>}
        </div>  
    </div>
      )
}