import React from 'react';

const CriteriaProgress = ({ value }) => {
  const [style, setStyle] = React.useState({});

  React.useEffect(() => {
    setTimeout(() => {
      const percent = Math.round(value * 20);
      const newStyle = {
        opacity: 1,
        width: `${percent > 18 ? percent : 18}%`,
      };

      setStyle(newStyle);
    }, 10);
  }, [value]);

  return (
    <div className="criteria-progress">
      <div className="criteria-progress-done" style={style}></div>
    </div>
  );
};

export default CriteriaProgress;
