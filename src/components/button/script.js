import './style.css'
import React from 'react';

export default function Button(props){
  let class_names = (props.className ? props.className : '')
  return (
    <button className={class_names} onClick={props.onClick} value={props.value}>
      {props.text}
    </button>
  );
}
