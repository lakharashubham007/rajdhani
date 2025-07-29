import React from 'react';
import { FaStopCircle } from 'react-icons/fa';
import moment from 'moment';

const StopCardComponent = ({ stoppedAt, stoppedBy }) => {
  return (
    <div
      style={{
        border: '1px solid #dc3545',
        backgroundColor: '#fdecea',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 3px 8px rgba(220, 53, 69, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '20px 0',
      }}
    >
      <div>
        <h5 style={{ color: '#dc3545', fontWeight: 600, marginBottom: '8px' }}>
          🛑 Production Stopped
        </h5>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Stopped on:&nbsp;
          <strong>{stoppedAt ? moment(stoppedAt).format("DD MMM YYYY, hh:mm A") : 'N/A'}</strong>
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Stopped by:&nbsp;<strong>{stoppedBy || 'System'}</strong>
        </p>
      </div>

      <div>
        <FaStopCircle
          title="Production Stopped"
          style={{
            fontSize: '34px',
            color: '#dc3545',
            cursor: 'not-allowed',
            marginLeft: '20px',
          }}
        />
      </div>
    </div>
  );
};

export default StopCardComponent;
