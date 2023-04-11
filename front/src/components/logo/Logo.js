// STYLE SHEET
import './Logo.scss';

const Logo = ({ greenBackground }) => {
  return (
    <div className={greenBackground ? 'logo logo--green' : 'logo'}>
      <h5>crop</h5>
      <span className='line'></span>
      <h5>circle</h5>
    </div>
  );
};

export default Logo;
