import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const contact = store.contacts[params.theid];
  const navigate = useNavigate ();

  const handleDelete = () =>{
    actions.deleteContact(contact.id);
    navigate("/");
  }
  const handleEdit = (id)=>{
    actions.setEditTrue(id);
    navigate("/demo");
    
  }

  return (
    <div className="text-center mt-5">
      <div className="input__container1">
        <div className="shadow__input"></div>
        <button className="input__button__shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
            width="20px"
            height="20px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
        <ul className="list-group text-center mt-5">
          <li className="list-group-item input__search ">
            <div className="shadow__input text-center mt-5"></div>
            
            <span>{contact.name}</span>
          </li>
          <li className="list-group-item input__search text-center mt-5">
            <div className="shadow__input"></div>
            
            <span>{contact.email}</span>
          </li>
         
          <li className="list-group-item input__search">
            <div className="shadow__input"></div>
           
            <span>{contact.phone}</span>
          </li>
          <li className="list-group-item input__search">
            <div className="shadow__input text-center mt-5"></div>
           
            <span>{contact.address}</span>
          </li>
            <button onClick={() => handleEdit(contact.id)} className="btn btn-danger ms-2">
              EDITAR
            </button>

            <button onClick={() =>handleDelete ()} className="btn btn-danger ms-2">
              Eliminar
            </button>
          
        </ul>
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
