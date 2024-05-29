import React, {useEffect} from 'react'
import styled from 'styled-components'
import MyHabitsDesktop from './MyHabitsDesktop';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";



const DesktopContainer = styled.div`
    @media only screen and (max-width: 699px){
        display: none;
    }
`

const MobileContainer = styled.div`
    @media only screen and (min-width: 700px){
        display: none;
    }
`

const MyHabits = () => {
    const userState = useSelector(state => state.user)
    const {loggedInUser} = userState

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin')
        }
    }, [navigate, loggedInUser])

    return (
        <>

            <DesktopContainer><MyHabitsDesktop /></DesktopContainer>
            <MobileContainer>Mobile</MobileContainer>

        </>
    );
}

export default MyHabits;