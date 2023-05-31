import React, { useEffect } from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom'

const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate()
  useEffect(()=>{
    //console.log(location.pathname)
  },[location])

  const handlelogout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iTodo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <div className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'? "active":""}`} to="/about">About</Link>
        </div>
      </ul>
      {!localStorage.getItem("token")? <form className="d-flex" role="search">
        <Link className='btn btn-success mx-1' to="/login" role="button" >Login</Link>
        <Link className='btn btn-success mx-1' to="/signup" role="button" >Signup</Link>
      </form> : <button className='btn btn-success' onClick={handlelogout}>Logout</button> }
    </div>
  </div>
</nav>
  )
}

export default Navbar
