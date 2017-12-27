import React from 'react'
import OrderTable from '../containers/OrderTableContainer'

export default class OrdersIndex extends React.Component {
  render() {
    return (
      <div>
        {/* <HeaderContainer type="posts_index"/> */}
        <OrderTable />
      </div>
    )
  }
}
