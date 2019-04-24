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

const postUserPlace = (user_id, place_id) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      place_id: place_id
    })
  }
}



const adapter = {
  getUsers: () => fetch(USERS_BASE_URL).then(res => res.json()),
  getPlaces: () => fetch(PLACES_BASE_URL).then(res => res.json()),
  postUP: (user_id, place_id) => fetch(USER_PLACES_BASE_URL, postUserPlace(user_id, place_id))
  // patchKeyword: (newSubject, newKeyword_type, newPurpose) => fetch(KEYWORD_BASE_URL, patchOptions(newSubject, newKeyword_type, newPurpose)),
  // getIdea: () => fetch(IDEA_BASE_URL),
  // postIdea: (obj) => fetch(IDEA_BASE_URL, postOptions(obj)).then(res => res.json()),
  // getSavedIdeas: () => fetch(SAVED_LIST_BASE_URL),
}

export default adapter