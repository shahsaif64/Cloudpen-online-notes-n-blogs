import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
const Noteitem = (props) => {
    const context= useContext(NoteContext);
    const {deleteNote}= context;
    const { note,updatenote,showAlert} = props
    return (
        <>
            <div className="col-md-4 " >
            <div className="card text-center mb-5">
                <div className="card-body  overflow-scroll">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}.</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);showAlert('success','Note Deleted successfully')}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)} }></i>
                </div>
            </div>
            
            </div>
        </>

    )
}

export default Noteitem