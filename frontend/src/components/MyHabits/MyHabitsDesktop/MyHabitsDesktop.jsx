import React from 'react'
import styled from 'styled-components'
import Goals from 'components/Goals'
import {logoutUser} from "components/User/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import Habits from "../../Habits/Habits";
import {Link} from "react-router-dom";
import SetGeolocation from "../../Weather/SetGeolocation";
import Weather from "../../Weather/Weather";


const GridContainer = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-columns: 25% 1px 75%;
    grid-template-rows: 1fr;
    overflow: hidden;
`;

const NavContainer = styled.div`
    padding-top: 10px;
    padding-left: 30px;
    background-color: #F4F4F4;
    &:after {
        width: 1px;
        height: 1vh;
        background-color: black;
    }
`;

const Delimiter = styled.div`
    background-color: lightgrey; 
    width: 1px; 
    height: 100%; 
`

const MainWrapper = styled.div`
    overflow: none;
`

const MainContainer = styled.div`
    padding-top: 10px;
    padding-right: 50px;
    padding-left: 50px;
    flex-grow: 1;
    overflow-y: auto; 
`;

const DecorContainer = styled.div` 
    height: 100%;
    width: 100%;
    background-image: url("/images/mountainBg.png");
    background-position: center;
    background-size: 180%; 
    background-repeat: no-repeat;
`;

const Title = styled.div`
    font-size: 30px;
    font-family: "Silkscreen", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 200px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const HeaderItem = styled.div`
    margin-right: 25px;
    &:last-child{
        margin-right: 0;
    }
    font-size: 22px;
`;

const SignoutButton = styled.button`
    font-size: 16px;
    padding: 10px 20px !important;
    background-color: lightblue;
    border-radius: 2px;
    cursor: pointer;
    color: #3D5A80;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        color: #e3e3e3;
        background-color: cornflowerblue;;
    }
`;

const MyHabitsDesktop = () => {
    const userState = useSelector((state) => state.user);
    const { loggedInUser } = userState;

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <GridContainer>
            <NavContainer>
                <Title>Evolve</Title>
                <Goals />
            </NavContainer>
            <Delimiter></Delimiter>
            <MainWrapper>
                <MainContainer>
                    <HeaderContainer>
                        <HeaderItem>Hi, {loggedInUser && loggedInUser.firstName}</HeaderItem>
                        <HeaderItem>
                            <Link to={"/"}>
                                <SignoutButton>Home</SignoutButton>
                            </Link>

                        </HeaderItem>
                        <HeaderItem>
                            {loggedInUser && (
                                <SignoutButton onClick={() => handleLogout()}>
                                    Sign-out
                                </SignoutButton>
                            )}
                        </HeaderItem>
                    </HeaderContainer>
                    <SetGeolocation />
                    <Weather />
                    <Habits />
                </MainContainer>
                <DecorContainer />
            </MainWrapper>
        </GridContainer>
    )
}

export default MyHabitsDesktop;