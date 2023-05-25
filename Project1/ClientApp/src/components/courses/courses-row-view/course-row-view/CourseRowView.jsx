import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_row_view.scss';
import Tracks from '../../../tracks/Tracks.jsx';

const CourseRowView = ({ course, selectedCourse, setSelectedCourse }) => {
  const handleClickArrow = () => {
    setSelectedCourse((prevCourse) => (prevCourse?.id === course?.id ? undefined : course));
  };

  return (
    <div
      className={`course_row_view ${selectedCourse == course ? 'show_tracks' : ''}`}
      key={course.id}>
      <div className="course_container">
        <div className="course_row" onClick={handleClickArrow}>
          <p className="title">{course.subjectName}</p>
          <img src="img/arrow-bottom.svg" alt="show tracks" />
        </div>
        {selectedCourse?.id == course?.id && (
          <Tracks tracks={course.tracks} destiny={destinyTracks.MainPage} />
        )}
      </div>
    </div>
  );
};

export default CourseRowView;
