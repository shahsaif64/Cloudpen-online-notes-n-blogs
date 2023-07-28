import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import dev from '../media/dev.png';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const HandleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        // API CALL
        const response = await fetch(`http://localhost:4500/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
            localStorage.setItem("token", data.authtoken);
            props.showAlert('success','Logged in successfully')
            navigate("/");
            
        }
        else {
            props.showAlert('danger','Email and password do not match')
        }


    }
    return (
        <>
            <div className="container d-flex justify-content-between">
                <div className="d-flex mt-0  col-md-5 justify-content-center">
                    
                    <img className='devpng' src={dev} alt="" />
                    
                </div>


                <div className="d-flex formdiv col-md-4 justify-content-center align-self-center my-5 border border-dark rounded bg-body-tertiary">

                    <form className='my-5 col-md-10 align-self-center' onSubmit={handlesubmit}>

                        <div className="form-outline mb-4 text-center"><h2>SignIN</h2></div>


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

            </div>



        </>
    )
}

export default Login