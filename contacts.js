const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const dbRAW = await fs.readFile(contactsPath, "utf8");
    return JSON_parse = JSON.parse(dbRAW);
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(contactId) {
  const getContactList = await listContacts();
  return contactById = getContactList.find((contact) => {
    return contact.id === contactId;
  });
}

async function removeContact(contactId) {
  let contactsList = await listContacts();
  const freshDB = contactsList.filter((contact) => {
    return contact.id !== contactId;
  });

  contactsList = freshDB;
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return freshDB
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const id = uuidv4();
  const contact = { id, name, email, phone };
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
