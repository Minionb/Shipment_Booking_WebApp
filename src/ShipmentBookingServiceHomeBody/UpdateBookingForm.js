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

export default class UpdateBookingForm extends Component {
  constructor(props) {
    super(props);

    this.onBookingIdChange = this.onBookingIdChange.bind(this);
    this.onNatureChange = this.onNatureChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onCustomerIdChange = this.onCustomerIdChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);

    this.state = {
      bookingId: "",
      customerId: 0,
      bookingRegion: "",
      cargoNature: "",
      status: "NEW",
    };
  }
  onBookingIdChange(event) {
    this.setState({ bookingId: event.target.value });
    console.log(event.target.value);
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
  onStatusChange(event) {
    this.setState({ status: event.target.value });
    console.log(event.target.value);
  }
  onSubmit() {
    const UPDATE_BOOKING_URL =
      "http://localhost:8080/bookings/" + this.state.bookingId;
    const updateBookingRequest = {
      customerId: this.state.customerId,
      bookingRegion: this.state.bookingRegion,
      cargoNature: this.state.cargoNature,
      status: this.state.status,
    };
    axios.put(UPDATE_BOOKING_URL, updateBookingRequest).then((response) => {
      console.log(response.data.id);
      if (response.status === 200) {
        this.updateSuccess(response.data.cargoNature, response.data.status);
      }
    });
    this.setState({
      bookingId: "",
      customerId: 0,
      bookingRegion: "",
      cargoNature: "",
      status: "",
    });
  }
  updateSuccess(cargoNature, status) {
    message.info(
      "Update Booking Successfully! Cargo Nautre: " +
        cargoNature +
        ", Booking status: " +
        status +
        "."
    );
  }
  render() {
    return (
      <div>
        <Form {...layout}>
          <Form.Item
            label="Booking ID"
            name="BookingId"
            rules={[
              { required: true, message: "Please input your booking ID!" },
            ]}
          >
            <Input
              type="text"
              value={this.state.bookingId}
              onChange={this.onBookingIdChange}
            />
          </Form.Item>
          <br />
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
          Cargo Nature (If no changes, please enter your original cargo nature
          request.)
          <Radio.Group
            value={this.state.cargoNature}
            onChange={this.onNatureChange}
          >
            <Radio.Button value="GENERAL_CARGO">General Cargo</Radio.Button>
            <Radio.Button value="REEFER_CARGO">Reefer Cargo</Radio.Button>
            <Radio.Button value="DANGEROUS_CARGO">Dangerous Cargo</Radio.Button>
            <Radio.Button value="AWKWARD_CARGO">Awkward Cargo</Radio.Button>
          </Radio.Group>
          <br />
          Update Booking Status
          <Radio.Group value={this.state.status} onChange={this.onStatusChange}>
            <Radio.Button value="APPROVED">Approved</Radio.Button>
            <Radio.Button value="CANCELLED">Cancelled</Radio.Button>
            <Radio.Button value="CHANGED">Changed</Radio.Button>
            <Radio.Button value="IN_PROGRESS">In Progress</Radio.Button>
            <Radio.Button value="COMPLETED">Completed</Radio.Button>
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
