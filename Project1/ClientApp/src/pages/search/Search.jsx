import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../../components/tracks/Tracks';
import { destinyTracks, searchFilters } from '../../const.ts';
import './search.scss';
import {
  getFilterdBySearch,
  getFilteredBy,
  getFilteredTracks,
  getSearchTracks,
  getSemester,
  getTextSearch,
} from './../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { searchTracks } from '../../store/api-actions';
import { resetSearchState, setFilteredBySearch, setTextSearch } from '../../store/searchSlice';

const Search = () => {
  const tracks = useSelector(getSearchTracks);
  const filteredBy = useSelector(getFilterdBySearch);
  const text = useSelector(getTextSearch);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    dispatch(searchTracks({ filteredBy, text }));
  }, [text, filteredBy]);

  React.useEffect(() => {
    const textParams = searchParams.get('text');
    const filteredByParams = searchParams.get('filteredBy');

    console.log(textParams, filteredByParams);

    dispatch(setTextSearch(textParams));
    dispatch(setFilteredBySearch(filteredByParams));
  }, []);

  const handleFilter = (filteredBy) => {
    setSearchParams({ text: searchParams.get('text'), filteredBy });
    dispatch(setFilteredBySearch(filteredBy));
  };

  const handleTeacherFilter = () => handleFilter(searchFilters.Teacher);
  const handleTrackFilter = () => handleFilter(searchFilters.Track);

  const resetSearch = () => {
    dispatch(resetSearchState());
  };

  return (
    <div className="search_page">
      <div className="search_tracks_container">
        <div className="search_title">
          Список всех найденных треков с{' '}
          {filteredBy == searchFilters.Teacher ? 'преподавателем' : 'названием'} {`"${text}"`}
        </div>
        <Row
          gutter={[
            { md: 24, xs: 16 },
            { md: 24, xs: 16 },
          ]}
          className="tracks_and_filters">
          <Col lg={16} md={16} sm={24} xs={24}>
            <Tracks tracks={tracks} destiny={destinyTracks.Search} />
          </Col>
          <Col lg={8} md={8} sm={8} xs={12}>
            <div className="tracks_filters">
              <p className="filters_title">Фильтры</p>
              <p className="filters_description">Выполнять поиск по:</p>
              <div className="filters">
                <span
                  className={`filter_teacher ${
                    searchFilters.Teacher == filteredBy ? 'active_filter' : ''
                  }`}
                  onClick={handleTeacherFilter}>
                  преподавателю
                </span>
                <span
                  className={`filter_track ${
                    searchFilters.Track == filteredBy ? 'active_filter' : ''
                  }`}
                  onClick={handleTrackFilter}>
                  треку
                </span>
              </div>
              <Link to="/" className="reset_filters" onClick={resetSearch}>
                Сбросить поиск
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Search;
