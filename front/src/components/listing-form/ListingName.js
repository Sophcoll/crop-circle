// STYLE SHEET
import './ListingForm.scss';

const ListingName = ({ setName, name, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('name')
          ? 'listing-form__form-option error'
          : 'listing-form__form-option'
      }
    >
      <label>Name of produce</label>
      <input
        type='text'
        placeholder='What are you listing?  i.e. apples'
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
    </div>
  );
};

export default ListingName;
