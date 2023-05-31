import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    let noteinitial=[]
    const [notes,setnotes]=useState(noteinitial)
    //Get all notes from API
    const getallnotes=async ()=>{
        const response=await fetch("http://localhost:5000/api/notes/fetchallnotes",{
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
        })
        const json=await response.json();
        console.log(response)
        setnotes(json)


    }
    //Add a note
    const addnotes=async (title,description,tag)=>{
        const response=await fetch("http://localhost:5000/api/notes/addnote",{
            method:"POST",
            headers:{
                "auth-token":localStorage.getItem("token"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title,description,tag})
        })
        const json=await response.json();
        setnotes(notes.concat(json))
    }

    //Delete a note
    const deletenote=async (id)=>{
        const response=await fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers:{
                "auth-token":localStorage.getItem("token"),
                "Content_Type":"application/json"
            }
        })
        const newnote=notes.filter((note)=>{return note._id !== id})
        setnotes(newnote)
        console.log(response)
    }

    //Edit a note
    const editnote=async (id,title,description,tag)=>{
        const response=await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
            method:"PUT",
            headers:{
                "auth-token":localStorage.getItem("token"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title,description,tag})
        })
        const neweditnote=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = neweditnote[index];
            if(element._id=== id){
                neweditnote[index].title=title
                neweditnote[index].description=description
                neweditnote[index].tag=tag
                break;
            }
           
        }
        setnotes(neweditnote)
        console.log(response)
        //const json=await response.json();
        //setnotes(json)
    }
    return(
        <NoteContext.Provider value={{notes,getallnotes,addnotes,deletenote,editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;