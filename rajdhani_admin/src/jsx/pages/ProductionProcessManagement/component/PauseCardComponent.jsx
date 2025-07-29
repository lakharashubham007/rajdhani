import React from 'react';
import { FaPauseCircle } from 'react-icons/fa';
import moment from 'moment';

const PauseCardComponent = ({ pausedAt, pausedBy, onPauseClick }) => {
  return (
    <div
      style={{
        border: '1px solid #ffc107',
        backgroundColor: '#fff8e1',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '20px 0',
      }}
    >
      <div>
        <h5 style={{ color: '#ff9800', fontWeight: 600, marginBottom: '8px' }}>
          ⏸️ Production Paused
        </h5>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Paused on:&nbsp;
          <strong>{pausedAt ? moment(pausedAt).format("DD MMM YYYY, hh:mm A") : 'N/A'}</strong>
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Paused by:&nbsp;<strong>{pausedBy || 'System'}</strong>
        </p>
      </div>

      <button
        onClick={onPauseClick}
        style={{
          background: 'none',
          border: 'none',
          color: '#ff9800',
          cursor: 'pointer',
          fontSize: '50px',
        }}
        title="Pause Options"
      >
        <FaPauseCircle />
      </button>
    </div>
  );
};

export default PauseCardComponent;
