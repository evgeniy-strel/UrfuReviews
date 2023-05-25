import React from 'react';
import Track from './track/Track';
import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Modal } from 'antd';

const Tracks = ({ tracks, destiny, setSelectedTrack }) => {
  const [inputTrack, setInputTrack] = React.useState('');

  const configTrack = {
    title: `Трек "${inputTrack}"`,
    content: <>Вы действительно хотите добавить трек с таким названием?</>,
    centered: true,
    onOk: () => console.log('ok'),
    onCancel: () => console.log('cancel'),
  };

  const handleChangeNewCourse = (e) => {
    setInputTrack(e.target.value);
  };

  return (
    <div className={`tracks ${destiny}`}>
      <Search
        placeholder="Название нового трека"
        allowClear
        value={inputTrack}
        onChange={handleChangeNewCourse}
        enterButton={
          <div
            className="enter-button-new"
            onClick={() => {
              Modal.confirm(configTrack);
            }}>
            <p>Добавить</p> <FileAddOutlined />
          </div>
        }
        size="large"
        className="add_new_track"
      />
      {tracks.map((track) => (
        <Track track={track} setSelectedTrack={setSelectedTrack} />
      ))}
    </div>
  );
};

export default Tracks;
