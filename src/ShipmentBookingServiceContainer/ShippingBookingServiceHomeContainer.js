import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Row, Col } from "antd";
import CreateBooking from "../Components/CreateBooking.js";
import UpdateBooking from "../Components/UpdateBooking.js";
import "./ShipmentBookingServiceHomeHeader.css";

const { Header, Content } = Layout;
export default class ShippingBookingServiceHomeContainer extends Component {
  static propTypes = {
    prop: PropTypes,
  };

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
            <Col span={24}>
              <Row gutter={[16, 50]} justify="left">
                <Col span={20}>
                  <CreateBooking />
                  <UpdateBooking />
                </Col>
              </Row>
            </Col>
          </Content>
        </Layout>
      </div>
    );
  }
}
