import React, {
	Component
} from 'react';

import Marker from './Marker'
import adapter from '../adapters/adapter.js';
import NewPlace from './modals/NewPlace';

import ReactMapGL from 'react-map-gl';


let tmpID;
export default class Main extends Component {

	// static defaultProps = {
	// 	currentUser: {
	// 		user: {}
	// 	}
	// }
	//

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


					let markerPromises = this.state.places.map(place => {
						const addressParams = place.address.split(" ").join('+')
						return fetch(`https://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&street=${addressParams}&postalCode=${place.zipcode}`)

					})


					Promise.all(markerPromises).then(places => {




						return Promise.all(places.map(place => place.json())).then(places => {

							this.setState({
								markers: places.map((place, idx) => {


									return <Marker
									key={idx}
									placeId={this.state.places[idx].id}
									latitude={place.results[0].locations[0].latLng.lat}
									longitude={place.results[0].locations[0].latLng.lng}
									allPlaces={this.state.places}
									place={place}
									currentUser={this.props.currentUser}
									trigger = {this.trigger}
									/>
								})

							})

						})
					})

				})
			})

	}

	handleSubmit = (e, state, zip) => {
		e.preventDefault()


		if (state.zipcode !== zip) {
			document.querySelector(".error-zip").style.display = "block"

		} else {


			adapter.postPlace(state)
				.then(res => res.json())
				.then(data => {
					tmpID = data.id;
					return data
				})
				.then(final => {

					const suggestion = document.querySelector('#suggestionBox').value;
					const userData = {
						user_id: this.props.currentUser.user.id,
						place_id: tmpID,
						sugg: suggestion,
					};
					adapter.postSuggestion(userData);

					let stateCopy = [...this.state.places]

					stateCopy.unshift(final)


					this.setState({
						places: stateCopy
					})


					let markerPromises = this.state.places.map(place => {

						const addressParams = place.address.split(" ").join('+')
						return fetch(`https://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&street=${addressParams}&postalCode=${place.zipcode}`)

					}).reverse()

					Promise.all(markerPromises).then(places => {

						Promise.all(places.map(place => place.json())).then(places => {




							this.setState({
								markers: places.map((place, idx) => {


									return <Marker
												key={idx}
												placeId={tmpID}
												latitude={place.results[0].locations[0].latLng.lat}
												longitude={place.results[0].locations[0].latLng.lng}
												allPlaces={this.state.places}
												place={place}
												currentUser={this.props.currentUser}
												/>
								})

							})

						})


					})
				})



			this._toggle()

		}

	}

	_flyZip = () => {

		fetch(`https://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&postalCode=${this.props.currentUser.user.zipcode}&boundingBox=-171.791110603,18.91619,-66.96466,71.3577635769&location=New York,NY`)
			.then(res => res.json())
			.then(data => {
				let u = data.results[0].locations[0].latLng;

				this.setState({
					viewport: {
						width: '100wh',
						height: `100vh`,
						longitude: u.lng,
						latitude: u.lat,
						zoom: 13
					}
				});

			})
	}



	_locateUser = (zip) => {




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

	// removed changeHandler

	_toggle = () => {

		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}


	render() {


		return (
			<div>
		   <nav className="navbar navbar-expand-lg navbar-light bg-light">
		      <h2 className="t-1 nav-logo fg-dark-navy font-weight-600 mx-4 text-uppercase text-spaced">Foster</h2>

		      <div className="collapse navbar-collapse" id="navbarSupportedContent">
		         <ul className="navbar-nav mr-auto">
		            <li className="nav-item active">
		               <button className="nav-btn " id="new-place" onClick={this._toggle}> New Place! </button>
									 <button className="nav-btn " id="m-new-place" onClick={this._toggle}><i class="fas fa-plus"></i></button>
		            </li>
		         </ul>

						 <div>
							  <button id="logout-btn" className="btn btn-primary  logout-btn login-button text-right-logout " onClick={this.props.handleLogout}><i class="fas fa-door-open"></i> Logout </button>
								<button  id="m-logout" className="btn btn-primary  logout-btn login-button text-right-logout" onClick={this.props.handleLogout}><i class="fas fa-door-open"></i></button>
						 </div>
		      </div>
		   </nav>
			   <ReactMapGL
			   mapStyle="mapbox://styles/mapbox/outdoors-v11"
			   {...this.state.viewport}
			   onViewportChange={(viewport) => this.setState({viewport})}
			   >
				 <button id="fly-to-zip" class="zip-btn" onClick={this._flyZip}><i class="fas fa-map-pin"></i></button>

			{this.state.markers}
			<NewPlace modal={this.state.modal} toggle={this._toggle}  handleSubmit={this.handleSubmit} reRender={this.reRender} />
			</ReactMapGL>
		</div>

		)

	}
}
