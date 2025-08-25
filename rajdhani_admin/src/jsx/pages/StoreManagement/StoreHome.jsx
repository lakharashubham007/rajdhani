import React from 'react'
import PageTitle from '../../layouts/PageTitle'
import { Col, Row } from 'react-bootstrap'
import StoreAnalyticsCards from './StoreComponents/StoreAnalyticsCards'

const analyticsData = [
    { title: 'Incoming Sale Orders', count: 15, link: '/store/saleorders', color: 'blue' },
    { title: 'Reject & Replace Requests', count: 8, link: '/store/rejection-query', color: 'green' },
    { title: 'Packing Approval', count: 5, link: '/store/packing-approval', color: 'orange' },
    { title: 'Issued Items', count: 12, link: '/store/issued-items', color: 'purple' },
]

const StoreHome = () => {
    return (
        <>
            <PageTitle
                activeMenu={"Store"}
                motherMenu={"Home"}
                motherMenuLink={"/dashboard"}
            />

            <Row>
                <Col lg={12}>
                    <div className="card">
                        {/* Heading */}
                        <div className="card-header">
                            <h4 className="card-title">Store Management</h4>
                        </div>
                        {/* Card Body */}
                        <div className="card-body" style={{ minHeight: '80vh' }}>
                            <div>
                                <StoreAnalyticsCards data={analyticsData} />
                            </div >
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default StoreHome