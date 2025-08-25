import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './StoreAnalyticsCards.css'

const StoreAnalyticsCards = ({ data }) => {
  const navigate = useNavigate()

  const handleViewAll = (link) => {
    navigate(link)
  }

  return (
    <Row className="g-4">
      {data.map((item, index) => (
        <Col key={index} xl={3} md={6} sm={12}>
          <div className={`analytics-card ${item.color}`}>
            <div className="analytics-title">{item.title}</div>
            <div className="analytics-count">{item.count}</div>
           <button className="view-all-btn" onClick={() => handleViewAll(item?.link)}>View All</button>

          </div>
        </Col>
      ))}
    </Row>
  )
}

export default StoreAnalyticsCards
