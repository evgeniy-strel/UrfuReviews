import { searchFilters } from '../const.ts';

export const getSubjects = (state) => state.subjects.subjects;

export const getSemester = (state) => state.subjects.semester;

export const getTrack = (state) => state.track.track;

export const getTeacher = (state) => state.track.teacher;

export const getReviews = (state) => state.track.reviews;

export const getLimitReviews = (state) => state.track.limit;

export const getCountSubjects = (state) => state.subjects.count;

export const getLimitSubjects = (state) => state.subjects.limit;

export const getIsAuthUser = (state) => Boolean(state.user.user);

export const getIsLoadingShowMoreReviews = (state) =>
  state.general.isLoading.track.reviews.showMore;

export const getIsLoadingShowMoreCourses = (state) => state.general.isLoading.subjects.showMore;

export const getIsLoadingStatus = (state) => {
  const isLoading = JSON.parse(JSON.stringify(state.general.isLoading));
  //console.log(JSON.stringify(state.general.isLoading));
  delete isLoading.track.reviews.showMore;
  delete isLoading.subjects.showMore;

  const values = getValues(isLoading);

  // функция по получению всех значений объекта(в том числе вложенных)
  function getValues(object, array = []) {
    const objValues = Object.values(object);

    for (let elem of objValues) {
      if (typeof elem === 'object') {
        getValues(elem, array);
        continue;
      }

      array.push(elem);
    }

    return array;
  }

  return values.some((value) => value);
};

export const getSearchTracks = (state) => state.search.tracks;

export const getTextSearch = (state) => state.search.text;

export const getFilterdBySearch = (state) => state.search.filteredBy;
