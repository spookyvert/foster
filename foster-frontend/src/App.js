import React, {
	Component
} from 'react';

import './App.css';
import Login from './components/Login';
import Main from './components/Main';


import {
	createBrowserHistory
} from 'history'

import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
export const history = createBrowserHistory();




export default class App extends Component {

	state = {
		currentUser: {}
	}


	componentDidMount() {
		let token = localStorage.getItem('token')
		if (token === null) {
			//
			// history.push('/login')


		} else {

			fetch('https://cryptic-chamber-27326.herokuapp.com/api/v1/current_user', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then(r => r.json())
				.then(data => this.setState({
					currentUser: data
				}))




			//
			// history.push('/')


		}


	}






	signupSubmitHandler = (e, userInfo) => {
		e.preventDefault()



		fetch("https://cryptic-chamber-27326.herokuapp.com/api/v1/users", {
				method: "POST",
				headers: {
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify({
					user: userInfo
				})
			})
			.then(resp => {
				console.log(resp.status);
				if (resp.status === 406) {
					document.querySelector(".error-username").style.display = "block";
				}

				return resp.json()
			})
			.then(userData => {

				localStorage.setItem("token", userData.jwt);
				this.setState({
					currentUser: userData
				});
			});
	};

	loginSubmitHandler = (e, userInfo) => {
		e.preventDefault()




		fetch("https://cryptic-chamber-27326.herokuapp.com/api/v1/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
					accepts: "application/json"
				},
				body: JSON.stringify({
					user: userInfo
				})
			})
			.then(resp => resp.json())
			.then(userData => {



				if (userData.jwt) {
					localStorage.setItem('token', userData.jwt)
					this.setState({
						currentUser: userData
					}, () => {
						//
						window.location.reload();

					})
				} else {
					document.querySelector(".help-signup").style.display = "block";

				}


			});






	};

	handleLogout = () => {

		this.setState({
			currentUser: {}
		}, () => window.location.reload())
		localStorage.removeItem("token");
		history.push("/login");

	}


	render() {

		let token = localStorage.getItem('token')
		if (token === null || token === 'undefined') {
			console.log('Please Login');
			history.push('/login');

		} else {
			history.push('/')



		}



		return (
			<BrowserRouter>
          <Switch>


            <Route
            exact
            path='/login'
            render={ (props) => <Login {...props} handleLogout={this.handleLogout} loginHandler={this.loginSubmitHandler} signupHandler={this.signupSubmitHandler}/>
            }
            />

          <Route
          exact
          path='/'
          render={ (props) => <Main {...props} currentUser={this.state.currentUser}  handleLogout={this.handleLogout} />
          }
          />
        </Switch>
      </BrowserRouter>
		)
	}
}
