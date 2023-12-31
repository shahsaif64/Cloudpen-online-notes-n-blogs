import React, { useState } from 'react';
import NoteContext from './NoteContext';


const NoteState = (props) => {
  // const host = "http://localhost:4500";
  const host = "https://cloudpenbackend.onrender.com";
  const [user, setUser] = useState({});
  const initialnotes = [];
  const [notes, setNotes] = useState(initialnotes);
 

  //fetch all notes
  const fetchNotes = async () => {
    //API CALL 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const fethedData = await response.json();
    setNotes(fethedData);
    localStorage.setItem("notes", fethedData.length);
    
  }





  //add a note
  const addNote = async (title, description, tag) => {

    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const addednote =await response.json();
    setNotes(notes.concat(addednote));

    
  }



  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    await response.json();
    // console.log(editedNote)

           let newNotes=JSON.parse(JSON.stringify(notes))     
               

    //this is a logic to edit a note
    for (let i = 0; i < newNotes.length; i++) {
      const note = newNotes[i];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }


  //delete a note
  const deleteNote = async (id) => {
    // console.log("deleting the note with id=" + id)

    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    await response.json();
    // console.log(deleteData);

    let newnotes = notes.filter((note) => { return note._id !== id; });
    setNotes(newnotes);
  }

  //fetch user information
  const fetchUser = async () => {
    // API CALL
    const response = await fetch(`${host}/api/auth/fetchuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const userData = await response.json();
   
    setUser(userData);
    
  }


  //Update user information
  const updateUser = async (website,github,twitter,insta,facebook) => {
    // API CALL
    const response = await fetch(`${host}/api/auth/updateuser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ website,github,twitter,insta,facebook })
    });
    const userData = await response.json();
   
    setUser(userData);
    
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes,fetchUser,user ,updateUser}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;