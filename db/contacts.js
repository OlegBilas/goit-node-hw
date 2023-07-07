const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  //Повертає масив контактів
  const buffer = await fs.readFile(contactsPath);

  return JSON.parse(buffer);
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  return contacts.find(({ id }) => id === contactId) || null;
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [contactRemoved] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactRemoved;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const contactAdded = { id: nanoid(), name, email, phone };
  contacts.push(contactAdded);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactAdded;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
