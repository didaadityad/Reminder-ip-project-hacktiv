import { useEffect, useState } from "react"
import axios from "../utils/axios"
// import toast from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
export default function Login (){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let {data} = await axios({
                method: 'post',
                url: '/login',
                data: {
                    email: email,
                    password: password
                }
            })
            localStorage.setItem("access_token", data.access_token)
            nav('/login')
        } catch (error) {
            console.log(error)
            // toast.error(error.messages[0].error.response)
        }
    }

    async function handleCredentialResponse(response){
        try {
            console.log("Encoded JWT ID token: " + response.credential)
            const googleToken = response.credential
            console.log({googleToken})
            const {data} = await axios({
                method: 'post',
                url: '/googleSignIn',
                data: {googleToken}
            })
            localStorage.setItem("access_token", data.access_token)
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: `972119625034-ik0atq4goh1p2g1o37auivvmrka64fp1.apps.googleusercontent.com`,
            callback: handleCredentialResponse
        })

        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme: "outline", size: "large"}
        )
        window.google.accounts.id.prompt()
    },[])
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <p className="text-center mb-4"></p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(event => setEmail(event.target.value))} 
                            placeholder="Email" 
                            className="form-control" 
                            name='email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            value={password}
                            onChange={(event => setPassword(event.target.value))} 
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name='password'
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button id="sign-btn" type='submit' className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-center mt-3">Don't have account ? <Link to={"/register"}>Register </Link>here</p>
                <hr />
                <div id="buttonDiv"></div>
            </div>
        </div>
    </div>
    )
}