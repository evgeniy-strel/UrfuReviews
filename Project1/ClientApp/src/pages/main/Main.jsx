import React from 'react';
import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import Courses from '../../components/courses/Courses';
import {
  getCountReviews,
  getCountSubjects,
  getIsLoadingShowMoreCourses,
  getLimitSubjects,
  getSemester,
  getSubjects,
} from './../../store/selectors';
import { fetchCountSubjects, fetchSubjects } from '../../store/api-actions';
import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { addLimitSubjects } from '../../store/subjectsSlice';

const Main = () => {
  const dispatch = useDispatch();
  const courses = useSelector(getSubjects);
  const countCourses = useSelector(getCountSubjects);
  const isLoadingShowMoreCourses = useSelector(getIsLoadingShowMoreCourses);
  const limit = useSelector(getLimitSubjects);
  const semester = useSelector((state) => getSemester(state));

  React.useEffect(() => {
    dispatch(fetchSubjects({ limit, semester }));
  }, [limit, semester]);

  React.useEffect(() => {
    dispatch(fetchCountSubjects({ semester }));
  }, [semester]);

  const showMoreCourses = () => {
    dispatch(addLimitSubjects());
  };

  const isShowButtonShowMore = () => countCourses > limit;

  return (
    <div className="courses">
      <Courses courses={courses} />
      {(isShowButtonShowMore() || isLoadingShowMoreCourses) && (
        <div className="pagination">
          <div className="pagination-content">
            <Button
              type="default"
              icon={<ArrowDownOutlined />}
              size="large"
              onClick={showMoreCourses}
              loading={isLoadingShowMoreCourses}>
              Показать больше курсов
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
