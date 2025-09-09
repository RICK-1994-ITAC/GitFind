import React from "react";
import "./input.css"

const Input = (props)=>{
    return( 
    <input type="text" placeholder="@userName" value={props.innerText} onChange= {props.onchangeProp}/>
)
   
}

export default Input