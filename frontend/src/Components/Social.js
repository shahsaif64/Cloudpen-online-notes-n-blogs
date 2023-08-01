import React, {useState,useEffect,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'


const Social = (props) => {
    const{social,icon,color,name}=props
    const context = useContext(NoteContext);
    const {updateUser}= context
   
    const [check, setCheck] = useState(false)
    const [pen, setPen] = useState(true)
    const [input, setInput] = useState(false)
    const [sicon, setSicon] = useState("fas")
    const [credentials, setCredentials] = useState({})
     const { website,github,twitter,insta,facebook }=credentials
    
  const edit=()=>{
    setCheck(true);
    setPen(false);
    setInput(true);
  }
  const cancelEdit=()=>{
    setCheck(false);
    setPen(true);
    setInput(false);
  }
  const handleChange=(e)=>{
     setCredentials({...credentials ,[e.target.name]:e.target.value});
    
  }

  const handleClick=()=>{
    updateUser( website,github,twitter,insta,facebook );
    cancelEdit();
  }
   

  useEffect(() => {
    if(icon==="globe"){
        setSicon("fas")
      }else{
        setSicon("fab")
      }

    // eslint-disable-next-line
  }, [])
  

  
  return (
    
    <>
    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className={`${sicon} fa-${icon} fa-lg`}  style={{color:`${color}`}}></i>
                {input?<input type="text" name={`${name}`} onChange={handleChange} placeholder={social}  />:<p className="mb-0">{social}</p>}
               
                {pen?<i className="fa-solid fa-pen" onClick={edit}></i>:null}
                {check?<i className="fa-solid fa-check" onClick={handleClick}></i>:""}
                {check?<i className="fa-solid fa-xmark" onClick={cancelEdit}></i>:""}
              </li>
              
    
    </>
  )
}

export default Social