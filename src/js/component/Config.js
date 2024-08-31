import React from "react";
const baseURL = "https://playground.4geeks.com/contact";
const slug = "CoolPenwin";
import { Context } from "../store/appContext";


export const URLs = {
  getAllAgendas: `${baseURL}/agendas`,
  getSingleAgenda: `${baseURL}/agendas/${slug}`,
  createAgenda: `${baseURL}/agendas/${slug}`,
  deleteAgenda: `${baseURL}/agendas/${slug}`,
  getAgendaContacts: `${baseURL}/agendas/${slug}/contacts`,
  createAgendaContact: `${baseURL}/agendas/${slug}/contacts`,
  updateAgendaContact: (contactId) => `${baseURL}/agendas/${slug}/contacts/${contactId}`,
  deleteAgendaContact: (contactId) => `${baseURL}/agendas/${slug}/contacts/${contactId}`
};