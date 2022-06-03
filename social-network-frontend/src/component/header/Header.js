import React from 'react';
// redux
import {useDispatch, useSelector} from "react-redux";
// Routing
import { Link } from 'react-router-dom';
// Images
import logo from '../../image/logo.svg';
// Styles
import { Wrapper, Content, LeftContent, RightContent, LogoImg, Item } from "./Header.styles";
import {logout} from "../../redux/slice/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.user.jwtToken);

    const doLogout = () => {
        dispatch(logout());
    }

    return (
        <Wrapper>
            <Content>
                <LeftContent>
                    <Link to='/'>
                        <LogoImg src={logo} alt='main-logo'></LogoImg>
                    </Link>
                    <Item isLink={true}>
                        <Link to='/'>
                            Main page
                        </Link>
                    </Item>
                    <Item>|</Item>
                    <Item isLink={true}>
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </Item>
                    <Item>|</Item>
                    <Item isLink={true}>
                        <Link to='/chat'>
                            Chat
                        </Link>
                    </Item>
                </LeftContent>
                <RightContent>
                    {
                        jwtToken
                        ? <Item isLink={true} onClick={doLogout}>
                                <Link to='/'>
                                    Logout
                                </Link>
                            </Item>
                        : <Item isLink={true}>
                            <Link to='/login'>
                                Login
                            </Link>
                        </Item>
                    }
                </RightContent>
            </Content>
        </Wrapper>
    )
};

export default Header;