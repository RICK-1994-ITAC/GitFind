import React from "react";
import "./item.css"

export default function ItemList(props) {
  return (
    <div className="repoItem">
      <a href={props.linkRep.html_url}target="_blank" rel="noreferrer" ><h3><strong>{props.title}</strong></h3></a>
      <p>{props.description}</p>
    </div>

  )
}
