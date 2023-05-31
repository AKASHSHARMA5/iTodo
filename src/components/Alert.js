import React from 'react'

const Alert = (props) => {
  const capitalize=(word)=>{
    if(word==="danger"){
        word="error"
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase() +lower.slice(1);

  }  
  return (
    <div style={{height:"55px"}}>
    {props.Alert && <div className={`alert alert-${props.Alert.type} alert-dismissible fade show`} role="alert">
        {capitalize(props.Alert.type)} : {props.Alert.msg}
    </div>}
    </div>
  )
}

export default Alert

