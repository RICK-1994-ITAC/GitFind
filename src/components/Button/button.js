import React from "react";
import "./button.css"

const Button = (props)=>{
    return(
        <button onClick={props.onclickProp}>Buscar</button>
    )
}

export default Button