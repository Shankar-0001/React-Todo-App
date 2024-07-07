import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin() {

    const [cookie, setcookie, removecookie] = useCookies('userid')
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        onSubmit: (formdata) => {
            axios.get('http://127.0.0.1:3300/get-users')
                .then((response) => {
                    var user = response.data.find(user => user.UserId === formdata.UserName);
                    if (user && user.Password === formdata.Password) {
                        setcookie('userid', formdata.UserName);
                        navigate('/dashboard')
                    } else {
                        navigate("/error")
                    }
                })
        }
    })

    return (
        <div className="d-flex justify-content-center align-items-center">
                <div className="p-4 rounded mt-5 " id="Login">
                    <form onSubmit={formik.handleSubmit} className="form-control">
                    <h3 className="text-center fw-bold fs-2"> <span className="bi bi-person-fill"></span> Login User</h3>
                        <dl>
                            <dt className="mt-4">User Id</dt>
                            <dd> <input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /> </dd>
                            <dt className="mt-2">Password</dt>
                            <dd> <input type="password" name="Password" className="form-control" onChange={formik.handleChange} /> </dd>
                        </dl>
                        <button className="btn btn-dark w-100 mt-2 form-control" type="submit">Login</button>
                        <div className="text-center"> <Link to="/register" className="btn btn-outline-dark mt-2 w-100">New User Register</Link></div>
                    </form>
                </div>

        </div>
    )
}