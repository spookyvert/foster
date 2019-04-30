import React, {
	Component
} from 'react';
import {
	Modal,
	ModalFooter,
	ModalBody,
	ModalHeader
} from 'reactstrap';

import c from '../../assets/json/categories.json';
import adapter from '../../adapters/adapter.js';

import SuggestionBox from "../SuggestionBox.jsx";
import pluralize from 'pluralize'

const categoryName = c.map(cat => {

	return pluralize.singular(cat.title)
})
export default class NewPlace extends Component {

	state = {
		place: {
			address: "",
			zipcode: "",
			user_id: ""
		},
		zip: "",
		currentUser: ""

	};

	changeHandler = e => {
		if (e.target.name === "address") {
			let stateCopy = {
				...this.state.place
			}
			stateCopy.address = e.target.value;
			this.setState({
				place: stateCopy
			});
		}

		if (e.target.name === "zipcode") {

			let stateCopy = {
				...this.state.place
			}
			stateCopy.zipcode = +e.target.value;

			this.setState({
				place: stateCopy

			});
		}

	};


	handleSubmit = e => {
		e.preventDefault()


		if (this.state.place.zipcode !== this.state.zip) {
			document.querySelector(".error-zip").style.display = "block"

		} else {

			adapter.postPlace(this.state.place)





			// don't work
			this.props.reRender(this.state.place)
			// adapter.postPlace()
			this.props.toggle()

		}

	}


	componentDidMount() {
		let token = localStorage.getItem('token')

		adapter.getCurrentUser(token)
			.then(res => res.json())
			.then(data => {
				this.setState({
					place: {
						user_id: data.user.id
					},
					zip: +data.user.zipcode,
					currentUser: data.user.id
				})
			})


	}

	render() {

		return (

			<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
			   <ModalHeader toggle={this.props.toggle} className="font-heavy t-1 ">New Place <i className="fas fa-city"></i></ModalHeader>
			   <form onSubmit={this.handleSubmit}>
			      <ModalBody>
			         <div className="row">
			            <div className="form-body">
			               <label>You <b>must</b> be in the same area as the location you're submitting</label>
			               <br/>
			               <br/>
			               <label for="address" className="t-2">Address</label>
			               <input type="text" name="address" onChange={this.changeHandler} className="form-control i-1" placeholder="eg. 123 Sesame Street" />
			               <label for="zipcode" className="t-2">Zipcode</label>
			               <input type="number" name="zipcode" onChange={this.changeHandler} className="form-control i-2" placeholder="eg. 10128" max="5" />
			               <span className="text-tiny error-zip"><b>Must</b> be a local for this area.</span>
			               <label className="t-2 mt-5">What do <b>you</b> want this location to be?</label>

										 <SuggestionBox
	 										suggestions={categoryName}
	 										   placeholder="eg. Hardware Store"
	 										/>
			            </div>
			         </div>
			      </ModalBody>
			      <ModalFooter>
			         <button className="btn btn-primary "  type="submit" onClick={this.handleSubmit} > Submit
			         </button>
			      </ModalFooter>
			   </form>
			</Modal>



		)

	}
}
