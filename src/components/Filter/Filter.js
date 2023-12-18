import { useDispatch } from 'react-redux';

import { setFilter } from '../../redux/actions';
import css from './Filter.module.css'

const Filter = () => {
  const dispatch = useDispatch();

  const onChange = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setFilter(value));
  };

    return (
      <>
        <div className={css.filterContacts}>
      <label >Find contacts by name or phone number</label>
          <input className={css.filterInput} type="text" name="filter" onChange={onChange} />
          </div>
    </>
  );
};

export default Filter
