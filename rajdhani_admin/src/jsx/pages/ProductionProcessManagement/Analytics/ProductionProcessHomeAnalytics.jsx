import React from 'react';
import { useSelector } from 'react-redux';

const ProductionProcessHomeAnalytics = () => {
    const analytics = useSelector((state) => state?.productionProcess?.items);
    const producitonProcess = useSelector((state) => state?.productionProcess?.data?.data);
    console.log("analytics", producitonProcess)

    const getProgress = (stageAnalytics) => {
        const total = stageAnalytics?.totalSheetQuantity || 0;
        const completed = stageAnalytics?.totalCompletedQuantity || 0;
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    const stages = [
        { title: 'Hose Cutting', progress: getProgress(analytics?.hoseCuttingStageAnalytics) },
        { title: 'Skiving', progress: getProgress(analytics?.skivingStageAnalytics) },
        { title: 'Pre-assembly', progress: getProgress(analytics?.preAssemblyStageAnalytics) },
        { title: 'Crimping', progress: getProgress(analytics?.crimpingStageAnalytics) },
        { title: 'Testing', progress: getProgress(analytics?.testingStageAnalytics) },
        // { title: 'Packing', progress: getProgress(analytics?.packingStageAnalytics) }
    ];

    const overallProgress = Math.round(
        stages.reduce((acc, stage) => acc + stage.progress, 0) / stages.length
    );

    //   const completedStages = stages?.filter((s) => s.progress === 100).length;
    const stageKeys = ['hose_cutting', 'skiving', 'pre_assembly', 'crimping', 'testing', 'packing'];

    const completedStages = stageKeys?.filter((key) => producitonProcess?.[key]?.status === 'Completed').length;
    const pendingStages = stages.length - completedStages;

    const cards = [
        { title: 'Progress', value: `${overallProgress}%`, color: '#3B82F6' },
        { title: 'Pending Stages', value: pendingStages, color: '#F59E0B' },
        { title: 'Completed Stages', value: completedStages, color: '#10B981' },
        { title: 'Est. Finish Time', value: '6h', color: '#8B5CF6' }
    ];

    return (
        <div className="row">
            {cards.map((item, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 mb-2">
                    <div
                        className="card shadow-sm border-0"
                        style={{
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px'
                        }}
                    >
                        <div className="text-center">
                            <h6
                                className="fw-semibold mb-1 text-truncate"
                                style={{ fontSize: '13px', color: '#000' }}
                            >
                                {item.title}
                            </h6>
                            <div
                                className="fw-bold"
                                style={{
                                    fontSize: '22px',
                                    color: item.color
                                }}
                            >
                                {item?.value}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductionProcessHomeAnalytics;
