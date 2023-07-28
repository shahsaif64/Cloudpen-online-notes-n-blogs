import React, { useContext, useEffect,useRef,useState } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = (props) => {
  const navigate = useNavigate();
  const {showAlert}= props
  const context = useContext(NoteContext);
  const { notes, addNote, fetchNotes,editNote } = context;

  const [note, setNote] = useState({eid:"", etitle: "", edescription: "", etag: "" })

  

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetchNotes();
    }else{
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [])
 const ref = useRef(null)
 const refClose = useRef(null)

  const updatenote = (currennote) => {
     ref.current.click();
    //console.log(currennote._id);
    setNote({eid:currennote._id,etitle:currennote.title, edescription:currennote.description, etag:currennote.tag});
    } 


    const HandleChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
  }

  const Handleclick = (e) => {
      e.preventDefault();
      editNote(note.eid,note.etitle,note.edescription,note.etag);
      showAlert('success','Note updated successfully')
      refClose.current.click();
  }

  return (
    <>
      <Addnote addNote={addNote} showAlert={showAlert} />




        {/* Modal Code start */}

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="my-3 mx-4">
            <form>
                <div className="mb-2">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Minimum 5 charcters" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={HandleChange} />

                </div>
                <div className="mb-2">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea className="form-control" id="edescription" placeholder="Minimum 15 charcters" name="edescription" value={note.edescription} rows="3" onChange={HandleChange} ></textarea>
                </div>
                <div className="mb-2">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="e.g- Personal" aria-describedby="emailHelp" onChange={HandleChange} />
                </div>
                 
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<15} className="btn btn-primary" onClick={Handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
       {/* Modal Code End */}



      <div className="container my-5 row">
        <h2 className='mb-3'>Your Notes</h2>
         <div className="container mx-2">
          {notes.length===0 && `No Notes To dispaly`}
         </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updatenote={updatenote} showAlert={showAlert}/>
        })}

      </div>
    </>
  )
}

export default Notes