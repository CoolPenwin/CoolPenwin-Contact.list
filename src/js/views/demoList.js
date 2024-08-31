import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const DemoList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadSomeData();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Shut up Rigo!</h1>
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
        <input
          type="text"
          name="username"
          className="input__search"
          placeholder="Enter username"
        />
        <ul className="list-group">
          {store.contacts.map((contact, index) => (
            <li key={index} className="list-group-item d-flex align-items-center input__search">
              <Link to={`/single/${index}`} className="w-100 d-flex align-items-center">
                <div className="shadow__input"></div>
                <button className="input__button__shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000000"
                    width="20px"
                    height="20px"
                    className="me-2"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
                <span>{contact.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};