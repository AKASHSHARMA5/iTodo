import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate=useNavigate()
    const [credential,setcredential]=useState({name:"",Email:"",password:""})
    const handleclick=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credential.name,Email:credential.Email,password:credential.password})
        });
        const json=await response.json();
        //console.log(json)
        if(json.success){
            //save the auth token in local storage and redirect
            localStorage.setItem("token",json.authtoken)
            navigate("/")
            props.showAlert("Account created successfully","success")
        }
        else{
            //alert("Invalid Credential")
            props.showAlert("Invalid credential","danger")
        }

    }
    const onchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }

    return (
        <div className="container mt-2">
             <h2>Create a accout to use iTodo</h2>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="EmailHelp" onChange={onchange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" name='Email' aria-describedby="emailHelp" onChange={onchange} required />
                    <div id="emailHelp" className="form-text">We'll never share your Email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup
