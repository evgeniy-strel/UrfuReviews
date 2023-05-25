import React from 'react';
import './circle-rating.scss';

export default function Circle({ valuesTrack }) {
  const [style, setStyle] = React.useState({});

  function countDashOffset(value) {
    const onePercent = 3.03;
    return Math.round((100 - value) * onePercent);
  }

  React.useEffect(() => {
    setTimeout(() => {
      const valuePercent = Math.round(valuesTrack.avgRating * 20);
      const dashOffsetValue = countDashOffset(valuePercent);
      setStyle({ strokeDashoffset: `${dashOffsetValue}%` });
    }, 10);
  }, [valuesTrack]);

  return (
    <div className="rating_circle">
      <div className="outer">
        <div className="inner">
          <div className="text">
            <div className="value">{valuesTrack?.avgRating}</div>
            <div className="text_rating">Общий рейтинг</div>
            <div className="count_reviews">{valuesTrack?.countReviews} отзывов</div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#56CCF2" />
            <stop offset="100%" stopColor="#2F80ED" />
          </linearGradient>
        </defs>
        <circle cx="50%" cy="50%" r="calc(50% - 0.25rem)" strokeLinecap="round" style={style} />
      </svg>
    </div>
  );
}
