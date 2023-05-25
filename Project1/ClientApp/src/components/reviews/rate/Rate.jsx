import React from 'react';
import './rate.scss';
import RateProgress from './rate-progress/RateProgress';

export default function Rate({ valuesTrack }) {
  const getPercent = (countStars) => {
    return Math.round((countStars / valuesTrack.countReviews) * 100);
  };

  return (
    <div className="rate_list">
      <div className="rate">
        <div className="rate_bar">
          <RateProgress percent={getPercent(valuesTrack.count5)} countStars={5} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(valuesTrack.count4)} countStars={4} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(valuesTrack.count3)} countStars={3} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(valuesTrack.count2)} countStars={2} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(valuesTrack.count1)} countStars={1} />
        </div>
      </div>
    </div>
  );
}
