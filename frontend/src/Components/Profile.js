import React, {useEffect,useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';
import Social from './Social';


const Profile = () => {
  const context = useContext(NoteContext);
  const {user,fetchUser}= context
  const {fname,lname,email,dob,phone,address,occupation,website,facebook,twitter,github,insta} = user
  const navigate = useNavigate();
  
 
  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate("/login");
    }else{
      fetchUser();
    }

    // eslint-disable-next-line
  }, [])

 //const authToken=localStorage.getItem('token');
  
 var date = new Date(dob);
  
 
  return (
    <>
    <div className="container mb-5">

   
    <section style={{backgroundColor:" #eee"}}>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
           
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid" style={{width: "150px"}}/>
            <h5 className="my-3">{fname}</h5>
            <p className="text-muted mb-1">{occupation}</p>
            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
           
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body p-0">
            <ul className="list-group list-group-flush rounded-3">

              <Social icon={"globe"} name={"website"} social={website} color={"#e6e619"}/>
              <Social icon={"github"} name={"github"} social={github} color={"#333333"}/>
              <Social icon={"twitter"} name={"twitter"} social={twitter} color={"#55acee"}/>
              <Social icon={"instagram"} name={"insta"} social={insta} color={"#ac2bac"}/>
              <Social icon={"facebook-f"} name={"facebook"} social={facebook} color={"#3b5998"}/>
              
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{fname} {lname}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{email}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">(+91) {phone}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Date of Birth</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              
               
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                <div className="progress rounded" style={{height: "5px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    </>
  )
}

export default Profile