import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }

        // eslint-disable-next-line
    }, [])

    const HandleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        // API CALL
        const response = await fetch(`https://cloudpenbackend.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });

        const data = await response.json();
        console.log(data.authtoken);

        if (data.success) {
            localStorage.setItem("token", data.authtoken);
            props.showAlert('success', 'Logged in successfully')
            navigate("/");

        }
        else {
            props.showAlert('danger', 'Email and password do not match')
        }


    }
    return (
        <>
            <div className="d-flex justify-content-center my-5 border border-dark rounded bg-body-tertiary">
                <form className='my-5 mx-5 col-md-5' onSubmit={handlesubmit}>

                    <div className="form-outline mb-4 text-center"><h2>Welcome</h2></div>


                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Your Email</label>
                        <input type="email" id="email" name='email' required onChange={HandleChange} className="form-control form-control-lg" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' required minLength={8} onChange={HandleChange} className="form-control form-control-lg" />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit"
                            className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Login</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup"
                        className="fw-bold text-body"><u>Register here</u></Link></p>

                </form>
            </div>





        </>
    )
}

export default Login