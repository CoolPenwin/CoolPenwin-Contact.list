import { URLs } from "../component/Config.js";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [] // Cambiado de demo a contacts
		},
		actions: {
			
			loadSomeData: () => {
				fetch(URLs.getAgendaContacts)
					.then(response => response.json())
					.then(data => {
						// Asegúrate de que los datos de los contactos incluyen el `id`
						setStore({ contacts: data.contacts }); // Cambiado de demo a contacts
					})
					.catch(error => {
						console.error("Error fetching contacts:", error);
					});
			},
			deleteContact: (contactId) => {
				fetch(URLs.deleteAgendaContact(contactId), {
					method: 'DELETE'
				})
				.then(response => {
					if (!response.ok) {
						throw new Error('Error deleting contact');
					}
					return response.json();
				})
				.then(() => {
					// Actualizar el store eliminando el contacto
					const store = getStore();
					const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
					setStore({ contacts: updatedContacts });
				})
				.catch(error => {
					console.error("Error deleting contact:", error);
				});
			}
		}
	};
};

export default getState;