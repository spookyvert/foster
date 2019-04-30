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


import SuggestionBox from "../SuggestionBox.jsx";
import pluralize from 'pluralize'

const categoryName = c.map(cat => {

	return pluralize.singular(cat.title)
})

export default class MarkerModal extends Component {



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

			adapter.postSuggestion(userData);

			this.props.toggle()

		}

	}

	suggestionPipeline = (data) => {
		this.setState({
			sugg: data
		}, () => console.log(this.state.sugg))
	}

	render() {



		return (
			<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
         <ModalHeader toggle={this.props.toggle} className="font-heavy t-1 ">New Suggestion <br/> <span className="title-snd">{this.props.address}</span></ModalHeader>
         <form onSubmit={this.handleSubmit}>
            <ModalBody>
               <div className="row">
                  <div className="form-body">
                     <label>You <b>must</b> be in the same area as the location you're submitting</label>
                     <br/>
                     <br/>
                     <label for="sugg" className="t-2">What Do You Want?</label>
                     <span className="text-tiny error-zip"><b>Must</b> be a local for this area.</span>

                       <SuggestionBox
                       suggestions={categoryName}
                       suggestionPipeline={this.suggestionPipeline}
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
