// HOOKS
import { useNavigate } from 'react-router-dom';

// STYLE SHEET
import './BackNav.scss';

const BackNav = ({ greenBackground }) => {
  const navigate = useNavigate();

  return (
    <nav className={greenBackground ? 'back-nav back-nav--green' : 'back-nav'}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className='back-button'
      >
        <span className='back-arrow'></span>
      </button>
    </nav>
  );
};

export default BackNav;
