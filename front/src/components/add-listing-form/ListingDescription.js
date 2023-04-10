// STYLE SHEET
import './AddListingForm.scss';

const ListingDescription = ({ setDescription, description, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('description')
          ? 'add-listing-form__form-option error'
          : 'add-listing-form__form-option'
      }
    >
      <label>Description</label>
      <textarea
        placeholder='Please give a brief description of the produce you have to offer'
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        name='description'
        id='description'
      />
    </div>
  );
};

export default ListingDescription;
