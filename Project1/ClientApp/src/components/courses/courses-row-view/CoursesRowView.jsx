import React from 'react';
import CourseRowView from './course-row-view/CourseRowView';
import { Col, Row } from 'antd';
import { getValuesCourse } from '../../usefulMethods/usefulMethods';

const CoursesRowView = ({ courses, selectedCourse, handleSelectCourse }) => {
  const [valuesCourse, setValuesCourse] = React.useState();

  React.useEffect(() => {
    setValuesCourse(getValuesCourse(selectedCourse));
  }, [selectedCourse]);

  return (
    <div className="courses_row_view_container">
      <Row gutter={{ lg: 35, md: 25, sm: 15 }}>
        <Col sm={24} md={14} lg={16}>
          <div className="courses_row_view">
            {courses.map((course) => (
              <CourseRowView
                course={course}
                selectedCourse={selectedCourse}
                setSelectedCourse={handleSelectCourse}
                key={course.id}
              />
            ))}
          </div>
        </Col>
        <Col sm={0} md={10} lg={8} className="info_about_course_grid">
          {selectedCourse && (
            <div className="info_about_course">
              <p className="title">
                <span className="title_up">
                  Информация
                  <br />
                </span>{' '}
                об выбранном курсе
              </p>
              <div className="values">
                <div className="assessment">
                  Средняя оценка <span>{valuesCourse?.avgRating}</span>
                </div>
                <div className="count_tracks">
                  Всего треков <span>{selectedCourse?.tracks?.length ?? ''}</span>
                </div>
                <div className="count_reviews">
                  Добавлено отзывов <span>{valuesCourse?.countReviews}</span>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CoursesRowView;
