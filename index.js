import { program } from "commander";
import * as ContactsModel from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await ContactsModel.listContacts();
      console.table(contacts);

      break;

    case "get":
      const contact = await ContactsModel.getContactById(id);
      console.log(contact);

      break;

    case "add":
      const newContact = await ContactsModel.addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const oldContact = await ContactsModel.removeContact(id);
      console.log(oldContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
