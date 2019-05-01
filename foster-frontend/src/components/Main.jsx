import React, {
	Component
} from 'react';

import Marker from './Marker'
import adapter from '../adapters/adapter.js';
import NewPlace from './modals/NewPlace';

import ReactMapGL from 'react-map-gl';

let tmpID;
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
						return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&street=${addressParams}&postalCode=${place.zipcode}`)

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



			this.toggle()

		}

	}

	componentDidMount() {
		this._locateUser()

		adapter.getPlaces()
			.then(places => {
				this.setState({
					places
				}, () => {


					let markerPromises = this.state.places.map(place => {
						const addressParams = place.address.split(" ").join('+')
						return fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=XaTE5vJKwWpGMeLGd1R3uVA9NUri8TTT&street=${addressParams}&postalCode=${place.zipcode}`)

					})

					Promise.all(markerPromises).then(places => {
						console.log('test 1', places);
						return Promise.all(places.map(place => place.json())).then(places => {
							console.log('test 2', places);
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


	render() {

		return (
			<div>
		   <nav className="navbar navbar-expand-lg navbar-light bg-light">
		      <h2 className="t-1 nav-logo fg-dark-navy font-weight-600 mx-4 text-uppercase text-spaced">Foster</h2>

		      <div className="collapse navbar-collapse" id="navbarSupportedContent">
		         <ul className="navbar-nav mr-auto">
		            <li className="nav-item active">
		               <button className="nav-btn " id="new-place" onClick={this.toggle}> New Place! </button>
									 <button className="nav-btn " id="m-new-place" onClick={this.toggle}><i class="fas fa-plus"></i></button>
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

			{this.state.markers}
			<NewPlace modal={this.state.modal} toggle={this.toggle}  handleSubmit={this.handleSubmit} reRender={this.reRender} />
			</ReactMapGL>
		</div>

		)

	}
}
