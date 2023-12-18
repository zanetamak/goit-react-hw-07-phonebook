import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStatusFilter,
  selectContacts,
  selectIsLoading,
} from '../../redux/selectors';
import { deleteContact, fetchContacts } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectStatusFilter);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = async (id) => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Filtrowanie kontaktów na podstawie wartości filtra
  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];


  return (
    <div className={css.contacts}>
      <p>Znajdź kontakt po nazwie</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={css.contactsList}>
          {filteredContacts.map(({ id, name, number }) => (
            <li className={css.contactsItem} key={id}>
              <p className={css.contactsName}>{name}</p>
              <p className={css.contactsNumber}>{number}</p>
              <button
                onClick={() => {
                  handleDeleteContact(id);
                }}
                className={css.contactsBtn}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;