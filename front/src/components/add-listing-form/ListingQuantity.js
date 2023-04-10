// STYLE SHEET
import './AddListingForm.scss';

const ListingQuantity = ({ setQuantity, quantity, emptyFields }) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('quantity')
          ? 'add-listing-form__form-option error'
          : 'add-listing-form__form-option'
      }
    >
      <label>Quantity</label>
      <input
        placeholder='i.e. 1-2 kilograms, a small bag etc'
        type='text'
        onChange={(event) => setQuantity(event.target.value)}
        value={quantity}
      />
    </div>
  );
};

export default ListingQuantity;
