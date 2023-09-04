import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ fname: "",lname: "", email: "", password: "", cpassword: "", phone:"", address:"", dob:"",occupation:"student"})
  const { fname,lname , email, password, cpassword, phone, address, dob, occupation} = credentials
  
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [])





  const HandleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
   // console.log(credentials)
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(phone.length>10 || phone.length<10){
     props.showAlert('danger', 'Invalid phone number');
     return 
    }

    if (password === cpassword) {
      // API CALL
      const response = await fetch(`https://cloudpenbackend.onrender.com/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fname,lname , email, password, phone, address, dob, occupation }) // body data type must match "Content-Type" header
      });

      const data = await response.json();


      if (data.success) {
        // localStorage.setItem("token", data.authtoken);
      props.showAlert('success', `Now you can login: ${data.user.fname} ${data.user.lname}`);
        navigate("/login");
      }
      else {
        props.showAlert('danger', data.error);
      }
    } else {
      props.showAlert('danger', 'Passwords do not match');
      
    }




  }

  return (
    <>

      <div className="d-flex justify-content-center my-5 border border-dark rounded bg-body-tertiary">

        <form className='my-5 mx-5 col-md-6' onSubmit={handlesubmit}>

          <div className="form-outline mb-4 text-center"><h2>Create an acoount</h2></div>

          <div className="row">
            <div className="form-outline mb-4 col-md-12 col-lg-6">
              <label className="form-label" htmlFor="fname">First Name</label>
              <input type="text" id="fname" name='fname' required onChange={HandleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-outline mb-4 col-md-12 col-lg-6">
              <label className="form-label" htmlFor="lname">Last Name</label>
              <input type="text" id="lname" name='lname' required onChange={HandleChange} className="form-control form-control-lg" />
            </div>
          </div>
          <div className="row">
            <div className="form-outline mb-4 col-md-12 col-lg-6">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="text" id="email" name='email' required onChange={HandleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-outline mb-4 col-sm col">
              <label className="form-label" htmlFor="phone">Phone(+91)</label>
              <input type="number" id="phone" name='phone' required onChange={HandleChange} className="form-control form-control-lg" />
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="address">Address</label>
            <input type="text" id="address" name='address' required onChange={HandleChange} className="form-control form-control-lg" />
          </div>

          <div className="row">
            <div className="form-outline mb-4 col-sm col">
              <label className="form-label" htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name='dob' required onChange={HandleChange} className="form-control form-control-lg" />
            </div>


            <div className="form-outline  mb-4 col-md-12 col-lg-6">
              <label className="form-label" htmlFor="occupation">Occupation</label>
              <select id='occupation' name='occupation' value={occupation} onChange={HandleChange} className="form-select form-select-lg" aria-label="Large select example">
                <option disabled={true}>Select</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemplyed</option>
              </select>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" name='password' required minLength={8} onChange={HandleChange} className="form-control form-control-lg" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="cpassword">Confirm password</label>
            <input type="password" id="cpassword" name='cpassword' required minLength={8} onChange={HandleChange} className="form-control form-control-lg" />
          </div>

          <div className="form-check d-flex justify-content-center mb-5">
            <input className="form-check-input me-2" type="checkbox" name="tos" required value="" id="tos" />
            <label className="form-check-label" htmlFor="tos">
              I agree all statements in <Link to='/tos' className="text-body"><u>Terms of service</u></Link>
            </label>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit"
              className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Register</button>
          </div>

          <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
            className="fw-bold text-body"><u>Login here</u></Link></p>

        </form>
      </div>

    </>
  )
}

export default Signup