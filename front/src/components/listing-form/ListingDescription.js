// STYLE SHEET
import './ListingForm.scss';

const ListingDescription = ({ setDescription, description, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('description')
          ? 'listing-form__form-option error'
          : 'listing-form__form-option'
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
