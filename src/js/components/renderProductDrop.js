import React, { Component, PropTypes } from 'react';

class RenderProductDrop extends Component {

  productOptions = (products) => (
          <option key={products.id} value={products.id}>{products.short_desc}</option>
      )

  render() {
    const { input, label, type, meta: { touched, error, invalid, warning }, data} = this.props;
    return (
      <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label  className="control-label">{label}</label>
        <div>
          <select {...input} className="form-control"  placeholder={label} type={type}>
            <option value="-1">Select Product...</option>
            {data.map(this.productOptions)}
          </select>
          <div className="help-block">
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
        </div>
      </div>
    )
  }
}

RenderProductDrop.propTypes = {
  products: React.PropTypes.array,
  input: React.PropTypes.object,
}

export default RenderProductDrop;
