const contactService = require('./db/contacts');
const { program } = require('commander');

// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactService.getAllContacts();
      console.table(allContacts);
      break;
    
    case 'get':
      const contactById = await contactService.getContactById(id);
      console.log(contactById);
      break;
    case 'add':
      const newContact = await contactService.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case 'update':
      const updateContact = await contactService.updateContactById(id, { name, email, phone });
      console.log(updateContact);
      break;
    case 'remove':
      const deleteContact = await contactService.deleteContactById(id);
      console.log(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type! Use one of these: list, get, add, update, remove");
    
  }
};


program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse()
const options = program.opts()
  invokeAction(options)



// =================================================================================
// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv)

// invokeAction({ action: "list" })
// invokeAction({action: 'get', id: 'qdggE76Jtbfd9eWJHrssH'})
// invokeAction({action: 'add', name: "JJ", email: "JJ@mail.com", phone: "567-90-78"})
//  invokeAction({action: 'update', id:"Y89ZVpF7km5PsWMS5u7j3", name: "Jessica Jones", email: "JJ@mail.com", phone: "+1909-567-90-78"})
// invokeAction({action: 'remove', id:"qxgFQdizvQn1Nr4KF641p"})
// invokeAction({action: 'delete'})
