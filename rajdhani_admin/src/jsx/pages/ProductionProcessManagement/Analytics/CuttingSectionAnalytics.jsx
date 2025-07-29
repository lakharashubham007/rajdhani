import React from 'react'

const CuttingSectionAnalytics = () => {
    return (
        <div>
            <div className="row mb-1 text-center">
                {[
                    {
                        process: 'Hose Cutting',
                        progress: 50,
                        totalTime: '1h 20m',
                        pending: 'Skiving, Crimping',
                        estimated: '2h',
                    },
                    {
                        process: 'Skiving',
                        progress: 30,
                        totalTime: '45m',
                        pending: 'Pre-Assembly',
                        estimated: '1h 30m',
                    },
                    {
                        process: 'Pre-Assembly',
                        progress: 60,
                        totalTime: '1h',
                        pending: 'Crimping, Testing',
                        estimated: '2h 15m',
                    },
                    {
                        process: 'Crimping',
                        progress: 80,
                        totalTime: '50m',
                        pending: 'Testing',
                        estimated: '1h 5m',
                    },
                    {
                        process: 'Testing',
                        progress: 90,
                        totalTime: '30m',
                        pending: 'None',
                        estimated: '30m',
                    },
                ].map((item, index) => (
                    <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card shadow-sm rounded-3 border-0">
                            <div className="card-body p-3">
                                <h6 className="text-uppercase fw-bold mb-1">{item.process}</h6>
                                <div className="fs-3 text-primary fw-bold mb-2">{item.progress}%</div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CuttingSectionAnalytics;