import React from "react";
import "./item.css"

export default function ItemList(props) {
  return (
    <div className="repoItem">
        <h3><strong>{props.title}</strong></h3>
        <p>{props.description}</p>

        <hr/>

    </div>

  )
}
