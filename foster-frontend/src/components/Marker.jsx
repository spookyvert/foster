import React, {
	Component
} from 'react';

import {
	Popup
} from 'react-map-gl';
import adapter from '../adapters/adapter.js';
import MarkerModal from './modals/MarkerModal';

export default class Marker extends Component {

	state = {
		modal: false,
		viewport: {
			anchor: 'top'
		},
		poll: []
	};

	toggle = () => {

		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	trigger = () => {
		adapter.getMarkerSuggestions()
			.then(data => {

				let tmp = [...this.state.poll]
				tmp.unshift(data)

				let stateCopy = tmp[0].filter(s => s.place_id === this.props.placeId);


				this.setState({
					poll: stateCopy
				});

			})

	}




	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidMount() {

		adapter.getMarkerSuggestions()
			.then(data => {

				let tmp = [...this.state.poll]
				tmp.unshift(data)

				let stateCopy = tmp[0].filter(s => s.place_id === this.props.placeId);




				this.setState({
					poll: stateCopy
				});

			})

	}



	render() {
		let formattedAddress = this.props.place.results[0].locations[0].street;

		return (
			<div onClick={this.toggle} >
			<Popup latitude={this.props.latitude} longitude={this.props.longitude} anchor={this.state.anchor} >

        <span className="font-Poppins marker-title" >{formattedAddress} ({this.state.poll.length}) </span>

				<MarkerModal
					modal={this.state.modal}
					toggle={this.toggle}
					address={formattedAddress}
					currentUser={this.props.currentUser.user.id}
					currentMarker={this.props.placeId}
					place={this.props.place}
					currentUserZip={this.props.currentUser.user.zipcode}
					poll = {this.state.poll}
					trigger = {this.trigger}
					/>

      </Popup>
		 </div>

		)

	}
}
