import React, {
	Component
} from 'react';

import Marker from './Marker.js'
import adapter from '../adapters/adapter.js';
import NewPlace from './modals/NewPlace';

import ReactMapGL from 'react-map-gl';

export default class Main extends Component {

	static defaultProps = {
		currentUser: {
			user: {}
		}
	}


	state = {
		places: [],
		modal: false,
		viewport: {
			width: '100wh',
			height: `100vh`,
			latitude: 37.2372,
			longitude: 115.8018,
			zoom: 15
		},
		markers: []
	};

	componentDidMount() {
		this._locateUser()

		adapter.getPlaces()
			.then(places => {
				this.setState({
					places
				}, () => {

					// TRY TO REFACTOR, PROMISE CEPTION
					let markerPromises = this.state.places.map(place => {
						const addressParams = place.address.split(" ").join('+')
						return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&street=${addressParams}&postalCode=${place.zipcode}`)

					})





					Promise.all(markerPromises).then(places => {

						Promise.all(places.map(place => place.json())).then(places => {
							this.setState({
								markers: places.map((place, idx) =>

									<Marker
									key={idx}
									placeId={this.state.places[idx].id}
									latitude={place.results[0].locations[0].latLng.lat}
									longitude={place.results[0].locations[0].latLng.lng}
									allPlaces={this.state.places}
									place={place}
									currentUser={this.props.currentUser}
									/>)

							})

						})
					})

				})
			})
	}

	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});
	};

	toggle = () => {

		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	_locateUser = () => {

		navigator.geolocation.getCurrentPosition(position => {

			this.setState({
				viewport: {
					width: '100wh',
					height: `100vh`,
					longitude: position.coords.longitude,
					latitude: position.coords.latitude,
					zoom: 15
				}
			});

		});
	}

	reRender = (state) => {

		const stateCopy = [...this.state.places]
		stateCopy.unshift(state)

		this.setState({
			places: stateCopy
		})

	}


	render() {

		return (
			<div>
		   <nav className="navbar navbar-expand-lg navbar-light bg-light">
		      <h2 className="t-1 nav-logo fg-dark-navy font-weight-600 mx-4 text-uppercase text-spaced">Foster</h2>
		      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		      </button>
		      <div className="collapse navbar-collapse" id="navbarSupportedContent">
		         <ul className="navbar-nav mr-auto">
		            <li className="nav-item active">
		               <button className="nav-btn" onClick={this.toggle}> New Place! </button>
		            </li>
		         </ul>
		      </div>
		   </nav>
			   <ReactMapGL
			   mapStyle="mapbox://styles/mapbox/outdoors-v11"
			   {...this.state.viewport}
			   onViewportChange={(viewport) => this.setState({viewport})}
			   >

			{this.state.markers}
			<NewPlace modal={this.state.modal} toggle={this.toggle}   reRender={this.reRender} />
			</ReactMapGL>
		</div>

		)

	}
}
