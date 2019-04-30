import React, {
	Component
} from 'react';

import {
	Row
} from 'reactstrap';


export default class Login extends Component {
	state = {

		name: "",
		password: "",
		zipcode: "",
		signup: false,
		background: "url('../assets/gifs/bg-1.gif')"
	};

	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});

	};

	loginSubmitHandler = e => {

		e.preventDefault();
		this.props.loginHandler(e, this.state);

	};

	signupSubmitHandler = (e) => {
		e.preventDefault();

		let userInfo = {
			name: this.state.name,
			password: this.state.password,
			zipcode: +this.state.zipcode
		};

		this.props.signupHandler(e, userInfo);


	};

	signUpContent = () => {


		document.querySelector(".help-signup").style.display = "none";
		let z = document.querySelector(".zip-sign-up").style
		z.setProperty('display', 'block', 'important')
		document.querySelector(".t-custom-login").innerHTML = "Sign Up"
		document.querySelector(".login-button").innerHTML = "Sign Up"

		this.setState({
			signup: !this.state.signup
		})

	}

	componentDidMount() {
		let bgArray = [`url('https://i.imgur.com/iTJDsU2.gif')`, `url('https://i.imgur.com/0LSGOgI.gif')`, `url('https://i.imgur.com/fI2ni0A.gif')`, `url('https://i.imgur.com/OBB4wWD.gif')`, `url('https://i.imgur.com/7bDNmaq.gif')`];
		let selectBG = bgArray[Math.floor(Math.random() * bgArray.length)];

		this.setState({
			background: selectBG
		})


	}


	render() {
		const formBool = this.state.signup;
		const bg = {
			backgroundImage: this.state.background
		}

		return (
			<div className="d-md-flex h-md-100 align-items-center">

		  <div className="col-md-6 p-0 bg-side h-md-100"   style={bg} >
		    <div className="bg-side-overlay" >
		      <div className=" text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center"></div>
		    </div>
		  </div>

  		<div className="col-md-6 p-0 bg-white h-md-100 loginarea">
      	<div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
          	<h2 className="t-1 fg-dark-navy font-weight-600 mx-4 text-uppercase text-spaced"> Foster </h2>
  						<div className="text-left push-from-top mx-4 login-container">
								<h4 className="s-1 fg-dark-navy t-custom-login font-weight-600 text-uppercase text-spaced"> Login </h4>
{formBool === false ?
									<form onSubmit={this.loginSubmitHandler}>
	                	<Row className="pb-4">
	                      <label htmlFor="text" className="fg-dark-navy font-Poppins d-block text-left text-smaller text-uppercase my-1"> Username </label>

	                      <input name="name" type="text" onChange={this.changeHandler} className="input-line font-Roboto text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
	                  </Row>

	                  <Row className="pb-4">
	                      <label for="password" className="fg-dark-navy  font-Poppins d-block text-left text-smaller text-uppercase my-1"> Password
	                      </label>
	                      <input name="password" type="password" onChange={this.changeHandler} className="input-line text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
	                      <br/>
	                      <span className="text-tiny help-signup"><a className="a-no-style a-underline-style " onClick={this.signUpContent}> Having trouble logging in? Sign up! </a></span>
												<br />
	                  </Row>

	                  <Row className="pb-4 zip-sign-up">
	                      <label for="zipcode" className="fg-dark-navy  font-Poppins d-block text-left text-smaller text-uppercase my-1"> ZipCode
	                      </label>
	                      <input name="zipcode" type="text" onChange={this.changeHandler} className="input-line zip-input text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
	                      <br />
	                      <br />
	                  </Row>

		                <Row className="pb-4">
		                  <button className="btn btn-primary login-button"> Login </button>
		                </Row>
            			</form>
						:
									<form onSubmit={this.signupSubmitHandler}>

				            <Row className="pb-4">
				                <label htmlFor="text" className="fg-dark-navy font-Poppins d-block text-left text-smaller text-uppercase my-1"> Username </label>

				                <input name="name" type="text" onChange={this.changeHandler} className="input-line font-Roboto text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
				            </Row>

				            <Row className="pb-4 pas-h">
				                <label for="password" className="fg-dark-navy  font-Poppins d-block text-left text-smaller text-uppercase my-1"> Password
				                </label>
				                <input name="password" type="password" onChange={this.changeHandler} className="input-line text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
				                <br/>
				            </Row>

				            <Row className="pb-4 zip-sign-up">
				                <label for="zipcode" className="fg-dark-navy  font-Poppins d-block text-left text-smaller text-uppercase my-1"> ZipCode
				                </label>
				                <input name="zipcode" type="text" onChange={this.changeHandler} className="input-line zip-input text-smaller line-height-tall pl-3 py-0 fg-light-gray" />
				                <br />
				                <br />
				            </Row>

					          <Row className="pb-4">
					            <button className="btn btn-primary login-button"> Login
					            </button>
					          </Row>
									</form>

      }



          	</div>
      		</div>
  			</div>
			</div>
		)

	}
}
