import React from 'react';
import './track.scss';
import Criteria from '../../components/reviews/criteria/Criteria';
import Review from '../../components/reviews/review/Review';
import Rate from '../../components/reviews/rate/Rate';
import Filters from '../../components/reviews/filters/filters-track-page/FiltersTrackPage';
import AddReviewBtn from '../../components/reviews/add-review-btn/AddReviewBtn';
import Circle from '../../components/reviews/circle-rating/CircleRating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getIsLoadingShowMoreReviews,
  getIsLoadingStatus,
  getLimitReviews,
  getReviews,
  getTeacher,
  getTrack,
} from './../../store/selectors';
import { addLimitReviews, resetTrack, setTrack } from '../../store/trackSlice';
import { fetchReviews, fetchTrack, fetchTrackInfo } from '../../store/api-actions';
import { getCountReviewsTrack, getValuesTrack } from '../../components/usefulMethods/usefulMethods';
import { ArrowDownOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { setSubjects } from '../../store/subjectsSlice';
import { Button, Pagination } from 'antd';

export default function Track() {
  const dispatch = useDispatch();
  const id = useParams().id || -1;
  const track = useSelector(getTrack);
  const reviews = useSelector(getReviews);
  const teacher = useSelector(getTeacher);
  const isLoadingShowMoreReviews = useSelector(getIsLoadingShowMoreReviews);
  const limit = useSelector(getLimitReviews);

  const [valuesTrack, setValuesTrack] = React.useState();

  React.useEffect(() => {
    if (id !== -1) {
      dispatch(fetchTrack({ id }));
    }

    return () => dispatch(resetTrack());
  }, [id]);

  React.useEffect(() => {
    if (id !== -1) {
      dispatch(fetchReviews({ trackId: id, limit, teacherId: teacher?.id }));
    }
  }, [id, limit, teacher]);

  React.useEffect(() => {
    setValuesTrack(getValuesTrack(track));
  }, [track]);

  const getNameTeacherReview = (review) => {
    if (!track) return;

    return track.prepods.find((prepod) => prepod.id == review.prepodId)?.prepodName;
  };

  const showMoreReviews = () => {
    dispatch(addLimitReviews());
  };

  const isShowButtonShowMore = () => {
    if (teacher) {
      return teacher.values.countReviews > limit;
    }

    return getCountReviewsTrack(track) > limit;
  };

  if (!track || reviews.length == 0 || !valuesTrack) return <></>;

  return (
    <>
      <div className="course_title_container">
        <p className="course_title">{track?.trackName}</p>
        <div className="course_view">
          <div className="circle_big">
            <Circle valuesTrack={valuesTrack} />
          </div>

          <Rate valuesTrack={valuesTrack} />
          <Criteria valuesTrack={valuesTrack} />
        </div>

        <div className="filters_and_button">
          <Filters teachers={track?.prepods} setValuesTrack={setValuesTrack} />
          <AddReviewBtn />
        </div>

        <div className="reviews">
          {reviews.map((review, index) => (
            <Review key={review.id} teacher={getNameTeacherReview(review)} review={review} />
          ))}
        </div>

        {(isShowButtonShowMore() || isLoadingShowMoreReviews) && (
          <div className="pagination">
            <div className="pagination-content2">
              <Button
                type="primary"
                icon={<ArrowDownOutlined />}
                size="large"
                loading={isLoadingShowMoreReviews}
                onClick={showMoreReviews}>
                Показать больше отзывов
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
