import React from 'react';

const RateProgress = ({ percent, countStars }) => {
  const [style, setStyle] = React.useState({});

  React.useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${percent > 22 ? percent : 22}%`,
      };

      setStyle(newStyle);
    }, 10);
  }, [percent, countStars]);

  return (
    <div className="rate-progress">
      <div className="rate-progress-done" style={style}>
        <div className="count_stars">{countStars}</div>
        <div className="star_icon"></div>
      </div>
    </div>
  );
};

export default RateProgress;
