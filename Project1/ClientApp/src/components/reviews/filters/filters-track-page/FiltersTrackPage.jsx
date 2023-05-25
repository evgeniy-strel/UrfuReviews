import React from 'react';
import Filter from './filter/Filter';
import { filtersData } from '../../../../const.ts';
import { useDispatch } from 'react-redux';
import { setTeacher } from '../../../../store/trackSlice';

const FiltersTrackPage = ({ teachers, setValuesTrack }) => {
  const dispatch = useDispatch();

  const handleClickTeacher = (textValue) => {
    const teacherObj = teachers.find((teacher) => teacher.prepodName === textValue);
    dispatch(setTeacher(teacherObj));
    setValuesTrack(teacherObj.values);
  };

  const handleClickFilter = (value) => {
    // to do: filter by
    // dispatch(setFilteredTrackBy(value));
  };

  return (
    <>
      <Filter
        filterData={filtersData.teacher}
        options={teachers.map((teacher) => teacher.prepodName)}
        onClick={handleClickTeacher}
      />
      <Filter filterData={filtersData.filters} onClick={handleClickFilter} />
    </>
  );
};

export default FiltersTrackPage;
