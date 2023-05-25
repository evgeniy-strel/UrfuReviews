import React from 'react';
import './course_column_view.scss';
import { Col } from 'antd';

const CourseColumnView = ({ course, setSelectedCourse }) => {
  const onCourseClick = () => {
    setSelectedCourse(course);
  };

  return (
    <>
      <Col
        item
        key={course.id}
        onClick={onCourseClick}
        xs={24}
        sm={12}
        md={8}
        lg={8}
        className="course_col_view_grid">
        <div className="course_col_view">
          <div className="course_col_view_background"></div>
          <p className="course_col_view_title">{course.subjectName}</p>
        </div>
      </Col>
    </>
  );
};

export default CourseColumnView;
