import axios from "axios";
import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";
export default function TodoList({ todos = [],setTodos }) {
  const handleChange = async (id, value) => {
    return axios.patch(`api/todos/${id}`, value)
      .then((res) => {
        const { data } = res
        const newTodos = todos.map(item => {
          if (item.id === id) {
            return data
          } 
            return item
        })
        setTodos(newTodos)
      }).catch(() => {
      alert("Something went wrong")
    })
  }
  const renderListGroupItem = (item) => {
    return <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
      <div className="d-flex justfify-content-center">
        <span style={{ marginRight: "12px", cursor: "pointer" }} onClick={()=> handleChange(item.id,{completed: !item.completed})}>
          {item.completed === true ? <MdCheckBox/>:<MdCheckBoxOutlineBlank/>}
        </span>
        <span>{ item.name}</span>
      </div>
      <div>
        <MdEdit style={{ cursor: "pointer", marginRight: "12px" }} />
        <MdDelete style={{ cursor: "pointer" }} />
      </div>
    </ListGroup.Item>
  }
  return <ListGroup>{ todos.map(renderListGroupItem)}</ListGroup>
}