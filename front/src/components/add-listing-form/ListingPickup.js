// STYLE SHEET
import './AddListingForm.scss';

const ListingPickup = ({ setPickup, pickup, emptyFields }) => {
  return (
    <div className='add-listing-form__form-option'>
      <label>Pickup times</label>
      <input
        placeholder='i.e. weekdays after 5pm'
        type='text'
        onChange={(event) => setPickup(event.target.value)}
        value={pickup}
        className={emptyFields && emptyFields.includes('pickup') ? 'error' : ''}
      />
    </div>
  );
};

export default ListingPickup;
