import React from 'react';
import './review.scss';
import { Avatar } from 'antd';

const Review = ({ review, teacher }) => {
  const dateTime = new Date(review.addedDate);
  return (
    <div className="review">
      <div className="header_review">
        <div className="header_id_date">
          <div className="id">
            <Avatar size="large" className="id-avatar">
              A
            </Avatar>
            аноним
          </div>
          <div className="date">
            {review.isMoved
              ? 'перенесен из гугл таблиц'
              : `${dateTime?.getDate()}.${dateTime?.getMonth() + 1}.${dateTime?.getFullYear()}`}
          </div>
        </div>
        <div className="header_rates">
          <div className="general_assessment">
            <div className="assessment_text">Общая оценка:</div>
            <div className="stars">
              <div className={`star ${review.rating >= 1 ? 'active' : ''}`}></div>
              <div className={`star ${review.rating >= 2 ? 'active' : ''}`}></div>
              <div className={`star ${review.rating >= 3 ? 'active' : ''}`}></div>
              <div className={`star ${review.rating >= 4 ? 'active' : ''}`}></div>
              <div className={`star ${review.rating >= 5 ? 'active' : ''}`}></div>
            </div>
          </div>
          <div className="criterias">
            <div className="criteria">Интерес к предмету: {review.interest}</div>
            <div className="criteria">Польза от предмета: {review.benefit}</div>
            <div className="criteria">Доступность изложения: {review.availability}</div>
          </div>
        </div>
        <div className="header_teacher">
          <div className="teacher">
            <span className="teacher_text">Преподаватель: </span>{' '}
            <span className="teacher_name">{teacher}</span>
          </div>
        </div>
      </div>
      <div className="text_review">
        {/* <p className="text_review_title">Достоинства</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro est et commodi enim ratione
          neque maxime quo laudantium aut dignissimos, quasi sunt molestiae rem, repudiandae ipsam
          facere tempora reiciendis corporis?
        </p>
        <p className="text_review_title">Недостатки</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim laudantium iure dolor
          ipsam, dolores error quas consectetur quasi rerum doloremque sed aut sapiente ea eius quos
          voluptate placeat harum tempora!
        </p> */}
        <p className="text_review_title">Комментарий</p>
        <p>{review.body}</p>
      </div>
      <div className="review_ratings_flex">
        <div className="review_ratings">
          <div className="like_button"></div>
          <div className="rating_value">0</div>
          <div className="dislike_button"></div>
        </div>
      </div>
    </div>
  );
};

export default Review;
