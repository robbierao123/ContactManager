
import './App.css';
import React, {Fragment, useState,useEffect} from 'react';
import Navbar from './component/layout/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './component/layout/Home'
import About from './component/layout/About'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/authState'
import Register from './component/auth/Register'
import Login from './component/auth/Login'
import AlertState from './context/alert/alertState'
import Alerts from './component/layout/Alerts'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './component/routing/PrivateRoute'
import styled from "styled-components";

import { ThemeProvider } from "styled-components";

const LightTheme = {
  pageBackground: "white",
  titleColor: "black",
  tagLineColor: "black"
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: " #FFCC33",
  tagLineColor: "lavender"
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

const Page = styled.div`

  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.pageBackground};
  transition: all .5s ease;
`;


if(localStorage.token){
  setAuthToken(localStorage.token);
  
}
const App = () => {
  const [theme, setTheme] = useState("light")


  return (

    <AuthState>
    <ContactState>
  <AlertState>
    <Router>
    <Fragment>
     

<ThemeProvider theme={themes[theme]}>
<Page>
<Navbar theme={theme} setTheme={setTheme}/>
       <div className='container'>
       <Alerts />
       <Switch>
         <PrivateRoute exact path='/' component={Home} theme={theme}/>
         <Route exact path='/about' component={About}/>
         <Route exact path='/register' component={Register}/>
         <Route exact path='/login' component={Login}/>
       </Switch>
  

       </div>
       </Page>
</ThemeProvider>
    </Fragment>
    
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
  
}

export default App;
