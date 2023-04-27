const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

// Абсолютний шлях
const contactsPath = path.join(__dirname, 'contacts.json');

// Ф-ція оновлення .json
const updateList = async (allContacts) =>
  await fs.writeFile(
    contactsPath,
    JSON.stringify(allContacts, null, 2)
  );

// Отримати всі контакти
const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// Отримати контакт за id
const getContactById = async (id) => {
  const allContacts = await getAllContacts();
  const res = allContacts.find(
    (contact) => contact.id === id
  );
  return res || null;
};

// Додати контакт
const addContact = async ({ name, email, phone }) => {
  const allContacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  await updateList(allContacts);
  return newContact;
};

// Оновити контакт за id
const updateContactById = async (id, data) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(
    (contact) => contact.id === id
  );
  if (index === -1) {
    return null;
  }

  allContacts[index] = { id, ...data };
  await updateList(allContacts);
  return allContacts[index];
};

// Видалити контакт за id
const deleteContactById = async (id) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(
    (contact) => contact.id === id
  );
  if (index === -1) {
    return null;
  };
  const [deletedContact] = allContacts.splice(index, 1);  
  await updateList(allContacts);

  return deletedContact;
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};