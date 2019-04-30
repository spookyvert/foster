import React, {
	Component
} from 'react';

import {
	Popup
} from 'react-map-gl';

import MarkerModal from './modals/MarkerModal';

export default class Marker extends Component {

	state = {
		modal: false,
		viewport: {
			anchor: 'top'
		}
	};

	toggle = () => {

		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}


	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});
	};




	render() {
		let formattedAddress = this.props.place.results[0].locations[0].street;



		return (
			<div onClick={this.toggle} >
			<Popup latitude={this.props.latitude} longitude={this.props.longitude} anchor={this.state.anchor} >

        <span className="font-Poppins marker-title" >{formattedAddress}</span>

				<MarkerModal
					modal={this.state.modal}
					toggle={this.toggle}
					address={formattedAddress}
					currentUser={this.props.currentUser.user.id}
					currentMarker={this.props.placeId}
					place={this.props.place}
					currentUserZip={this.props.currentUser.user.zipcode}
					/>

      </Popup>
		 </div>

		)

	}
}
