import React, { Component } from "react";
import { Form, Input, Button, Radio } from "antd";
import axios from "axios";
import { BACKEND_HOST_URL, BOOKING_INFO_PATH } from "../Constants/Constants";

export default class GetBookingForm extends Component {
  constructor(props) {
    super(props);

    this.onBookingIdChange = this.onBookingIdChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.bookingDetails = this.bookingDetails.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);

    this.state = {
      bookingId: "",
      customerId: "",
      bookingRegion: "",
      cargoNature: "",
      status: "",
      chosenBookingId: "",
      chosenBookingRegion: "",
    };
  }

  onBookingIdChange(event) {
    this.setState({ bookingId: event.target.value });
    console.log(event.target.value);
  }

  onRegionChange(event) {
    this.setState({ bookingRegion: event.target.value });
    console.log(event.target.value);
  }
  onSubmit() {
    const GET_BOOKING_URL =
      BACKEND_HOST_URL +
      BOOKING_INFO_PATH +
      this.state.bookingId +
      "/" +
      this.state.bookingRegion;

    axios.get(GET_BOOKING_URL).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        this.bookingDetails(response.data);
      }
    });
  }
  bookingDetails(bookingDetails) {
    this.setState({
      chosenBookingId: bookingDetails.id,
      customerId: bookingDetails.customerId,
      chosenBookingRegion: bookingDetails.bookingRegion,
      cargoNature: bookingDetails.cargoNature,
      status: bookingDetails.status,
    });
  }
  render() {
    return (
      <div>
        <Form.Item
          label="Booking ID"
          name="BookingId"
          rules={[{ required: true, message: "Please input your booking ID!" }]}
        >
          <Input
            type="text"
            value={this.state.bookingId}
            onChange={this.onBookingIdChange}
          />
        </Form.Item>
        <br />
        Booking Region
        <Radio.Group
            value={this.state.bookingRegion}
            onChange={this.onRegionChange}
          >
            <Radio.Button value="APT">APT</Radio.Button>
            <Radio.Button value="EUT">EUT</Radio.Button>
            <Radio.Button value="NAT">NAT</Radio.Button>
          </Radio.Group>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form.Item>
        <br />
        *************************************************************************************
        <br />
        Booking Details:
        <br />
        <br />
        Booking ID: {this.state.chosenBookingId}
        <br />
        <br />
        Customer ID: {this.state.customerId}
        <br />
        <br />
        Booking Region: {this.state.chosenBookingRegion}
        <br />
        <br />
        Cargo Nature: {this.state.cargoNature}
        <br />
        <br />
        Booking Status: {this.state.status}
        <br />
        <br />
        *************************************************************************************
      </div>
    );
  }
}
