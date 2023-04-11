// STYLE SHEET
import './ListingForm.scss';

const ListingLocation = ({ setLocation, location, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('location')
          ? 'listing-form__form-option error'
          : 'listing-form__form-option'
      }
    >
      <label>Pickup Location</label>
      <input
        placeholder='Only use an approx, not an actual address'
        type='text'
        onChange={(event) => setLocation(event.target.value)}
        value={location}
      />
    </div>
  );
};

export default ListingLocation;
