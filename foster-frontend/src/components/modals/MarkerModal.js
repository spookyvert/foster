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

export default class MarkerModal extends Component {
	state = {
		sugg: ""

	};

	changeHandler = e => {

		this.setState({
			sugg: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault()

		let markerZip = +this.props.place.results[0].providedLocation.postalCode;
		let userZip = +this.props.currentUserZip
		if (markerZip !== userZip) {
			document.querySelector(".error-zip").style.display = "block"


		} else {
			// posting the place to db
			let userData = {
				user_id: this.props.currentUser,
				place_id: this.props.currentMarker,
				sugg: this.state.sugg
			}


			adapter.postSuggestion(userData);

			this.props.toggle()

		}

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
          <label for="sugg" class="t-2">What Do You Want?</label>
					<span className="text-tiny error-zip"><b>Must</b> be a local for this area.</span>
          <input type="text" name="sugg" onChange={this.changeHandler} className="form-control i-1" placeholder="eg. Bakery" />




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
