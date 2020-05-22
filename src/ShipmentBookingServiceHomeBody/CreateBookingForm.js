import React, { Component } from "react";

import { Form, Input, Button, Radio, message } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class CreateBookingForm extends Component {
  constructor(props) {
    super(props);

    this.onNatureChange = this.onNatureChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onCustomerIdChange = this.onCustomerIdChange.bind(this);

    this.state = {
      customerId: 0,
      bookingRegion: "",
      cargoNature: "",
      status: "",
    };
  }

  onNatureChange(event) {
    this.setState({ cargoNature: event.target.value });
    console.log(event.target.value);
  }

  onRegionChange(event) {
    this.setState({ bookingRegion: event.target.value });
    console.log(event.target.value);
  }
  onCustomerIdChange(event) {
    this.setState({ customerId: event.target.value });
    console.log(event.target.value);
  }
  onSubmit() {
    const CREATE_BOOKING_URL = "http://34.106.36.224:9300/bookings";
    const createBookingRequest = {
      customerId: this.state.customerId,
      bookingRegion: this.state.bookingRegion,
      cargoNature: this.state.cargoNature,
    };
    axios.post(CREATE_BOOKING_URL, createBookingRequest).then((response) => {
      console.log(response.data.id);
      if (response.status === 201) {
        this.createSuccess(response.data.id);
      }
    });
    this.setState({
      customerId: 0,
      bookingRegion: "",
      cargoNature: "",
      status: "",
    });
  }
  createSuccess(bookingId) {
    message.info(
      "Create Booking Successfully! You booking ID is " + bookingId + "."
    );
  }

  render() {
    return (
      <div>
        <Form {...layout}>
          <Form.Item
            label="Customer ID"
            name="customerId"
            rules={[
              { required: true, message: "Please input your customer ID!" },
            ]}
          >
            <Input
              type="text"
              value={this.state.customerId}
              onChange={this.onCustomerIdChange}
            />
          </Form.Item>
          <br />
          Booking Region
          <br />
          <Radio.Group
            value={this.state.bookingRegion}
            onChange={this.onRegionChange}
          >
            <Radio.Button value="APT">APT</Radio.Button>
            <Radio.Button value="EUT">EUT</Radio.Button>
            <Radio.Button value="NAT">NAT</Radio.Button>
          </Radio.Group>
          <br />
          Cargo Nature
          <Radio.Group
            value={this.state.cargoNature}
            onChange={this.onNatureChange}
          >
            <Radio.Button value="GENERAL_CARGO">General Cargo</Radio.Button>
            <Radio.Button value="REEFER_CARGO">Reefer Cargo</Radio.Button>
            <Radio.Button value="DANGEROUS_CARGO">Dangerous Cargo</Radio.Button>
            <Radio.Button value="AWKWARD_CARGO">Awkward Cargo</Radio.Button>
          </Radio.Group>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
