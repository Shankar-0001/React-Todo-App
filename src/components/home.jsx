import { Link } from "react-router-dom"
export function ToDoHome() {
    return (
        <div className="todo-background">
            <h1 className='text-start me-5'>To-Do Appointments</h1>
            <div>
                <div className="d-flex">
                    <div className="card me-3">
                        <div className="card-header">
                            <div className="card-body">
                                <Link to='/register'>
                                    <img src="add-user2.png" className="img-fluid" alt="image path is not appearing" height='100px' width='100px' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/register' className="btn btn-light w-100">REGISTER</Link>
                        </div>

                    </div>

                    <div className="card me-3">
                        <div className="card-header">
                            <div className="card-body">
                                <Link to='/login'>
                                    <img src="user2.png" className="img-fluid" alt="image path is not appearing" height='100px' width='100px' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/login' className="btn btn-light w-100">LOGIN</Link>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}