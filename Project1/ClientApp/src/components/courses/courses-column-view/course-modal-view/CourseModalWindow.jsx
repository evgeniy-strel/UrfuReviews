import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_modal_window.scss';
import Tracks from '../../../tracks/Tracks.jsx';
import ModalWindow from '../../../modal-window/ModalWindow.jsx';
import { getValuesCourse } from '../../../usefulMethods/usefulMethods.js';

const CourseModalWindow = ({ course, closeModalWindow }) => {
  const [courseValues, setCourseValues] = React.useState(null);

  React.useEffect(() => {
    setCourseValues(getValuesCourse(course));
  }, [course]);

  return (
    <ModalWindow onClose={closeModalWindow}>
      <div className="course_modal_window">
        <div className="header">
          <div className="title">{course.subjectName}</div>
          <img src="img/close.svg" alt="close" onClick={closeModalWindow} />
        </div>
        <div className="values">
          <div className="assessment">
            <p>{courseValues?.avgRating ?? ''}</p>
            Средняя оценка
          </div>
          <div className="count_tracks">
            <p>{course.tracks.length}</p>
            Всего треков
          </div>
          <div className="count_reviews">
            <p>{courseValues?.countReviews ?? ''}</p>
            Добавлено отзывов
          </div>
        </div>
        <Tracks tracks={course.tracks} destiny={destinyTracks.ModalWindow} />
      </div>
    </ModalWindow>
  );
};

export default CourseModalWindow;
