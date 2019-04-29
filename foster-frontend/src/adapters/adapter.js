const USERS_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/users'
const PLACES_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/places'
const USER_PLACES_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/user_places'

const postOptions = (obj) => {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(obj)
	}
}



// const patchOptions = (newSubject, newKeyword_type, newPurpose) => {
//   return {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       subject: newSubject,
//       keyword_type: newKeyword_type,
//       purpose: newPurpose
//     })
//   }
// }
//
// const postUserPlace = (userData) => {
// 	return {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json'
// 		},
// 		body: JSON.stringify(userData)
// 	}
// }


const adapter = {
	getCoords: (addressParams) => {
		fetch(`https://api.opencagedata.com/geocode/v1/json?q=${addressParams}&key=bf969171e8b3469084ef974ac797dd0f`)
			.then(res => res.json())
	},
	getUsers: () => fetch(USERS_BASE_URL).then(res => res.json()),
	getPlaces: () => fetch(PLACES_BASE_URL).then(res => res.json()),
	postPlace: (place_params) => fetch(PLACES_BASE_URL, postOptions(place_params)),
	postSuggestion: (userData) => fetch(USER_PLACES_BASE_URL, postOptions(userData))

}

export default adapter
