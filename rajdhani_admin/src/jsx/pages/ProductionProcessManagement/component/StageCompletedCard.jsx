import React from 'react';

const StageCompletedCard = ({ supervisorName, completedAt }) => {
    const formattedDate = new Date(completedAt).toLocaleDateString();
    const formattedTime = new Date(completedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                backgroundColor: '#f0fff4',
            }}
        >
            <div
                style={{
                    backgroundColor: '#ffffff',
                    padding: '30px 40px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '500px',
                }}
            >
                <h2 style={{ color: '#28a745', marginBottom: '10px' }}>
                    ✅ Stage Completed
                </h2>

                <div
                    style={{
                        width: '100%',
                        backgroundColor: '#e9ecef',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '20px',
                        height: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#28a745',
                            transition: 'width 0.5s ease-in-out',
                        }}
                    ></div>
                </div>

                <p style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                    Finalized by: <strong>{supervisorName || "Supervisor"}</strong>
                </p>
                <p style={{ color: '#555' }}>
                    Completed on: <strong>{formattedDate}</strong> at <strong>{formattedTime}</strong>
                </p>
            </div>
        </div>
    );
};

export default StageCompletedCard;
