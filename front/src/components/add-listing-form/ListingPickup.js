// STYLE SHEET
import './AddListingForm.scss';

const ListingPickup = ({ setPickup, pickup, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('pickup')
          ? 'add-listing-form__form-option error'
          : 'add-listing-form__form-option'
      }
    >
      <label>Pickup times</label>
      <input
        placeholder='i.e. weekdays after 5pm'
        type='text'
        onChange={(event) => setPickup(event.target.value)}
        value={pickup}
      />
    </div>
  );
};

export default ListingPickup;
