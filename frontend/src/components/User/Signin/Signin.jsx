import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";
import {signinUser} from "components/User/UserSlice";
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

const FormContainer = styled.div`
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
        :focus {
            outline: 2px solid cornflowerblue;;
            border: none;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
`;

const SubmitButton = styled.div`
    background-color: cornflowerblue;;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherit;
    font-size: inherit;
    :focus {
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
    margin-bottom: 10px;
`

const Signin = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const userState = useSelector((state) => state.user)
    const { error } = userState.signinState;
    const { loggedInUser } = userState;

    const handleUserInfoChange = (e) => {
        const {id, value} = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    };

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(signinUser(userInfo));
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser) {
            navigate("/habits")
        }
    }, [navigate, loggedInUser]);

    return (
        <PageContainer>
            <PageTitle to="/">Evolve</PageTitle>
            <RegisterContainer>
                <FormTitle>Sign-In</FormTitle>
                <FormContainer>
                    <InputSection>
                        <label htmlFor="email">Email</label>
                        {error && Array.isArray(error.detail) && (
                          error.detail.filter(item => item.loc[1] === "email")
                            .map(item => item.msg) // Assuming 'msg' contains the error message
                            .join(', ') // Join messages with a comma and a space
                        ) && (
                          <ErrorSection>
                            Incorrect email: {error.detail.filter(item => item.loc[1] === "email")
                              .map(item => item.msg)
                              .join(', ')}
                          </ErrorSection>
                        )}
                        <input type={"email"} id={"email"} placeholder={"Email"}
                               onChange={handleUserInfoChange} maxLength={100}/>
                    </InputSection>
                    <InputSection>
                        <label htmlFor="password">Password</label>
                        {error && Array.isArray(error.detail) && (
                          error.detail.filter(item => item.loc[1] === "password")
                            .map(item => item.msg) // Assuming 'msg' contains the error message
                            .join(', ') // Join messages with a comma and a space
                        ) && (
                          <ErrorSection>
                            Incorrect password: {error.detail.filter(item => item.loc[1] === "password")
                              .map(item => item.msg)
                              .join(', ')}
                          </ErrorSection>
                        )}
                        <input type={"password"} id={"password"} placeholder={"Password"}
                               onChange={handleUserInfoChange} maxLength={128}/>
                    </InputSection>
                    {error && !Array.isArray(error.detail) && <ErrorSection>{error.detail}</ErrorSection>}
                    <ButtonContainer>
                        <SubmitButton type={"submit"} onClick={handleSubmit}>
                            Sign In
                        </SubmitButton>
                    </ButtonContainer>
                </FormContainer>
                <div>Don't have an account? <StyledLink to={'/register'}>Register Here</StyledLink></div>
            </RegisterContainer>
        </PageContainer>
    );
};

export default Signin;