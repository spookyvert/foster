import {
  createBrowserHistory,
} from 'history';

export const history = createBrowserHistory();

const USERS_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/users';
const PLACES_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/places';
const USER_PLACES_BASE_URL = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/user_places';
const CURRENT_USER = 'https://cryptic-chamber-27326.herokuapp.com/api/v1/current_user';

const postOptions = obj => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(obj),
});

const sessionOptions = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const adapter = {
  getCoords: (addressParams) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${addressParams}&key=bf969171e8b3469084ef974ac797dd0f`)
      .then(res => res.json());
  },
  getUsers: () => fetch(USERS_BASE_URL).then(res => res.json()),
  getPlaces: () => fetch(PLACES_BASE_URL).then(res => res.json()),
  postPlace: placeParams => fetch(PLACES_BASE_URL, postOptions(placeParams)),
  postSuggestion: userData => fetch(USER_PLACES_BASE_URL,
    postOptions(userData)).then(res => res.json()),
  getCurrentUser: token => fetch(CURRENT_USER, sessionOptions(token)),
  getMarkerSuggestions: () => fetch(USER_PLACES_BASE_URL).then(res => res.json()),

};


export default adapter;
