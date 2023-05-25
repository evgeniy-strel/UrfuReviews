import React from 'react';
import './AdminAddData.scss';
import { Alert, Button, Col, Dropdown, Modal, Row, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CourseColumnView from './../../../components/admin-panel/course-column-view/CourseColumnView';
import {
  ArrowDownOutlined,
  DeleteFilled,
  EditFilled,
  FolderAddOutlined,
  FormOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import {
  getCountSubjects,
  getIsLoadingShowMoreCourses,
  getLimitSubjects,
  getSemester,
  getSubjects,
} from '../../../store/selectors';
import { addCourse, fetchCountSubjects, fetchSubjects } from '../../../store/api-actions';
import { addLimitSubjects } from '../../../store/subjectsSlice';
import { filtersData, optionsCourse } from '../../../const.ts';

const AdminAddData = () => {
  const dispatch = useDispatch();
  const semester = useSelector(getSemester);
  const courses = useSelector(getSubjects);
  const countCourses = useSelector(getCountSubjects);
  const isLoadingShowMoreCourses = useSelector(getIsLoadingShowMoreCourses);
  const limit = useSelector(getLimitSubjects);

  const [inputCourse, setInputCourse] = React.useState('');
  const [isCheckedCourseNotExist, setIsCheckedCourseNotExist] = React.useState(false);

  const [inputTeacher, setInputTeacher] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState();
  const [selectedTrack, setSelectedTrack] = React.useState();

  React.useEffect(() => {
    dispatch(fetchSubjects({ limit, semester }));
  }, [semester, limit]);

  React.useEffect(() => {
    dispatch(fetchCountSubjects({ semester }));
  }, [semester]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleChangeNewCourse = (e) => {
    setInputCourse(e.target.value);
  };

  const handleChangeNewTeacher = (e) => {
    setInputTeacher(e.target.value);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Действие было успешно выполнено',
    });
  };

  const addNewCourse = () => {
    dispatch(addCourse({ name: inputCourse, semester }));
    success();
  };

  const semesters = filtersData.courseSemester.options;
  const [semesterItems, setSemesterItems] = React.useState([]);

  const configCourse = {
    title: (
      <>
        Курс "{inputCourse}"
        <br />
        {semesterItems.join(', ')}
      </>
    ),
    content: <>Вы действительно хотите добавить курс с таким названием?</>,
    centered: true,
    onOk: addNewCourse,
  };

  const configTeacher = {
    title: `Преподаватель "${inputTeacher}"`,
    content: <>Вы действительно хотите добавить преподавателя с таким ФИО?</>,
    centered: true,
    onOk: success,
  };

  const itemsEdit = [
    {
      label: (
        <>
          <span className="item-dropdown">Переименовать</span>
          <EditFilled />
        </>
      ),
      key: '0',
    },
    {
      label: (
        <>
          <span className="item-dropdown">Удалить</span>
          <DeleteFilled />
        </>
      ),
      key: '1',
    },
  ];

  const showMoreCourses = () => {
    dispatch(addLimitSubjects());
  };

  const isShowButtonShowMore = () => countCourses > limit;

  console.log(semesterItems);

  return (
    <>
      {contextHolder}
      <Row gutter={{ lg: 35, md: 25, sm: 15 }}>
        <Col sm={24} md={14} lg={14}>
          <div className="courses_column_view">
            <Alert
              message={
                <p className="alert-message-new-data">
                  Правила добавления данных в БД:
                  <br />
                  1) Проверь, что по текущему названию ничего нет.
                  <br />
                  2) Скопируй название из Modeus.
                </p>
              }
              banner
              closable
              className="alert-new-data"
            />
            <div className="semester-search">
              <Select
                defaultValue="lucy"
                mode="multiple"
                className="semester"
                placeholder="Семестры нового курса"
                style={{ width: 200 }}
                value={semesterItems}
                onChange={setSemesterItems}
                options={optionsCourse.map((option) => ({
                  label: `${option.course} курс`,
                  options: option.semesters.map((semester) => {
                    const value = `${semester} семестр`;
                    return { label: value, value };
                  }),
                }))}
              />
              {/* <Select
                className="semester"
                mode="multiple"
                placeholder="Семестры нового курса"
                value={semesterItems}
                onChange={setSemesterItems}
                style={{ width: '100%' }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              /> */}
              <Search
                placeholder="Название нового курса"
                allowClear
                enterButton={
                  <div
                    className="enter-button-new"
                    onClick={() => {
                      Modal.confirm(configCourse);
                    }}>
                    <p>{isCheckedCourseNotExist ? 'Добавить' : 'Проверить'}</p>{' '}
                    <FolderAddOutlined />
                  </div>
                }
                value={inputCourse}
                onChange={handleChangeNewCourse}
                size="large"
                className="add_new_course"
              />
            </div>

            {courses.map((course) => (
              <CourseColumnView
                course={course}
                selectedCourse={selectedCourse}
                setSelectedCourse={handleSelectCourse}
                setSelectedTrack={handleSelectTrack}
                key={course.id}
              />
            ))}
          </div>
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
        </Col>
        <Col sm={0} md={10} lg={10} className="info_about_course_grid">
          {selectedCourse && selectedTrack && (
            <div className="info_about_course">
              <p className="title">
                <span className="title_up">
                  Преподаватели на треке:
                  <br />
                </span>{' '}
                <span className="track-name">{selectedTrack?.trackName}</span>
              </p>
              <Search
                placeholder="ФИО нового преподавателя"
                allowClear
                enterButton={
                  <div
                    className="enter-button-new"
                    onClick={() => {
                      Modal.confirm(configTeacher);
                    }}>
                    <p>Добавить</p> <UserAddOutlined />
                  </div>
                }
                value={inputTeacher}
                onChange={handleChangeNewTeacher}
                size="large"
                className="add_new_prepod"
              />
              {selectedTrack.prepods
                .map((prepod) => prepod.prepodName)
                .map((prepodName) => (
                  <div className="prepod-block-name">
                    <p className="prepod-name">{prepodName}</p>
                    <div className="icons-block">
                      <Dropdown
                        menu={{ items: itemsEdit }}
                        placement="bottomRight"
                        trigger={['click']}>
                        <FormOutlined />
                      </Dropdown>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminAddData;
