import { Link, useNavigate } from "react-router-dom"
export default function NavBar(){
const nav = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        try {
            localStorage.removeItem('access_token')
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            
            <Link to={"/reminders"} className="navbar-brand" href="#">
                REMIMED
            </Link>
            
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon">
                    
                </span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Link to={"/login"}  className="btn btn-primary ms-auto" onClick={logout} type="button">
                    Logout
                </Link>
            </div>
            
        </div>
    </nav>
    )
}