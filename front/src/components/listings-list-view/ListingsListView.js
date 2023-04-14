// HOOKS
import { Link } from 'react-router-dom';

// COMPONENTS
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

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
                <div className='listings-item__exchange'>
                  <p>{listing.exchange}</p>
                </div>
                <div className='listings-item__location'>
                  <LocationOnOutlinedIcon />
                  <p>{listing.location}</p>
                </div>
                <div className='listings-item__name'>
                  <p>{listing.name}</p>
                </div>
                <span className='arrow'></span>
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default ListingsListView;
