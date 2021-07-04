import './App.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contacts';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]); // setContacts to update the state


//RetriveContacts
const retriveContacts = async () =>
{
  const response = await api.get("/contacts");
  console.log(response.data);
  return response.data;
}

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id:uuid(), //uuid utility
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts,response.data])
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts]);

  useEffect(() => {

//    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
 //   if (retriveContacts) setContacts(retriveContacts);
 const getAllContacts = async () =>
 {
   const allContacts = await retriveContacts();
  
   if(allContacts) setContacts(allContacts);
 }
 getAllContacts();
  }, []);



  return (
    <div class="ui container">

      <Router>
        <Header />
        <Switch>

          {/* <Route 
     path="/" 
     exact 
    render ={(props) =>{<ContactList {...props} 
    contacts={contacts} getContactId={removeContactHandler}/>}}
    />

    <Route 
    path="/add" 
    render ={(props) => {<AddContact {...props}
    addContactHandler={addContactHandler}
    />}}
    /> */}

          {/* component= {() => <ContactList contacts={contacts} getContactId={removeContactHandler} />} */} 

          <Route 
            path="/"
            exact
            render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)}
          />
             {/* component={() => <AddContact addContactHandler={addContactHandler} />}  */}
          <Route 
            path="/add" 
            render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)}
           
            />
            <Route
            path="/contact/:id"
            component={ContactDetail}
            />


        </Switch>
      </Router>
     
     
      {/* <Header /> 
       <AddContact addContactHandler={addContactHandler}/>
       
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
      */}
    </div>
  );
}

export default App;
