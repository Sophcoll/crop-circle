// STYLE SHEET
import './AddListingForm.scss';

const ExchangeCategory = ({handleExchangeCategory, handleExchangeDescription, exchange}) => {
  return (
    <div className='add-listing-form__exchange'>
      <p>What would you like for your item?</p>
      <div className='add-listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='free'
          name='exchange'
          value='free'
        />
        <label htmlFor='free'>Nothing - it's free</label>
      </div>
      <div className='add-listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='labour'
          name='exchange'
          value='labour'
        />
        <label htmlFor='labour'>Labour - a helping hand in the harvest</label>
      </div>
      <div className='add-listing-form__exchange-description'>
        <textarea
          placeholder='Please give a brief description, i.e. about 2 hours work to help pick fruit'
          onChange={handleExchangeDescription}
          className={exchange === 'labour' ? '' : 'hide'}
          name='labourDescription'
          id='labourDescription'
          cols='30'
          rows='10'
        />
      </div>
      <div className='add-listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='produce'
          name='exchange'
          value='produce'
        />
        <label htmlFor='produce'>Exchange - trade for other produce</label>
      </div>
      <div className='add-listing-form__exchange-description'>
        <textarea
          placeholder='What are you wanting to exchange for? Please provide a brief description'
          onChange={handleExchangeDescription}
          className={exchange === 'produce' ? '' : 'hide'}
          name='produceDescription'
          id='produceDescription'
          cols='30'
          rows='10'
        />
      </div>
    </div>
  );
};

export default ExchangeCategory;
