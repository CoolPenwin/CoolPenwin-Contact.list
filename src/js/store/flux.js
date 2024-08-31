import { URLs } from "../component/Config.js";
import Swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			edit: false,
			edit_id: null,
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
					getActions().loadSomeData();
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
			},
			setEditTrue: (id)=>{
				setStore({edit: true})
				setStore({edit_id: id})
			},
			setEditFalse: ()=>{
				setStore({edit: false})
			},
			editContact: async (contactId, formData)=>{
				try {
					const response = await fetch(URLs.updateAgendaContact(contactId), {
					  method: "PUT",
					  headers: {
						"Content-Type": "application/json"
					  },
					  body: JSON.stringify(formData)
					});
					if (response.ok) {
						getActions().loadSomeData();
					  
					  Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Contacto modificado con éxito",
						showConfirmButton: false,
						timer: 2000
					  });
					  resetForm(); // Restablecer el formulario
					} else {
					  console.error("Error al modificar el contacto");
					}
				  } catch (error) {
					console.error("Error al conectar con la API");
				  }

			}
		}
	};
};

export default getState;