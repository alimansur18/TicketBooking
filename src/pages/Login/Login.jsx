import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Index.css'

const Login = () => {

    const [requestResponse, setRequestResponse] = useState({
        requestMessage: "",
        className: ""
    })

    const navigate = useNavigate();

    const initialState = {
        username: "",
        password: ""
    };

    const validationSchema = (values) => Yup.object({
        username: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const onSubmit = (values) => {
        axios
            .post('http://127.0.0.1:8000/api/user/login/', values)
            .then((response) => { 
                console.log(response.data);
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("user", response.data.user);
                setRequestResponse({
                    requestMessage: "Login successful",
                    className: "alert alert-success"
                }); 
                navigate('/');
            },
                (error) => { 
                    console.log(error.response.data.message);
                    setRequestResponse({
                        requestMessage: error.response.data.message,
                        className: "alert alert-danger"
                    }) 
                })
            .catch(error => console.log(error));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className='customWrapper'>
                        <h2>Login</h2>
                        <hr />
                        <Formik
                            initialValues={initialState}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnMount
                        >

                            {(formik) => {
                                return (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="">Username</label>
                                            <Field type="text" name="username" className="form-control" />
                                            <ErrorMessage name="username">
                                                {(errorMessage) => (
                                                    <small className="text-danger">{errorMessage}</small>
                                                )}
                                            </ErrorMessage>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Password</label>
                                            <Field type="password" name="password" className="form-control" />
                                            <ErrorMessage name="password">
                                                {(errorMessage) => (
                                                    <small className="text-danger">{errorMessage}</small>
                                                )}
                                            </ErrorMessage>
                                        </div>
                                        <input type="submit" value='Login' className="btn btn-primary btn-block" />
                                    </Form>
                                )
                            }}
                        </Formik>
                        <br />
                        <p className="text-center">
                            New User <Link to="/signup">Click Here</Link>
                        </p>
                        <div className={requestResponse.className}>
                            {requestResponse.requestMessage}
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default Login;