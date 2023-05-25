import React from 'react';
import { Link } from 'react-router-dom';
import './track.scss';
import { getAvgRatingTrack } from '../../usefulMethods/usefulMethods';

const Track = ({ track }) => {
  const [style, setStyle] = React.useState({ width: 0 });
  const [avgRating, setAvgRating] = React.useState('');

  React.useEffect(() => {
    if (!track) return;
    setAvgRating(getAvgRatingTrack(track));
  }, []);

  React.useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${avgRating ? avgRating * 20 : 0}%`,
    };

    setStyle(newStyle);
  }, [avgRating]);

  // FIX: не обновляется рейтинг при поиске

  return (
    <Link to={`/track/${track.id}`}>
      <div className="track_for_course">
        <div className="left">
          <p className="title">{track.trackName}</p>
        </div>
        <div className="right">
          <div className="bar">
            <div className="bar_percent" style={style}></div>
          </div>
          <p className="rating">{avgRating ?? ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default Track;
