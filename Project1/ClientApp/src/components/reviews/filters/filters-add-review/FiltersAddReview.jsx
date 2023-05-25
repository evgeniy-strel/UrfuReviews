import React from 'react';
import { filtersData, initCourseValues } from '../../../../const.ts';
import Filter from '../filters-track-page/filter/Filter';
import './filters_add_review.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjects } from '../../../../store/selectors.js';
import { setSemester } from '../../../../store/subjectsSlice.js';

const FiltersAddReview = ({ courseValues, setCourseValues }) => {
  const subjects = useSelector((state) => getSubjects(state));
  const dispatch = useDispatch();

  // handle changes courseValues

  const handleChangeSemester = (value) => {
    const semester = Number(value.split(',')[1][1]);
    dispatch(setSemester(semester));
    setCourseValues((prevValue) => ({ ...initCourseValues, semester }));
  };

  const handleChangeCourse = (value) => {
    const course = subjects.find((subject) => subject.subjectName === value);
    setCourseValues((prev) => ({ ...prev, course, track: '', teacher: '' }));
  };

  const handleChangeTrack = (value) => {
    const track = courseValues.course.tracks.find((track) => track.trackName === value);
    setCourseValues((prev) => ({ ...prev, track, teacher: '' }));
  };

  const handleChangeTeacher = (value) => {
    const teacher = courseValues.track.prepods.find((teacher) => teacher.prepodName === value);
    setCourseValues((prev) => ({ ...prev, teacher }));
  };

  const filteredNameCourses = subjects.map((course) => course.subjectName);

  const filteredNameTracks = courseValues?.course
    ? courseValues.course.tracks.map((track) => track.trackName)
    : [];

  const filteredNameTeachers = courseValues?.track
    ? courseValues.track.prepods.map((teacher) => teacher.prepodName)
    : [];

  const getSemesterText = () => {
    return Object.values(filtersData.courseSemester.options).find(
      (semester) => Number(semester.split(',')[1][1]) == courseValues.semester,
    );
  };

  return (
    <div className="filters_add_review">
      <Filter
        filterData={filtersData.courseSemester}
        onClick={handleChangeSemester}
        activeValue={getSemesterText()}
      />
      <Filter
        filterData={filtersData.subject}
        onClick={handleChangeCourse}
        options={filteredNameCourses}
        activeValue={courseValues?.course?.subjectName}
        isBlocked={!Boolean(courseValues?.semester)}
      />
      <Filter
        filterData={filtersData.track}
        onClick={handleChangeTrack}
        options={filteredNameTracks}
        activeValue={courseValues?.track?.trackName}
        isBlocked={!Boolean(courseValues?.course)}
      />
      <Filter
        filterData={filtersData.teacher}
        onClick={handleChangeTeacher}
        options={filteredNameTeachers}
        activeValue={courseValues?.teacher?.prepodName}
        isBlocked={!Boolean(courseValues?.track)}
      />
    </div>
  );
};

export default FiltersAddReview;
