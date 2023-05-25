import React from 'react';
import { Link } from 'react-router-dom';
import './../../../tracks/track/track.scss';
import './track.scss';
import { DeleteFilled, EditFilled, FormOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const Track = ({ track, setSelectedTrack }) => {
  const handleClickTrack = (e) => {
    setSelectedTrack(track);
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
    <div className="track_for_course track_admin_panel" onClick={handleClickTrack}>
      <div className="left">
        <p className="title">{track.trackName}</p>
      </div>
      <div className="right" onClick={(e) => e.stopPropagation()}>
        <Dropdown menu={{ items: itemsEdit }} placement="bottomRight" trigger={['click']}>
          <FormOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

export default Track;
