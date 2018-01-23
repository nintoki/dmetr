import React, { Component, PropTypes } from 'react';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { DateTimePicker } from 'react-widgets'

Moment.locale('en')
momentLocalizer()

import 'react-widgets/dist/css/react-widgets.css'

const renderDateTimePicker = ({ input: { onChange, value }, showTime, label }) =>
<div className="form-group">
  <label className="control-label">{label}</label>
  <DateTimePicker
    onChange={onChange}
    defaultValue={new Date()}
    editFormat='MM/DD/YY'
    format='YYYY-MM-DD HH:mm:ss'
    time={showTime}
    value={!value ? null : new Date(value)}
  />
</div>

export default renderDateTimePicker;
