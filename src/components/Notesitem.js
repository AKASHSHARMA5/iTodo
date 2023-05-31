import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Notesitem = (props) => {
    const context=useContext(NoteContext);
    let {deletenote}=context;
    const { note,updatenote } = props
    return (
        <div className='col-md-3 my-3'>
            <div className="card mx-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id);
                        props.showAlert("Deleted successfully","success") }}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
