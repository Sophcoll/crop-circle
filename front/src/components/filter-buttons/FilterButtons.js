// STYLE SHEET
import './FilterButtons.scss';

const FilterButtons = ({ filterOptions }) => {
  return (
    <ul className='filter-list'>
      {filterOptions.map((item) => {
        return (
          <li key={item} className='filter-list__item'>
            <button>{item}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default FilterButtons;
