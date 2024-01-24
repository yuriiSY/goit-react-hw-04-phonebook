import { useState, useEffect } from 'react';

import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';

const Contacts = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });

  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = ({ name }) => {
    const nameNormalized = name.toLowerCase();

    const duplicate = contacts.find(item => {
      const currentNameNormalize = item.name.toLowerCase();
      return currentNameNormalize === nameNormalized;
    });

    return Boolean(duplicate);
  };

  const addContact = data => {
    if (isDuplicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredList = () => {
    const normolizedTarget = filter.toLowerCase();

    const filteredContats = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normolizedTarget);
    });

    return filteredContats;
  };

  const fiteredContacts = getFilteredList();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ContactList items={fiteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default Contacts;
