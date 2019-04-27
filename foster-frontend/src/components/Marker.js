import React, {
	Component
} from 'react';
// import z from 'zipcodes'

import {
	Popup
} from 'react-map-gl';

export default class Marker extends Component {

	state = {
		viewport: {
			closeButton: 'true',
			closeOnClick: `100vh`,
			anchor: 'top'
		}
	};


	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});
	};




	render() {

		return (
			<Popup  latitude={this.props.latitude} longitude={this.props.longitude} closeButton={this.state.closeButton} closeOnClick={this.state.closeOnClick} anchor={this.state.anchor} >
         <div>You are here</div>
       </Popup>

		)

	}
}
