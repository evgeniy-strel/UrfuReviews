import React from 'react';
import './criteria.scss';
import CriteriaProgress from './criteria-progress/CriteriaProgress';

export default function Criteria({ valuesTrack }) {
  return (
    <div className="criteria_list">
      <div className="criteria">
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Интерес к предмету</span> <span className="value">{valuesTrack.avgInterest}</span>
          </p>
          <CriteriaProgress value={valuesTrack.avgInterest} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Польза от предмета</span> <span className="value">{valuesTrack.avgBenefit}</span>
          </p>
          <CriteriaProgress value={valuesTrack.avgBenefit} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Доступность изложения</span>{' '}
            <span className="value">{valuesTrack.avgAvailability}</span>
          </p>
          <CriteriaProgress value={valuesTrack.avgAvailability} />
        </div>
      </div>
    </div>
  );
}
