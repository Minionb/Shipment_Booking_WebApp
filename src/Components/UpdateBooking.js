import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

export default class UpdateBooking extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <Button shape="round">
                    Update Booking
                </Button>
            </div>
        )
    }
}
