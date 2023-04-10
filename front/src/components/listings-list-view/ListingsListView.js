// HOOKS
import { Link } from 'react-router-dom';

// STYLE SHEET
import './ListingsListView.scss';

const ListingsListView = ({ listings }) => {
  return (
    <ul className='listings'>
      {listings &&
        listings.map((listing) => {
          return (
            <Link
              to={`/listings/${listing._id}`}
              state={listing}
              key={listing._id}
            >
              <li className='listings-item'>
                <h2 className='listings-item__name'>{listing.name}</h2>
                <p>Listed by</p>
                <span className='arrow'></span>
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default ListingsListView;
