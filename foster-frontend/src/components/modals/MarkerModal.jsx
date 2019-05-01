import React, {
	Component
} from 'react';
import {
	Modal,
	ModalFooter,
	ModalBody,
	ModalHeader
} from 'reactstrap';

import adapter from '../../adapters/adapter.js';
import c from '../../assets/json/categories.json';


import SuggestionBox from "../SuggestionBox";
import pluralize from 'pluralize'

const categoryName = c.map(cat => {

	return pluralize.singular(cat.title)
})

export default class MarkerModal extends Component {

	state = {
		card: true
	}

	toggleCard = () => {
		this.setState({
			card: !this.state.card
		})
	}


	handleSubmit = e => {
		e.preventDefault()

		let markerZip = +this.props.place.results[0].providedLocation.postalCode;
		let userZip = +this.props.currentUserZip

		if (markerZip !== userZip) {
			document.querySelector(".error-zip").style.display = "block"


		} else {
			let suggestion = document.querySelector("#suggestionBox").value

			let userData = {
				user_id: this.props.currentUser,
				place_id: this.props.currentMarker,
				sugg: suggestion
			}
			console.log(userData);

			adapter.postSuggestion(userData)
				.then(data => {
					if (data.errors) {
						document.querySelector(".error-submit").style.display = "block"


						this.props.toggle()


					}
					this.props.trigger()
					console.log("here!");
				})







			this.props.toggle()



		}

	}

	sortArray = (array) => {
		const frequency = {};
		let value;

		// compute frequencies of each value
		for (let i = 0; i < array.length; i++) {
			value = array[i];
			if (value in frequency) {
				frequency[value]++;
			} else {
				frequency[value] = 1;
			}
		}

		// make array from the frequency object to de-duplicate
		const uniques = [];
		for (value in frequency) {
			uniques.push(value);
		}

		// sort the uniques array in descending order by frequency
		function compareFrequency(a, b) {
			return frequency[b] - frequency[a];
		}

		return uniques.sort(compareFrequency);
	}



	render() {



		let tmp = this.props.poll.map(s => s.sugg)
		let tmp2 = this.sortArray(tmp)
		const allSuggestions = tmp2.map(s => {
			return <li class="sugg-item">{s}</li>
		})







		if (this.state.card === false) {
			return (
				<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
	         <ModalHeader toggle={this.props.toggle} className="font-heavy t-1 "><span className="title-snd">{this.props.address}</span></ModalHeader>
	         <form onSubmit={this.handleSubmit}>
	            <ModalBody>
	               <div className="row">
	                  <div className="form-body">
	                     <label>You <b>must</b> be in the same area as the location you're submitting</label>
	                     <br/>
	                     <br/>
	                     <label for="sugg" className="t-2">What Do You Want?</label>
	                     <span className="text-tiny error-zip"><b>Must</b> be a local for this area.</span>
											 <span className="text-tiny error-submit">You <b>already</b> submitted a response.</span>

	                       <SuggestionBox
	                       suggestions={categoryName}
	                       placeholder="eg. Bakery"
	                     />
	                  </div>
	               </div>
	            </ModalBody>
	            <ModalFooter>


								<span class="all-sugg-btn text-tiny">	<a onClick={this.toggleCard} className="a-no-style a-underline-style ">See Everyone's Suggestions</a></span>
	               <button className="btn btn-primary "  type="submit" onClick={this.handleSubmit} > Submit
	               </button>
	            </ModalFooter>
	         </form>
	      </Modal>
			)
		} else {

			return (
				<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
					 <ModalHeader toggle={this.props.toggle} className="font-heavy t-1 "><span className="title-snd">{this.props.address}</span></ModalHeader>
					 <form onSubmit={this.handleSubmit}>
							<ModalBody>
								 <div className="row">
										<div className="form-body">
											 <ul class="sugg-ul">
												 {allSuggestions}
											 </ul>
										</div>
								 </div>
							</ModalBody>
							<ModalFooter>


								<span class="all-sugg-btn text-tiny">	<a onClick={this.toggleCard} className="a-no-style a-underline-style ">New Suggestions</a></span>

							</ModalFooter>
					 </form>
				</Modal>
			)

		}


	}
}
