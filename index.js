const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

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
    case "list": // get full list
      console.log(await listContacts());
      break;

    case "get":
      // get contact by id
      console.log(await getContactById(id));
      break;

    case "add":
      // add contact with name email phone
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      // remove contact by id
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
