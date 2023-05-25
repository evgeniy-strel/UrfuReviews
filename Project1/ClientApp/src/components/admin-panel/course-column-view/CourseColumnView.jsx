import React from 'react';
import { destinyTracks } from '../../../const.ts';
import './course_column_view.scss';
import Tracks from '../tracks/Tracks.jsx';
import { DeleteFilled, EditFilled, FormOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const CourseColumnView = ({ course, selectedCourse, setSelectedCourse, setSelectedTrack }) => {
  const handleClickArrow = () => {
    setSelectedCourse((prevCourse) => (prevCourse?.id === course?.id ? undefined : course));
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

  return (
    <div
      className={`course_column_view ${selectedCourse == course ? 'show_tracks' : ''}`}
      key={course.id}>
      <div className="course_container">
        <div className="course_column" onClick={handleClickArrow}>
          <p className="title">{course.subjectName}</p>
          <div className="icons">
            <img src="img/arrow-bottom.svg" alt="show tracks" />
            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
              <Dropdown menu={{ items: itemsEdit }} placement="bottomRight" trigger={['click']}>
                <FormOutlined />
              </Dropdown>
            </div>
          </div>
        </div>
        {selectedCourse?.id == course?.id && (
          <Tracks
            tracks={course.tracks}
            destiny={destinyTracks.MainPage}
            setSelectedTrack={setSelectedTrack}
          />
        )}
      </div>
    </div>
  );
};

export default CourseColumnView;
