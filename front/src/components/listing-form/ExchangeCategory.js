// STYLE SHEET
import './ListingForm.scss';

const ExchangeCategory = ({
  handleExchangeCategory,
  handleExchangeDescription,
  exchange,
  exchangeDescription,
  emptyFields,
}) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('exchange')
          ? 'listing-form__exchange error'
          : 'listing-form__exchange'
      }
    >
      <p>What would you like for your item?</p>
      <div className='listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='free'
          name='exchange'
          value={exchange}
          checked={exchange === 'free' ? true : false}
        />
        <label htmlFor='free'>Nothing - it's free</label>
      </div>
      <div className='listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='labour'
          name='exchange'
          value={exchange}
          checked={exchange === 'labour' ? true : false}
        />
        <label htmlFor='labour'>Labour - a helping hand in the harvest</label>
      </div>
      <div className='listing-form__exchange-description'>
        <textarea
          placeholder='Please give a brief description, i.e. about 2 hours work to help pick fruit'
          onChange={handleExchangeDescription}
          className={exchange === 'labour' ? '' : 'hide'}
          name='labourDescription'
          id='labourDescription'
          value={exchangeDescription}
        />
      </div>
      <div className='listing-form__exchange-type'>
        <input
          onChange={handleExchangeCategory}
          type='radio'
          id='exchange'
          name='exchange'
          value={exchange}
          checked={exchange === 'exchange' ? true : false}
        />
        <label htmlFor='produce'>Exchange - trade for other produce</label>
      </div>
      <div className='listing-form__exchange-description'>
        <textarea
          placeholder='What are you wanting to exchange for? Please provide a brief description'
          onChange={handleExchangeDescription}
          className={exchange === 'exchange' ? '' : 'hide'}
          name='produceDescription'
          id='produceDescription'
          value={exchangeDescription}
        />
      </div>
    </div>
  );
};

export default ExchangeCategory;
