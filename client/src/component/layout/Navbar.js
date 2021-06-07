import React, { useState, useContext, useEffect, Fragment }  from 'react'
import PropTypes  from 'prop-types';
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

import Splash from '../Theme/SplashScreen';


export const Navbar = ({title, icon, theme, setTheme}) => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext)

    const {clearContacts} = contactContext;
    const {isAuthenticated, logout, user} = authContext
    const onLogout = ()=>{
        logout();
        clearContacts();
    }
    const authLinks = (
        <Fragment>
            <li> Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>

    )

    const guestLinks = (
        <Fragment>
            <li> Hello {user && user.name}</li>
            <li>
               <Link to ='./register'> Register</Link>
            </li>
            <li>
               <Link to ='./login'> Login</Link>
            </li>
        </Fragment>

    )

    const [nightmode, setNightMode] = useState(false);

    return (
        <div className="navbar bg-primary">
        <h1>
        
            <i className={icon}> {`    ${title}`} </i>
            
        </h1>
        
        
        <ul>
          <li>
          
          {/* <i className="fas fa-toggle-on"></i> */}
          <Splash theme={theme} setTheme={setTheme}/>
          
      <li>
    
      </li>
          </li>
            {isAuthenticated ? authLinks: guestLinks}
        </ul>
            
        </div>
    )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon:PropTypes.string,
}

Navbar.defaultProps = {
    title: ' Contact Manager',
    icon: 'far fa-folder-open'
}

export default Navbar