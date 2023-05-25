import React from 'react';
import './courses.scss';
import CoursesColumnView from './courses-column-view/CoursesColumnView';
import CoursesRowView from './courses-row-view/CoursesRowView';
import CourseModalWindow from './courses-column-view/course-modal-view/CourseModalWindow';

export default function Courses({ courses }) {
  const [isColView, setIsColView] = React.useState(true);
  const [selectedCourse, setSelectedCourse] = React.useState();

  const setColumnView = () => {
    setIsColView(true);
  };

  const setRowView = () => {
    setIsColView(false);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <>
      <div className="courses_title_container">
        <p className="courses_title">Список всех найденных курсов:</p>
        <div className="courses_view">
          <img
            src="img/column-view.svg"
            alt="column view"
            className={isColView ? 'active_view' : ''}
            onClick={setColumnView}
          />
          <img
            src="img/row-view.svg"
            alt="row view"
            className={!isColView ? 'active_view' : ''}
            onClick={setRowView}
          />
        </div>
      </div>

      {isColView ? (
        <CoursesColumnView
          courses={courses}
          selectedCourse={selectedCourse}
          handleSelectCourse={handleSelectCourse}
        />
      ) : (
        <CoursesRowView
          courses={courses}
          selectedCourse={selectedCourse}
          handleSelectCourse={handleSelectCourse}
        />
      )}
    </>
  );
}
