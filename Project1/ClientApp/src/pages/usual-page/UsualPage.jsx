import React, { useRef } from 'react';
import Main from '../../pages/main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/header/Header';
import AddReview from '../../pages/add-review/AddReview';
import Search from '../../pages/search/Search';
import Sidebar from '../../components/sidebar/Sidebar';
import Track from '../../pages/track/Track';
import { Col, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { getIsLoadingStatus } from '../../store/selectors';
import AdminPanel from '../admin-panel/AdminPanel';

const UsualPage = () => {
  const [isSidebarShown, setSidebarShown] = React.useState(false);
  const sidebarIconRef = useRef(null);
  const isLoading = useSelector((state) => getIsLoadingStatus(state));

  return (
    <Row className="wrapper">
      <div className={`loading-block ${isLoading ? 'loading-true' : ''}`}>
        <div className="loading-content">
          <Spin tip="Идет загрузка..." size="large"></Spin>
        </div>
      </div>
      <Col flex={'240px'} className="sidebar-grid">
        <Sidebar
          isSidebarShown={isSidebarShown}
          setSidebarShown={setSidebarShown}
          sidebarIconRef={sidebarIconRef}
        />
      </Col>
      <Col flex={'auto'}>
        <div className="container">
          <Header
            isSidebarShown={isSidebarShown}
            setSidebarShown={setSidebarShown}
            sidebarIconRef={sidebarIconRef}
          />
          <div className="main_container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Search />}></Route>
              <Route path="/track/:id" element={<Track />} />
              <Route path="/add_review/" element={<AddReview />} />
            </Routes>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default UsualPage;
