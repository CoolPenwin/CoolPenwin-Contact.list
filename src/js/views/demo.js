import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URLs } from "../component/Config.js";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
  const navigate=useNavigate();
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URLs.createAgendaContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        actions.loadSomeData();
        alert("Contacto añadido con éxito");
        resetForm(); // Restablecer el formulario
      } else {
        alert("Error al añadir el contacto");
      }
    } catch (error) {
      alert("Error al conectar con la API");
    }
  };
  
const handleForm=(e)=>{
   if(store.edit){
    actions.editContact(store.edit_id , formData)
   }
   else{
    handleSubmit(e)
   }
   actions.setEditFalse()
   navigate("/");
}

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: ""
    });
  };

  return (
    <>
      <div className="container">
        <div className={store.edit? `input__container2`:`input__container`}>
          <div className="shadow__input"></div>
          <button className="input__button__shadow">
            <svg
              xmlns="https://cdn-icons-png.flaticon.com/512/188/188128.png"
              viewBox="0 0 24 24"
              fill="#000000"
              width="20px"
              height="20px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
          <ul>
            <input
              type="text"
              name="name"
              className="input__search"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="input__search"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              className="input__search"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              className="input__search"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </ul>

          <button className="btn btn-primary" onClick={(e)=>handleForm(e)}>
            Enviar
          </button>

          <br />
          <Link to="/">or Back home</Link>
        </div>
      </div>
    </>
  );
};
