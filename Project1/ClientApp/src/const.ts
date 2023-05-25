export enum destinyTracks {
  MainPage = 'on_main',
  ModalWindow = 'on_modal_window',
  Search = 'on_search',
}

export enum searchFilters {
  Teacher = 'teacher',
  Track = 'track',
}

export enum assessmentTitle {
  Interest = 'Интерес к предмету',
  Benefit = 'Польза от предмета',
  Availability = 'Доступность изложения',
  Rating = 'Общая оценка',
}

export const optionsCourse = [
  { course: 1, semesters: [1, 2] },
  { course: 2, semesters: [3, 4] },
  { course: 3, semesters: [5, 6] },
  { course: 4, semesters: [7, 8] },
];

export const filtersData = {
  teacher: {
    text: 'Преподаватель',
    class: 'select_teacher',
  },
  filters: {
    text: 'Фильтр',
    class: 'select_filters',
    options: {
      rating: 'Общая оценка',
      benefit: 'Полезность',
      time: 'Время',
    },
  },
  courseSemester: {
    text: 'Курс, семестр',
    class: 'select_course_semester',
    options: {
      semester1: '1 курс, 1 семестр',
      semester2: '1 курс, 2 семестр',
      semester3: '2 курс, 3 семестр',
      semester4: '2 курс, 4 семестр',
      semester5: '3 курс, 5 семестр',
      semester6: '3 курс, 6 семестр',
      semester7: '4 курс, 7 семестр',
      semester8: '4 курс, 8 семестр',
    },
  },
  subject: {
    text: 'Предмет',
    class: 'select_subject',
  },
  track: {
    text: 'Трек',
    class: 'select_track',
  },
};

export const statusesLogin = {
  FailSignIn: {
    text: 'При авторизации возникла ошибка. Проверьте, что вы зарегистрированы и ввели корректные данные.',
    img: 'fail_status_img',
  },
  SuccessSignUp: {
    text: 'Регистрация прошла успешно. Теперь вы можете авторизоваться.',
    img: 'success_status_img',
  },
  FailSignUp: {
    text: 'При регистрации возникла ошибка. Попробуйте еще раз или позже.',
    img: 'fail_status_img',
  },
};

export const initCourseValues = {
  semester: '',
  course: '',
  track: '',
  teacher: '',
};

export const initFieldsValues = {
  interest: 0,
  benefit: 0,
  availability: 0,
  rating: 0,
  body: '',
  isMoved: false,
};
