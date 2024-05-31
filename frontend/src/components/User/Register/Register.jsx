import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {registerUser} from "components/User/UserSlice";
import {useDispatch, useSelector} from "react-redux";


const PageContainer = styled.div`
    padding-top: 10px;
`;

const PageTitle = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: #3D5A80;
    font-size: 30px;
    padding-bottom: 10px;
    padding-top: 25px;
    padding-left: 50px;
    font-family: "Silkscreen", sans-serif;
    font-weight: 400;
    font-style: normal;
`;

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
`;

const FormContainer = styled.form`
    justify-content: flex-start;
    width: 14%;
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3;
        &:focus {
            outline: 1px solid cornflowerblue;
            border: 2px solid cornflowerblue;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
`;

const SubmitButton = styled.button`
    background-color: cornflowerblue;;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherit;
    font-size: inherit;
    &:focus {
        outline: none;
        border: none;
    }
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: cornflowerblue;;
    font-weight: bold;
`

const ErrorSection = styled.div`
    color: red;
    font-size: 12px;
`

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const userState = useSelector(state => state.user)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const {error} = userState.registerState
    const {loggedInUser} = userState


    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confPassRef = useRef(null);

    const handleUserInfoChange = (e) => {
        const { id, value } = e.target
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const dispatch = useDispatch();

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef.current) {
                nextRef.current.focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInfo.password !== userInfo.passwordConfirm) {
            setPasswordMatch(true)
        }
        dispatch(registerUser(userInfo));
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            navigate('/habits')
        }
    }, [navigate, loggedInUser])

    return (
        <PageContainer>
            <PageTitle to="/">Evolve</PageTitle>
            <RegisterContainer>
                <FormTitle>Register</FormTitle>
                <FormContainer>
                    <InputSection>
                        <label htmlFor="firstName">First Name</label>
                        {error && error.detail && error.detail.find(err => err.loc[1] === "firstName") && (
                            <ErrorSection>{error.detail.find(err => err.loc[1] === "firstName").msg}</ErrorSection>) }
                        <input type={"text"} id={"firstName"} placeholder={"First Name"}
                               onChange={handleUserInfoChange} maxLength={100} onKeyDown={(e) => handleKeyDown(e, lastNameRef)}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="lastName">Last Name</label>
                        {error && error.detail && error.detail.find(err => err.loc[1] === "lastName") && (
                            <ErrorSection>{error.detail.find(err => err.loc[1] === "lastName").msg}</ErrorSection>) }
                        <input type={"text"} ref={lastNameRef} id={"lastName"} placeholder={"Last Name"}
                               onChange={handleUserInfoChange} maxLength={100} onKeyDown={(e) => handleKeyDown(e, emailRef)}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="email">Email</label>
                        {error && error.detail && error.detail.find(err => err.loc[1] === "email") && (
                            <ErrorSection>{error.detail.find(err => err.loc[1] === "email").msg}</ErrorSection>) }
                        <input type={"text"} ref={emailRef} id={"email"} placeholder={"Email"}
                               onChange={handleUserInfoChange} maxLength={100} onKeyDown={(e) => handleKeyDown(e, passwordRef)}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="password">Password</label>
                        {error && error.detail && error.detail.find(err => err.loc[1] === "password") && (
                            <ErrorSection>{error.detail.find(err => err.loc[1] === "password").msg}</ErrorSection>) }
                        <input type={"password"} ref={passwordRef} id={"password"} placeholder={"Password"}
                               onChange={handleUserInfoChange} maxLength={128} onKeyDown={(e) => handleKeyDown(e, confPassRef)}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        {passwordMatch && (
                            <ErrorSection>Passwords do not match!</ErrorSection>) }
                        <input type={"password"} ref={confPassRef} id={"passwordConfirm"}
                               onChange={handleUserInfoChange} placeholder={"Confirm Password"} maxLength={128}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type={"submit"} onClick={handleSubmit}>
                            Register
                        </SubmitButton>
                    </ButtonContainer>
                </FormContainer>
                <div>Already have an account? <StyledLink to={'/signin'}>Login Here</StyledLink></div>
            </RegisterContainer>
        </PageContainer>
    );
};

export default Register;