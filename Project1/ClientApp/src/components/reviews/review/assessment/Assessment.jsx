import React from 'react';
import './assessment.scss';

const Assessment = ({ title, onChangeField }) => {
  const [currentValue, setCurrentValue] = React.useState(0);

  const handleClickStar = (value) => {
    setCurrentValue(value);
    onChangeField(title, value);
  };

  return (
    <div className="assessment_block">
      <div className="assessment_title">{title}</div>
      <div className="assessment_stars">
        <img
          src="/img/star-gold.svg"
          alt="star"
          onClick={() => handleClickStar(5)}
          className={`${currentValue >= 5 ? 'active_star' : ''}`}
        />
        <img
          src="/img/star-gold.svg"
          alt="star"
          onClick={() => handleClickStar(4)}
          className={`${currentValue >= 4 ? 'active_star' : ''}`}
        />
        <img
          src="/img/star-gold.svg"
          alt="star"
          onClick={() => handleClickStar(3)}
          className={`${currentValue >= 3 ? 'active_star' : ''}`}
        />
        <img
          src="/img/star-gold.svg"
          alt="star"
          onClick={() => handleClickStar(2)}
          className={`${currentValue >= 2 ? 'active_star' : ''}`}
        />
        <img
          src="/img/star-gold.svg"
          alt="star"
          onClick={() => handleClickStar(1)}
          className={`${currentValue >= 1 ? 'active_star' : ''}`}
        />
      </div>
    </div>
  );
};

export default React.memo(Assessment);
