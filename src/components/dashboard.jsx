import axios from "axios";
import { Button } from "bootstrap";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie"
import { Link, Navigate, useNavigate } from "react-router-dom";

export function UserDashboard() {

    let navigate = useNavigate();
    const [cookie, setcookie, removecookie] = useCookies('userid');
    const [appointments, setAppointments] = useState([{ Appointment_Id: '', Title: '', Description: '', Date: Date(), UserId: '' }]);
    const [editAppointment, setEditAppointment] = useState([{ Appointment_Id: '', Title: '', Description: '', Date: Date(), UserId: '' }]);

    const formik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: '',
            Description: '',
            Date: '',
            UserId: cookie['userid']
        }, onSubmit: appointments => {
            axios.post(`http://127.0.0.1:3300/add-task`, appointments)
                .then(() => {
                    alert('Task added succesfully')
                    window.location.reload();
                })
        }
    })

    const Editformik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: '',
            Description: '',
            Date: '',
            UserId: cookie['userid']
        }, onSubmit: (appointment) => {
            axios.put(`http://127.0.0.1:3300/edit-task/${appointment.Appointment_Id}`, appointment)
                .then(() => {
                    alert('Task Updated');
                    window.location.reload();
                })
        },
        enableReinitialize: true
    });

    function handleEditClick(id) {
        axios.get(`http://127.0.0.1:3300/appointments/${id}`)
            .then(response => {
                setEditAppointment([response.data]);
            })
    }

    function handleDeleteClick(id) {
        axios.delete(`http://127.0.0.1:3300/remove-task/${id}`)
            .then(() => {
                alert('Task deleted');
            });
        window.location.reload();
    }

    function LoadAppointments() {
        axios.get(`http://127.0.0.1:3300/get-appointments/${cookie['userid']}`)
            .then(response => {
                setAppointments(response.data)
            })
    }

    function handleSignoutClick() {
        removecookie('userid');
        navigate('/')
    }

    useEffect(() => {
        LoadAppointments();
    }, [])

    return (
        <div className="row me-5 container">
            <div className="col-7">
                <Link className='d-flex justify-content-center   mt-5' data-bs-target='#Addtask' data-bs-toggle='modal'>
                    <img src="clipboard.png" alt="" height='100px' width='100px' />
                </Link>
                <div>
                    <div className="modal fade" id="Addtask">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="bi bi-pen"> Add New Appointments</h2>
                                    <button className="btn btn-close" data-bs-dismiss="modal" ></button>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="modal-body">
                                        <dl>
                                            <dt> Appointment_Id </dt>
                                            <dd> <input type="number" name="Appointment_Id" id="" className="form-control" onChange={formik.handleChange} /> </dd>

                                            <dt> Title </dt>
                                            <dd> <input type="text" name="Title" id="" className="form-control" onChange={formik.handleChange} /> </dd>

                                            <dt> Description </dt>
                                            <dd> <textarea name="Description" id="" cols="30" rows="5" className="form-control" onChange={formik.handleChange} ></textarea> </dd>

                                            <dt> Date </dt>
                                            <dd> <input type="datetime-local" name="Date" id="" className="form-control" onChange={formik.handleChange} /> </dd>
                                        </dl>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark bi bi-floppy" data-bs-dismiss='modal'> save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="EditTask">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="bi bi-pencil-square"> Edit Appointment </h2>
                                <button className="btn btn-close" data-bs-dismiss='modal'></button>

                            </div>
                            <div className="modal-body">
                                <dl>
                                    <dt> UserId </dt>
                                    <dd> <input type="text" disabled name="UserId" value={editAppointment[0].UserId} onChange={Editformik.handleChange} className="form-control" /> </dd>

                                    <dt> Appointment_Id </dt>
                                    <dd> <input type="number" name="Appointment_Id" value={editAppointment[0].Appointment_Id} onChange={Editformik.handleChange} className="form-control" /> </dd>

                                    <dt> Title </dt>
                                    <dd> <input type="text" name="Title" value={editAppointment[0].Title} onChange={Editformik.handleChange} className="form-control" /> </dd>

                                    <dt> Description </dt>
                                    <dd> <textarea name="Description" cols="30" rows="5" value={editAppointment[0].Description} onChange={Editformik.handleChange} className="form-control"></textarea> </dd>

                                    <dt> Date </dt>
                                    <dd> <input type="datetime-local" name="Date" value={editAppointment[0].Date} onChange={Editformik.handleChange} className="form-control" /> </dd>

                                </dl>

                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-dark bi bi-floppy" data-bs-dismiss='modal'> Update</button>

                            </div>

                        </div>

                    </div>

                </div>


            </div>


            <div className="col-5 mt-4">
                <div className="d-flex justify-content-between">
                    <div className='h3 bi bi-person-fill text-end'>&nbsp;{cookie['userid']}- Dashboard </div>
                    <div>
                        <span> <button className="bi bi-calendar-heart-fill btn btn-light" data-bs-target='#Addtask' data-bs-toggle='modal'> Add Tasks</button> </span>
                        <span> <button className="btn btn-dark" onClick={handleSignoutClick}>Logout</button> </span>
                    </div>
                </div>
                <div className="mt-2 w-100">
                    {
                        appointments.map(appointment =>
                            <div key={appointment.Appointment_Id} className="alert alert-dismissible" id='alert'>
                                <button className="btn btn-close" data-bs-dismiss='alert' onClick={() => { handleDeleteClick(appointment.Appointment_Id) }}></button>
                                <div className="d-flex justify-content-between">
                                    <div className="h3 alert-title"> {appointment.Title} </div>
                                    <div className="text-end"> <button className="btn btn-outline-dark bi bi-pen-fill" data-bs-target='#EditTask' data-bs-toggle='modal' onClick={() => { handleEditClick(appointment.Appointment_Id) }} > Edit</button> </div>
                                </div>
                                <p className="alert-text"> {appointment.Description} </p>
                                <p> {appointment.Date} </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
