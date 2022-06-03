import React from "react";
// Styles
import {
    Wrapper,
    FormContainer,
    FormTitle,
    InputContainer,
    InputName,
    InputFieldRow,
    InputIcon,
    BottomForm,
    SubmitButton,
    ValidationException
} from "./Login.styles";
// Images
import emailImg from "../../../image/emailGrey.svg";
import passwordImg from "../../../image/lockGrey.svg";
// Redux
import { initUser, login, clearValidation } from "../../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
// Routing
import { useNavigate } from "react-router-dom";
// Formik
import {Field, Form, Formik} from "formik";
// Components
import Spinner from "../../util/spiner/Spinner";
import Background from "../../custom/background/Background"

let Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { validation, error, isLoadingLogin, user } = useSelector(state => state.user);

    if (Object.getOwnPropertyNames(user).length !== 0) {
        navigate("/chat");
    }

    return (
        <Wrapper>
            <FormContainer>
                <FormTitle>
                    Login
                </FormTitle>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={
                        async (values) => {
                            let userCreate = {
                                email: values.email,
                                password: values.password
                            };

                            await dispatch(login(userCreate))
                                .then(() => {
                                    if (validation === '') {
                                        dispatch(initUser());
                                        clearValidation();
                                    }
                                });
                        }}
                >
                    <Form>
                        <InputContainer>
                            <InputName htmlFor="email"> Email </InputName>
                            <InputFieldRow>
                                <InputIcon src={emailImg}/>
                                <Field id="email" name="email" placeholder="Input your email..." />
                            </InputFieldRow>
                        </InputContainer>
                        <InputContainer>
                            <InputName htmlFor="password"> Password </InputName>
                            <InputFieldRow>
                                <InputIcon src={passwordImg}/>
                                <Field type="password" id="password" name="password" placeholder="Input your password..."/>
                            </InputFieldRow>
                        </InputContainer>
                        <BottomForm>
                            { validation && <ValidationException>{validation}</ValidationException> }
                            <SubmitButton type="submit">Submit</SubmitButton>
                        </BottomForm>
                        { isLoadingLogin && <Spinner/> }
                    </Form>
                </Formik>
            </FormContainer>
            <Background />
        </Wrapper>
    )
};

export default Login;