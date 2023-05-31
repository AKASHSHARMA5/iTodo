import React, { useContext,useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    
    let context=useContext(NoteContext);
    const {addnotes}=context

    const [note,setnote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addnotes(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        props.showAlert("Added sucessfully","success")
        window.location.reload(false);
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onchange} minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={3} required />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
  )
}

export default Addnote
