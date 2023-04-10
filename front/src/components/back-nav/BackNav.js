// HOOKS
import { useNavigate } from 'react-router-dom';

// STYLE SHEET
import './BackNav.scss';

const BackNav = () => {
  
  const navigate = useNavigate();

  return (
    <nav className='back-nav'>
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
