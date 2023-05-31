import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    let navigate=useNavigate();
    const [credential,setcredential]=useState({Email:"",password:""})
    const handlesubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({Email:credential.Email,password:credential.password})
        });
        const json=await response.json();
        //console.log(json)
        if(json.success){
            //save the auth-token in local storage and redirect
            localStorage.setItem("token",json.authtoken)
            
            navigate("/");  //redirect to home 
            props.showAlert("Logged in suceessfully","success")  
        }
        else{
          props.showAlert("Invalid credential","danger")  
          //alert("Invalid credential")
        }
    }
    const onchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className='container mt-2'>
      <h2>Login to continue to iTodo</h2>
     
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="Email" className="form-control" id="Email" name='Email' aria-describedby="EmailHelp" value={credential.Email} onChange={onchange} />
    <div id="EmailHelp" className="form-text">We'll never share your Email and password with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
