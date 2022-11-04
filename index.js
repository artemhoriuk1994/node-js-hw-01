const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact)
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "remove":
      const contactForRemove = await removeContact(id);
      console.table(contactForRemove)
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

invokeAction(argv);
