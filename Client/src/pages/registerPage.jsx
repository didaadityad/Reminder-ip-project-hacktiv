import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios"
import { useState } from "react";

export default function Register (){
    const nav = useNavigate()
    const [user, setUser] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: "POST",
                url:"/register",
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                },
                data: user
            })

            nav('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Add User</h2>
                <p className="text-center mb-4">Registration form</p>
                <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                        <input 
                            type="text" 
                            onChange={handleChange} 
                            placeholder="Name" 
                            className="form-control" 
                            name='name'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            onChange={handleChange} 
                            placeholder="Email" 
                            className="form-control" 
                            name='email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            onChange={handleChange} 
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name='password'
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button id="sign-btn" type='submit' className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className="text-center mt-3"> Already have an account ? Back to <Link to={"/login"}>Login</Link></p>
            </div>
        </div>
    </div>
    )
}