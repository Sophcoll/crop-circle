// STYLE SHEET
import './Circle.scss';

const Circle = ({ pageTitle }) => {
  return (
    <div className='circle'>
      <div className='circle__background'>
        <h1 className='circle__title'>{pageTitle}</h1>
      </div>
    </div>
  );
};

export default Circle;
