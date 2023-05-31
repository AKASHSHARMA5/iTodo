import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate=useNavigate();
  const context = useContext(NoteContext);
  let { notes, getallnotes, editnote } = context;
  const ref = useRef(null)
  const refclose=useRef(null)
  useEffect(() => {
    if(localStorage.getItem("token")){
      getallnotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  
  const [note, setnote] = useState({id:"" ,etitle: "", edescription: "", etag: "" })

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
  }

  const handleclick = (e) => {
    e.preventDefault();
    //console.log("updating the note", note)
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Note edit successfully","success")

  }

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <Addnote showAlert={props.showAlert} key={note._id}/>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
       update live modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="container row my-3">
        <h2>Your Note</h2>
        <div className="container">
          {notes.length===0 && "No note to display"}
        </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} showAlert={props.showAlert} updatenote={updatenote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
