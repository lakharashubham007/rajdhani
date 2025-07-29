import React from 'react'

const StageStartButtonCard = ({ producitonProcessDetails, handleStartStage, Stage }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                backgroundColor: '#f7f9fc',
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
                    maxWidth: '400px',
                }}
            >
                <h2
                    style={{
                        fontSize: '1.8rem',
                        marginBottom: '15px',
                        color: '#1a1a1a',
                        fontWeight: 600,
                    }}
                >
                    Start {Stage} Process
                </h2>
                <p
                    style={{
                        fontSize: '1rem',
                        color: '#555',
                        marginBottom: '25px',
                    }}
                >
                    Do you want to start the <strong>{Stage}</strong> process?
                </p>
                <button
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleStartStage(producitonProcessDetails?.data?._id)}
                >
                    Start
                </button>
            </div>
        </div>
    )
}

export default StageStartButtonCard