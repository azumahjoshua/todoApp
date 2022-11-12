import axios from "axios";
import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from "react-bootstrap/FormControl"
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
export default function TodoList({ todos = [], setTodos }) {
  const [show, setShow] = useState(false);;
  const [record, setRecord] = useState(null)
  const handleClose = () =>{
    setShow(false)
  }
  const handleDelete = (id) => {
    axios.delete(`api/todos/${id}/`)
      .then(() => {
        const newTodos = todos.filter(item => {
        return item.id !== id
        })
        setTodos(newTodos)
      }).catch(() => {
      alert("Something went wrong")
    })
  }
  const handleUpdate = async (id, value) => {
    return axios.patch(`api/todos/${id}/`, value)
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
        <span style={{ marginRight: "12px", cursor: "pointer" }} onClick={()=> handleUpdate(item.id,{completed: !item.completed})}>
          {item.completed === true ? <MdCheckBox/>:<MdCheckBoxOutlineBlank/>}
        </span>
        <span>{ item.name}</span>
      </div>
      <div>
        <MdEdit style={{ cursor: "pointer", marginRight: "12px" }} onClick={() => {
          setRecord(item);
          setShow(true)
        }} />
        <MdDelete style={{ cursor: "pointer" }}
          onClick={() => { handleDelete(item.id) }} />
      </div>
    </ListGroup.Item>
  }
  const handleChange = (event) => {
    setRecord({
      ...record,
      name: event.target.value
    })
  }
  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { name: record.name });
    handleClose();
  }
  return <div>
    <ListGroup>{todos.map(renderListGroupItem)}</ListGroup>
    <Modal show={show} onHide={handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl value={record ? record.name : " "}
          onChange={handleChange } />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"  onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary"  onClick={handleSaveChanges}> 
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}