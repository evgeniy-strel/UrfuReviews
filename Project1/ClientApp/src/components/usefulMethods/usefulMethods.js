import React from 'react';

export const getAvgRatingTrack = (track) => {
  return +(
    track.prepods.reduce((sum, prepod) => (sum += prepod.values.avgRating), 0) /
    track.prepods.length
  ).toFixed(1);
};

export const getCountReviewsTrack = (track) => {
  if (!track) return;

  return track.prepods.reduce((sum, prepod) => (sum += prepod.values.countReviews), 0);
};

const getZeroValuesPrepod = (track) => {
  if (!track) return;

  const values = {};
  for (let value in track.prepods[0].values) {
    values[value] = 0;
  }

  return values;
};

export const getValuesTrack = (track) => {
  if (!track) return;

  const values = getZeroValuesPrepod(track);

  track.prepods.forEach((prepod) => {
    for (let value in prepod.values) {
      values[value] += prepod.values[value];
    }
  });

  for (let value in values) {
    if (value.includes('avg')) {
      values[value] = (values[value] / track.prepods.length).toFixed(1);
    }
  }

  return values;
};

export const getValuesCourse = (course) => {
  if (!course) return;

  const values = { avgRating: 0, countReviews: 0 };
  let countPrepods = 0;

  course.tracks.forEach((track) => {
    values.avgRating += getAvgRatingTrack(track);
    values.countReviews += getCountReviewsTrack(track);
    countPrepods += track.prepods.length;
  });

  values.avgRating = (values.avgRating / countPrepods).toFixed(1);

  return values;
};
