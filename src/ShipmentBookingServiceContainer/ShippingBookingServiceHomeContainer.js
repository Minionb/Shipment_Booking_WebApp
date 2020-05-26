import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import CreateBookingForm from "../ShipmentBookingServiceHomeBody/CreateBookingForm.js";
import UpdateBookingForm from "../ShipmentBookingServiceHomeBody/UpdateBookingForm.js";
import GetBookingForm from "../ShipmentBookingServiceHomeBody/GetBookingForm.js";
import "./ShipmentBookingServiceHomeHeader.css";

const { Header, Content } = Layout;
export default class ShippingBookingServiceHomeContainer extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="homePageHeader">
            <Row gutter={16}>
              <Col className="gutter-row" span={15}>
                <div className="Title">
                  <br />
                  IRIS-4 Shipment Booking Service
                </div>
              </Col>
            </Row>
          </Header>

          <Content>
            <Row gutter={[16, 50]}>
              <Col span={8}>
                Create Booking Form
                <br />
                *************************************************************************************
                <br />
                <CreateBookingForm />
                <br />
                *************************************************************************************
              </Col>
              <Col span={8} offset={8}>
                <div
                  style={{ position: "absolute", left: "50%", top: "11.5%" }}
                >
                  Get Booking Details
                  <br />
                  *************************************************************************************
                  <br />
                  <GetBookingForm />
                  <br />
                  
                </div>
              </Col>
            </Row>

            <Col span={24}>
              <Row gutter={[16, 50]} justify="right">
                <Col span={20}>
                  Update Booking Form
                  <br />
                  *************************************************************************************
                  <br />
                  <UpdateBookingForm />
                  *************************************************************************************
                  <br />
                </Col>
              </Row>
            </Col>
          </Content>
        </Layout>
      </div>
    );
  }
}
