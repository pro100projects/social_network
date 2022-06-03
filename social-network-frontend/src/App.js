import React, {useEffect, useState} from 'react';
// Redux
import { Provider } from "react-redux";
import store from './redux/store';
// Routing
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// Styles
import { GlobalStyle } from './GlobalStyle';
import { Content, Wrapper } from "./App.styles";
// Components
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Chats from "./component/chats/Chats";
import Login from "./component/auth/login/Login";
import Profile from "./component/profile/Profile";

function App() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Wrapper>
                        <Header />
                        <Content>
                            <Routes>
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/chat/*' element={<Chats />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/' element={<Profile />} />
                            </Routes>
                        </Content>
                        <Footer />
                    </Wrapper>
                </Router>
            </Provider>
            <GlobalStyle />
        </>
    );
}

export default App;
