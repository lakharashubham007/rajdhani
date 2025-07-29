// import React from 'react'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const HomepageAnalytics = ({ progress = 88 }) => {
//     return (
//         <div>
//             <div className="row mb-1 text-center">
//                 {[
//                     {
//                         process: 'Progress',
//                         progress: 50,
//                         totalTime: '1h 20m',
//                         pending: 'Skiving, Crimping',
//                         estimated: '2h',
//                     },
//                     {
//                         process: 'Skiving',
//                         progress: 30,
//                         totalTime: '45m',
//                         pending: 'Pre-Assembly',
//                         estimated: '1h 30m',
//                     },
//                     {
//                         process: 'Pre-Assembly',
//                         progress: 60,
//                         totalTime: '1h',
//                         pending: 'Crimping, Testing',
//                         estimated: '2h 15m',
//                     },
//                     {
//                         process: 'Crimping',
//                         progress: 80,
//                         totalTime: '50m',
//                         pending: 'Testing',
//                         estimated: '1h 5m',
//                     },
//                     {
//                         process: 'Testing',
//                         progress: 90,
//                         totalTime: '30m',
//                         pending: 'None',
//                         estimated: '30m',
//                     },
//                 ].map((item, index) => (
//                     <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
//                         <div className="card shadow-sm rounded-3 border-0">
//                             <div className="card-body p-3">
//                                 <h6 className="text-uppercase fw-bold mb-1">{item.process}</h6>
//                                 <div className="fs-3 text-primary fw-bold mb-2">{item.progress}%</div>
//                                 <div className="text-muted small">Total Time: {item.totalTime}</div>
//                                 <div className="text-muted small">Pending: {item.pending}</div>
//                                 <div className="text-muted small">Est. Time: {item.estimated}</div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#f5f5f5',
//                     borderRadius: '12px',
//                     padding: '10px 16px',
//                     width: '220px',
//                     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
//                 }}
//             >
//                 <span
//                     style={{
//                         fontSize: '14px',
//                         fontWeight: '600',
//                         color: '#333',
//                     }}
//                 >
//                     Hose Cutting
//                 </span>
//                 <div
//                     style={{
//                         width: 40,
//                         height: 40,
//                     }}
//                 >
//                     <CircularProgressbar
//                         value={progress}
//                         text={`${progress}%`}
//                         styles={buildStyles({
//                             textSize: '28px',
//                             textColor: '#1E3A8A',
//                             pathColor: '#3B82F6',
//                             trailColor: '#e0e0e0',
//                         })}
//                     />
//                 </div>
//             </div> */}

//         </div>
//     )
// }

// export default HomepageAnalytics


import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const AnalyticsCard = ({ title, progress, color }) => {
  return (
    <div
      style={{
        width: '220px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        margin: '10px',
      }}
    >
      <h3
        style={{
          fontSize: '14px',
          marginBottom: '8px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        {title}
      </h3>

      <ProgressBar
        completed={progress}
        bgColor={color}
        height="10px"
        isLabelVisible={false}
        borderRadius="8px"
        baseBgColor="#e0e0e0"
        animateOnRender
      />

      <p
        style={{
          fontSize: '12px',
          marginTop: '8px',
          color: '#555',
        }}
      >
        Overall Progress: {progress}%
      </p>
    </div>
  );
};

const ProgressAnalytics = () => {
  const steps = [
    { title: 'Hose Cutting', progress: 70, color: '#3B82F6' },
    { title: 'Skiving', progress: 50, color: '#F59E0B' },
    { title: 'Pre-assembly', progress: 30, color: '#10B981' },
    { title: 'Crimping', progress: 90, color: '#EF4444' },
    { title: 'Testing', progress: 60, color: '#8B5CF6' },
    { title: 'Packing', progress: 100, color: '#EC4899' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '30px',
        backgroundColor: '#fff',
      }}
    >
      {steps.map((step, index) => (
        <AnalyticsCard
          key={index}
          title={step.title}
          progress={step.progress}
          color={step.color}
        />
      ))}
    </div>
  );
};

export default ProgressAnalytics;
