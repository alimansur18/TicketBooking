import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Index.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate();

    const [requestResponse, setRequestResponse] = useState({
        textMessage: '',
        alertClass: ''
    })

    const initialValues = {
        name: '',
        email: '',
        username : '',
        password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
            username : Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    })
    const onSubmit = (values) => {
        axios.post('http://127.0.0.1:8000/api/user/signup/', values)
            .then((response) => {
                setRequestResponse({
                    textMessage: response.data.message,
                    alertClass: 'alert alert-success'
                })
                navigate('/login');
            },
                (error) => {
                    setRequestResponse({
                        textMessage: error.response.data.message,
                        alertClass: 'alert alert-danger'
                    })
                })
            .catch((error) => console.log(error))
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnMount: true,
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className='customWrapper'>
                        <div class={requestResponse.alertClass} role="alert">
                            {requestResponse.textMessage}
                        </div>
                        <h2>Register</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor='name'>First Name</label>
                                <input type="text"
                                    className={formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"}
                                    name='name'
                                    id='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.name && formik.touched.name ? (
                                    <small className='text-danger'>{formik.errors.name}</small>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor='email'>Email</label>
                                <input type="text"
                                    className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                                    name='email'
                                    id='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <small className='text-danger'>{formik.errors.email}</small>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor='email'>Username</label>
                                <input type="text"
                                    className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                    name='username'
                                    id='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.username && formik.touched.username ? (
                                    <small className='text-danger'>{formik.errors.username}</small>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor='password'>Password</label>
                                <input type="text"
                                    className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <small className='text-danger'>{formik.errors.password}</small>
                                ) : null}
                            </div>

                            <input type="submit" value='Register' disabled={!formik.isValid} className="btn btn-primary btn-block" />

                        </form>
                        <br />
                        <p className="text-center">
                            Already Registered? <Link to={'/login'}>Click Here</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default SignUp