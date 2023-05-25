import React from 'react';
import './circle-progress.scss';

const CircleProgress = ({ countChecked }) => {
  const [style, setStyle] = React.useState({});

  function countDashOffset(value) {
    const onePercent = 3.3;
    return Math.round((100 - value) * onePercent);
  }

  React.useEffect(() => {
    const valuePercent = Math.round(countChecked * 20);
    const dashOffsetValue = countDashOffset(valuePercent);
    setStyle({ strokeDashoffset: dashOffsetValue });
  }, [countChecked]);

  return (
    <div className="progress_circle">
      <div className="outer">
        <div className="inner">
          <div className="text">{countChecked * 20}%</div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="114px" height="114px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#56CCF2" />
            <stop offset="100%" stopColor="#2F80ED" />
          </linearGradient>
        </defs>
        <circle cx="57" cy="57" r="52" strokeLinecap="round" style={style} />
      </svg>
    </div>
  );
};

export default CircleProgress;
