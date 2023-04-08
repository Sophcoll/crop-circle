// STYLE SHEET
import './AddListingForm.scss';

const ListingLocation = ({ setLocation, location, emptyFields }) => {
  return (
    <div className='add-listing-form__form-option'>
      <label>Pickup Location</label>
      <input
        placeholder='Only use an approx, not an actual address'
        type='text'
        onChange={(event) => setLocation(event.target.value)}
        value={location}
        className={
          emptyFields && emptyFields.includes('location') ? 'error' : ''
        }
      />
    </div>
  );
};

export default ListingLocation;
