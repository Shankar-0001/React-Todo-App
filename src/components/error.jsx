import { Link } from "react-router-dom";

export function UserError() {
    return (
        <div className="text-end">
            <h1>Error User</h1>
            <Link to='/login' className="btn btn-link">Try Again</Link>
        </div>
    )
}