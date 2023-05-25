import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetSubjectsState, setSemester } from '../../store/subjectsSlice';
import { getSemester } from '../../store/selectors';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarShown, setSidebarShown, sidebarIconRef }) => {
  const sidebarRef = React.useRef();
  const [activeCourse, setActiveCourse] = React.useState(null);
  const activeSemester = useSelector((state) => getSemester(state));
  const href = useLocation().pathname;
  const [isBlockedClick, setIsBlockedClick] = React.useState(isNeedBlock());
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  React.useEffect(() => {
    setIsBlockedClick(isNeedBlock());
    setActiveCourse(null);
    dispatch(setSemester('all'));
  }, [href]);

  // mobile sidebar-burger menu

  React.useEffect(() => {
    if (!isSidebarShown) return;

    const handleClick = (e) => {
      if (e.target.classList == 'sidebar_layout ') setSidebarShown(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isSidebarShown]);

  function isNeedBlock() {
    return href != '/' && href != '/search/' && href != '/admin';
  }

  // dekstop version

  const dispatch = useDispatch();

  const handleClickSemester = (semester) => {
    if (isBlockedClick) return;
    dispatch(setSemester(activeSemester !== semester ? semester : 'all'));
  };

  const handleClickLogo = () => {
    dispatch(resetSubjectsState());
  };

  return (
    <div className={`sidebar_layout ${isSidebarShown ? '' : 'hidden'}`}>
      <div className="sidebar" ref={sidebarRef}>
        <Link to="/" className="sidebar_title" onClick={handleClickLogo}>
          URFU Courses
        </Link>
        <div className="list_courses">
          {listCourses.map((numberCourse) => (
            <CourseBlock
              numberCourse={numberCourse}
              emojy={emojyCourses[numberCourse - 1]}
              isActiveCourse={activeCourse === numberCourse}
              setActiveCourse={isBlockedClick ? () => {} : setActiveCourse}
              numberActiveSemester={activeSemester}
              setActiveSemester={isBlockedClick ? () => {} : handleClickSemester}
              key={numberCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
