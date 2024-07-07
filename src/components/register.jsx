import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";


export function UserRegister() {

    let navigate = useNavigate();
    const [error, setError] = useState('');
    const [usererror, setUserError] = useState('');
    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        }, onSubmit: (user => {
            axios.post(`http://127.0.0.1:3300/register-user`, user)
                .then(() => {

                    swal({
                        title: "Registered Successfully!",

                        icon: "success",
                    });
                    navigate('/login')
                })
        })
    })

    function VerifyUserId(e) {
        axios.get(`http://127.0.0.1:3300/get-users`)
            .then(response => {
                for (var user of response.data) {
                    if (user.UserId === e.target.value) {
                        setError('UserId taken - Try Another');
                        setUserError('text-danger')
                        break;
                    } else {
                        setError('Available')
                        setUserError('text-success')
                    }
                }
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="p-4 rounded mt-5" id="Login">
                <form onSubmit={formik.handleSubmit} className="form-control">
                <h3 className="text-center fw-bold fs-2"> <span className="bi bi-person-fill"></span> Register User</h3>
                    <dl>
                        <dt> User Id </dt>
                        <dd> <input type="text" name="UserId" className="form-control" onChange={formik.handleChange} onKeyUp={VerifyUserId} /> </dd>
                        <dd className={usererror} style={{ textAlign: "end" }}> {error} </dd>

                        <dt> UserName </dt>
                        <dd> <input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /> </dd>

                        <dt> Password </dt>
                        <dd> <input type="password" name="Password" className="form-control" onChange={formik.handleChange} /> </dd>

                        <dt> Email </dt>
                        <dd> <input type="email" name="Email" className="form-control" onChange={formik.handleChange} /> </dd>

                        <dt> Mobile </dt>
                        <dd> <input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /> </dd>
                    </dl>
                    <button className="btn btn-dark w-100 mt-2" type="submit">Register</button>
                    <div className="text-center"> <Link to="/login" className="btn btn-outline-dark mt-2 w-100">Existing User Login</Link></div>
                </form>
            </div>
        </div>
    )
}