import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

export default class GetBookingForm extends Component {
  constructor(props) {
    super(props);

    this.onBookingIdChange = this.onBookingIdChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.bookingDetails = this.bookingDetails.bind(this);

    this.state = {
      bookingId: "",
      customerId: "",
      bookingRegion: "",
      cargoNature: "",
      status: "",
      chosenBookingId: "",
    };
  }

  onBookingIdChange(event) {
    this.setState({ bookingId: event.target.value });
    console.log(event.target.value);
  }

  onSubmit() {
    const GET_BOOKING_URL =
      "http://localhost:8080/bookings/" + this.state.bookingId;

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
      bookingRegion: bookingDetails.bookingRegion,
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
        Booking Region: {this.state.bookingRegion}
        <br />
        <br />
        Cargo Nature: {this.state.cargoNature}
        <br />
        <br />
        Booking Status: {this.state.status}
        <br/><br/>
        *************************************************************************************
      </div>
    );
  }
}
