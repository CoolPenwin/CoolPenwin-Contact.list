import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    //this will be passed as the contenxt value
    const [username, setUsername] = useState("CoolPenwin");
 

    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      /**
       * EDIT THIS!
       * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
       * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
       * store, instead use actions, like this:
       *
       * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
       *
       **/

      if (username) {
        const url = `https://playground.4geeks.com/contact/agendas/${username}`;

        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 404) {
              return fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  slug: username,
                }),
              }).then((response) => {
                if (!response.ok) {
                  throw new Error("Error en la creación del usuario");
                }
                return response.json();
              });
            } else {
              throw new Error("Error al verificar el usuario");
            }
          })
          .then((data) => {
            setUsername(data.name);
            console.log("Usuario creado/verificado:", data.name);
            return fetch(
              `https://playground.4geeks.com/contact/agendas/${username}`
            );
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener las tareas del usuario");
            }
            return response.json();
          })
          .then((todosData) => {
            setTodos(todosData.todos);
            console.log("Tareas del usuario obtenidas:", todosData.todos);
            if (todosData.todos.length === 0) {
              addInitialTodo();
            }
          })
          .catch((error) => {
            setError(error.message);
            console.error("Error:", error.message);
          });
      }
    }, [username]);



    // The initial value for the context is not null anymore, but the current state of this component,
    // the context will now have a getStore, getActions and setStore functions available, because they were declared
    // on the state of this component
    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
