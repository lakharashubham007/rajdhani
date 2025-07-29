// ProductionStepsProgressAnalytics
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';

const ProductionStepsProgressAnalytics = () => {
  const analytics = useSelector((state) => state?.productionProcess?.items);

  const getProgress = (stageAnalytics) => {
    const total = stageAnalytics?.totalSheetQuantity || 0;
    const completed = stageAnalytics?.totalCompletedQuantity || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const cuttingProgress = getProgress(analytics?.hoseCuttingStageAnalytics);
  const skivingProgress = getProgress(analytics?.skivingStageAnalytics);
  const preAssemblyProgress = getProgress(analytics?.preAssemblyStageAnalytics);
  const crimpingProgress = getProgress(analytics?.crimpingStageAnalytics);
  const testingProgress = getProgress(analytics?.testingStageAnalytics);
  // const packingProgress = getProgress(analytics?.packingStageAnalytics);

  const steps = [
    { title: 'Hose Cutting', progress: cuttingProgress, color: '#3B82F6' },   // Blue
    { title: 'Skiving', progress: skivingProgress, color: '#F59E0B' },        // Amber
    { title: 'Pre-assembly', progress: preAssemblyProgress, color: '#10B981' },   // Green
    { title: 'Crimping', progress: crimpingProgress, color: '#EF4444' },       // Red
    { title: 'Testing', progress: testingProgress, color: '#8B5CF6' },        // Purple
    // { title: 'Packing', progress: packingProgress, color: '#EC4899' },       // Pink
  ];


  return (
    <div style={{ backgroundColor: '#fff', marginBottom: '25px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap', // allows wrapping on small screens
          gap: '16px',
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              padding: '10px 16px',
              width: '190px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
              }}
            >
              {step.title}
            </span>
            <div
              style={{
                width: 40,
                height: 40,
              }}
            >
              <CircularProgressbar
                value={step.progress}
                text={`${step.progress}%`}
                styles={buildStyles({
                  textSize: '28px',
                  textColor: '#1E3A8A',
                  pathColor: step.color,
                  trailColor: '#e0e0e0',
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionStepsProgressAnalytics;
