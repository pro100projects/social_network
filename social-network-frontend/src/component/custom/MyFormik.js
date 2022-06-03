import React, {useEffect, useState} from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { findChat } from "../../redux/slice/chatSlice";
import { setLogin } from "../../redux/slice/userSlice";
// Form
import { Formik, Form, Field } from 'formik';
// Components
import Spinner from "../util/spiner/Spinner";

const MyFormik = () => {
    const dispatch = useDispatch();
    const { error, isLoadingChat } = useSelector(state => state.chat);
    return (
        <>
            <div style={{background: "blue", padding: "20px"}}>
                <Formik
                    initialValues={{
                        jwtToken: '',
                        userId: '',
                    }}
                    onSubmit={
                        async (values) => {
                            dispatch(setLogin({
                                jwtToken: values.jwtToken,
                                userId: values.userId
                            }))
                            await dispatch(findChat());
                    }}
                >
                    <Form>
                        <label htmlFor="jwtToken"> Jwt token</label><br/>
                        <Field id="jwtToken" name="jwtToken" /><br/>

                        <label htmlFor="userId"> User id </label><br/>
                        <Field id="userId" name="userId"  /><br/>

                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                { isLoadingChat && <Spinner /> }
                { error && <div> error {error}</div> }
            </div>
        </>

    );
};

export default MyFormik;
