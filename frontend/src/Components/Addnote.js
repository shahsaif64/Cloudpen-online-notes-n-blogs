import React, { useState } from 'react'

const Addnote = (props) => {
    const {addNote,showAlert} = props
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const HandleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const Handleclick = (e) => {
        e.preventDefault();
       addNote(note.title,note.description,note.tag);
       showAlert('success','Note added successfully')
       setNote({ title: "", description: "", tag: "" })
    }
    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Minimum 5 charcters" aria-describedby="emailHelp" onChange={HandleChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3"  placeholder="Minimum 15 charcters" value={note.description} onChange={HandleChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" placeholder="e.g- Personal" value={note.tag} onChange={HandleChange} />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<15} type="submit" className="btn btn-primary" onClick={Handleclick}>Add note</button>
            </form>
        </div>
    )
}

export default Addnote