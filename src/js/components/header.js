import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPatient.error && nextProps.deletedPatient.error.message) {//delete failure
      alert(nextProps.deletedPatient.error.message || 'Could not delete patient. Please try again.');
    } else if(nextProps.deletedPatient.patient && !nextProps.deletedPatient.error) {//delete success
      this.context.router.history.push('/patients');
    };
    if(nextProps.deletedOrder.error && nextProps.deletedOrder.error.message) {//delete failure
      alert(nextProps.deletedOrder.error.message || 'Could not delete order. Please try again.');
    } else if(nextProps.deletedOrder.order && !nextProps.deletedOrder.error) {//delete success
      this.context.router.history.push('/patient/'+ this.props.patientId);
    };
    if(nextProps.deletedOrderProduct.error && nextProps.deletedOrderProduct.error.message) {//delete failure
      alert(nextProps.deletedOrderProduct.error.message || 'Could not delete order product. Please try again.');
    } else if(nextProps.deletedOrderProduct.order_product && !nextProps.deletedOrderProduct.error) {//delete success
      this.context.router.history.goBack();
    }
    // else if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
    //   this.context.router.push('/');
    // }
  }

  // renderSignInLinks(authenticatedUser) {
  //   if(authenticatedUser) {
  //     return (
  //       <ul className="nav  nav-pills navbar-right">
  //           <li style={{paddingRight: '10px'}} role="presentation">
  //             <Link role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/profile">
  //             {authenticatedUser.name}
  //             </Link>
  //           </li>
  //           <li style={{paddingRight: '10px'}} role="presentation">
  //             <a style={{color:'#996633',  fontSize: '17px'}}  onClick={this.props.logout} href="javascript:void(0)">
  //             Log out
  //             </a>
  //           </li>
  //       </ul>
  //     );
  //   }
  //
  //   return (
  //     <ul className="nav  nav-pills navbar-right">
  //         <li style={{paddingRight: '10px'}} role="presentation">
  //           <Link  role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/signup">
  //           Sign up
  //           </Link>
  //         </li>
  //         <li style={{paddingRight: '10px'}} role="presentation">
  //           <Link style={{color:'#996633',  fontSize: '17px'}} to="/signin">
  //           Sign in
  //           </Link>
  //         </li>
  //     </ul>
  //  );
  // }

	renderLinks() {
		// const { type, authenticatedUser } = this.props;
		const { type } = this.props;
		if(type === 'patients_index') {
       return (
        <div className="container">
          <ul className="nav  nav-pills navbar-right">
      			<li style={{paddingRight: '10px'}} role="presentation">
      				<Link style={{color:'#337ab7',  fontSize: '17px'}} to="/patients/new">
      				New Patient
    					</Link>
            </li>
    			</ul>
         {/* {this.renderSignInLinks(authenticatedUser)} */}

        </div>
  		 );
  	}
    // else if(type === 'patients_new', 'orders_new') {
    //    return (
    //     <div className="container">
    //       {/* {this.renderSignInLinks(authenticatedUser)} */}
    //       <ul className="nav  nav-pills navbar-left">
    //   			<li style={{paddingRight: '10px'}} role="presentation">
    //   				<Link className="text-xs-right"  style={{color:'#337ab7',  fontSize: '17px'}}  to="/">Back To Index</Link>
    //   			</li>
    // 			</ul>
    //     </div>
  	// 	 );
  	// }
    else if(type === 'patients_show') {
  			return (
  			 <div className="container">
    			{/* <ul className="nav nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
    			</ul> */}
          <button
            className="btn btn-error"
            onClick={this.context.router.history.goBack}
            >
              &#8592; Back
          </button>
      			<button className="btn btn-warning pull-xs-right"  onClick={()=> {if(confirm('Delete Patient?')) {this.props.onDeletePatientClick()};}}>Delete Patient</button>
           {/* {this.renderSignInLinks(authenticatedUser)} */}
    	   </div>
  		);
  	}
    else if(type === 'orders_show') {
      console.log("header", this.props)
  			return (
  			 <div className="container">
    			{/* <ul className="nav nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
    			</ul> */}
          <button
            className="btn btn-error"
            onClick={this.context.router.history.goBack}
            >
              &#8592; Back
          </button>
      			<button className="btn btn-warning pull-xs-right"  onClick={()=> {if(confirm('Delete Order?')) {this.props.onDeleteOrderClick()};}}>Delete Order</button>
           {/* {this.renderSignInLinks(authenticatedUser)} */}
    	   </div>
  		);
  	}
    else if(type === 'order_products_show') {
      console.log("header", this.props)
  			return (
  			 <div className="container">
    			{/* <ul className="nav nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
    			</ul> */}
          <button
            className="btn btn-error"
            onClick={this.context.router.history.goBack}
            >
              &#8592; Back
          </button>
      			<button className="btn btn-warning pull-xs-right"  onClick={()=> {if(confirm('Delete Order Product?')) {this.props.onDeleteOrderProductClick()};}}>Delete Order Product</button>
           {/* {this.renderSignInLinks(authenticatedUser)} */}
    	   </div>
  		);
  	}
	};

	render() {
			return (
			<div>
			      {this.renderLinks()}
	    </div>
			);
	}
}

export default Header
