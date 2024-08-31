import { URLs } from "../component/Config.js";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [] // Cambiado de demo a contacts
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				fetch(URLs.getAgendaContacts)
					.then(response => response.json())
					.then(data => {
						// Actualizar el store con los datos de los contactos
						setStore({ contacts: data.contacts }); // Cambiado de demo a contacts
					})
					.catch(error => {
						console.error("Error fetching contacts:", error);
					});
			}
		}
	};
};

export default getState;
