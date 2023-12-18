import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css'

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

    //  dodawanie nowego kontaktu
  const handleAddContact = (e) => {
       // Zapobiega domyślnej akcji formularza (przesłaniu danych)
    e.preventDefault();
    //  pobieranie danych z formularza
    const form = e.target;
    const name = form.name.value.trim();
    const number = form.number.value.trim();

    // Sprawdź, czy kontakt o podanej nazwie już istnieje
    const isContactExists = contacts.findIndex(
  (contact) => contact.name.toLowerCase() === name.toLowerCase()
    ) !== -1; 
    //   funkcja findIndex, która zwraca indeks pierwszego elementu tablicy spełniającego warunek. 
    // Jeśli nie znaleziono takiego elementu, zwróci - 1.

if (isContactExists) {
  alert(`${name} is already in contacts.`);
  form.reset();
  return;
}

    // Dodanie kontaktu do Redux Store
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(addContact(newContact));

    // Resetowanie formularza po dodaniu kontaktu
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
      <label className={css.inputForm}>
        Name
        <input
          autoComplete="off"
          type="text"
          name="name"
           className={css.inputName}
          placeholder="e.g. John Doe"
          required
        />
      </label>
      <label className={css.inputForm}>
        Number
        <input
          autoComplete="off"
          type="tel"
          name="number"
              className={css.inputNumber}
          placeholder="e.g. 123-456-789"
          required
        />
      </label>
      <button className={css.formBtn} type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm