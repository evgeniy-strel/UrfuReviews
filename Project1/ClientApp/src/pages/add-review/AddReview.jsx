import React from 'react';
import './AddReview.scss';
import { assessmentTitle, initCourseValues, initFieldsValues } from '../../const.ts';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import FiltersAddReview from '../../components/reviews/filters/filters-add-review/FiltersAddReview';
import CircleProgress from '../../components/reviews/circle-progress/CircleProgress';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewAction, addSubjects, fetchSubjects } from '../../store/api-actions';
import { Col, Modal, Row, message } from 'antd';
import { getIsAuthUser, getSemester, getSubjects } from './../../store/selectors';

const AddReview = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthUser);
  const navigate = useNavigate();
  const semester = useSelector((state) => getSemester(state));

  React.useEffect(() => {
    dispatch(fetchSubjects({ semester }));
  }, [semester]);

  const [courseValues, setCourseValues] = React.useState(initCourseValues);
  const [fieldsValues, setFieldsValues] = React.useState(initFieldsValues);

  const handleChangeFieldStars = (fieldTitle, value) => {
    let field = Object.keys(assessmentTitle).find((title) => assessmentTitle[title] === fieldTitle);
    field = field[0].toLowerCase() + field.slice(1);
    setFieldsValues((prev) => ({ ...prev, [field]: value }));
  };

  const changeTextField = (e) => {
    setFieldsValues((prev) => ({ ...prev, body: e.target.value }));
  };

  const isFieldCorrect = (value) => {
    return (
      (Number.isInteger(value) && value !== 0) ||
      (typeof value === 'string' && value.length >= 30 && value.length <= 1000)
    );
  };

  const getCountCheckedFields = () => {
    return Object.values(fieldsValues).filter((value) => isFieldCorrect(value)).length;
  };

  const [_, contextHolder] = message.useMessage();
  const error = () => {
    Modal.error({
      content: 'Возникла ошибка при добавлении отзыва. Попробуйте еще раз.',
      className: 'modal-my-class',
    });
  };
  const success = () => {
    Modal.success({
      content: 'Отзыв был успешно добавлен. Вы будете перенаправлены на страницу с треком.',
      className: 'modal-my-class',
      onOk: () => navigate(`/track/${courseValues.track.id}`),
    });
  };

  const addReview = async () => {
    const result = await dispatch(
      addReviewAction({ ...fieldsValues, prepodId: courseValues.teacher.id }),
    );
    if (result?.error) {
      error();
    } else {
      success();
    }
  };

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <>
      {contextHolder}
      <div className="add_review_page">
        <p className="add_review_title">Страница добавления отзыва</p>
        <FiltersAddReview courseValues={courseValues} setCourseValues={setCourseValues} />
        <div className="hr_add_review"></div>
        <Row className="blocks">
          <Col lg={16} md={16} xs={24}>
            <div className="left_block">
              <div className="assessments_blocks">
                <Assessment
                  title={assessmentTitle.Interest}
                  onChangeField={handleChangeFieldStars}
                />
                <Assessment
                  title={assessmentTitle.Benefit}
                  onChangeField={handleChangeFieldStars}
                />
                <Assessment
                  title={assessmentTitle.Availability}
                  onChangeField={handleChangeFieldStars}
                />
                <Assessment title={assessmentTitle.Rating} onChangeField={handleChangeFieldStars} />
              </div>
              <p className="add_review_comment_text">Ваш комментарий</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => changeTextField(e)}></textarea>
              <button disabled={getCountCheckedFields() !== 5} onClick={addReview}>
                <span>Добавить отзыв</span>
                <img src="/img/add_review_icon.png" width={24} height={24} alt="add" />
              </button>
            </div>
          </Col>
          <Col lg="auto" md="auto" sm="auto" xs="auto">
            <div className="right_block">
              <div className="right_block_info">
                <CircleProgress countChecked={getCountCheckedFields()} />
                <div className="right_block_info_title">
                  Чтобы отзыв был максимально полезен, заполните все поля:
                </div>
                <div className="right_block_info_criterias">
                  <ul>
                    <li className={`${fieldsValues.interest ? 'checked_li' : ''}`}>
                      Интерес к предмету
                    </li>
                    <li className={`${fieldsValues.benefit ? 'checked_li' : ''}`}>
                      Польза от предмета
                    </li>
                    <li className={`${fieldsValues.availability ? 'checked_li' : ''}`}>
                      Доступность изложения
                    </li>
                    <li className={`${fieldsValues.rating ? 'checked_li' : ''}`}>Общая оценка</li>
                    <li className={`${isFieldCorrect(fieldsValues.body) ? 'checked_li' : ''}`}>
                      Отзыв(от 30 до 1000 символов)
                    </li>
                  </ul>
                </div>
                <div className="right_block_info_anon_text">Отзыв будет добавлен анонимно.</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddReview;
