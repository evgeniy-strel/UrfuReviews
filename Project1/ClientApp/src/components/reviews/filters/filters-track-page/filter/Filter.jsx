import React from 'react';
import './filter.scss';

const Filter = ({ filterData, options, onClick, activeValue, isBlocked }) => {
  const [isShownBody, setIsShownBody] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState(activeValue ?? filterData.text);
  const currentOptions = 'options' in filterData ? Object.values(filterData.options) : options;

  const toggleShownBody = () => {
    setIsShownBody((prevValue) => !prevValue);
  };

  const changeTitle = (newTitle) => {
    setCurrentTitle(newTitle);
    setIsShownBody(false);
    onClick(newTitle);
  };

  React.useEffect(() => {
    if (isBlocked) setIsShownBody(false);
  }, [isBlocked]);

  // React.useEffect(() => {
  //   if (activeValue) {
  //     setCurrentTitle(activeValue);
  //   } else {
  //     setCurrentTitle(filterData.text);
  //   }
  // }, [activeValue]);

  return (
    <div
      className={`select 
      ${filterData.class} 
      ${isShownBody ? 'select_active' : ''} 
      ${isBlocked ? 'blocked' : ''}`}
      disabled={isBlocked}>
      <div className="select_header" onClick={toggleShownBody}>
        <div className="select_header_title">{currentTitle}</div>
        <div className="select_header_icon"></div>
      </div>
      <div className={`select_body ${isShownBody ? 'select_shown_body' : ''}`}>
        {currentOptions.map((option) => (
          <div key={option} className="option" onClick={() => changeTitle(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
