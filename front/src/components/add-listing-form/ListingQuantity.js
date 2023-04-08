// STYLE SHEET
import './AddListingForm.scss';

const ListingQuantity = ({setQuantity, quantity, emptyFields}) => {
  return (
    <div className='add-listing-form__form-option'>
      <label>Quantity</label>
      <input
        placeholder='i.e. 1-2 kilograms, a small bag etc'
        type='text'
        onChange={(event) => setQuantity(event.target.value)}
        value={quantity}
        className={
          emptyFields && emptyFields.includes('quantity') ? 'error' : ''
        }
      />
    </div>
  );
};

export default ListingQuantity;
