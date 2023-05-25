import React from 'react';
import CourseColumnView from './course-column-view/CourseColumnView';
import { Row } from 'antd';
import CourseModalWindow from './course-modal-view/CourseModalWindow';

const CoursesColumnView = ({ courses, selectedCourse, handleSelectCourse }) => {
  const closeModalWindow = () => {
    handleSelectCourse(null);
  };

  return (
    <>
      <div className="courses_col_view">
        <Row gutter={[24, 24]}>
          {courses.map((course) => (
            <CourseColumnView
              course={course}
              setSelectedCourse={handleSelectCourse}
              key={course.id}
            />
          ))}
        </Row>
      </div>
      {selectedCourse && (
        <CourseModalWindow course={selectedCourse} closeModalWindow={closeModalWindow} />
      )}
    </>
  );
};

export default CoursesColumnView;
