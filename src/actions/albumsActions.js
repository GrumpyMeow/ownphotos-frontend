import axios from "axios";
import {Server} from '../api_client/apiClient'


export function fetchThingAlbumsList() {
  return function(dispatch) {
    dispatch({type:"FETCH_THING_ALBUMS_LIST"});
    Server.get("albums/thing/list/")
      .then((response) => {
        dispatch({type:"FETCH_THING_ALBUMS_LIST_FULFILLED", payload: response.data.results})
      })
      .catch((err) => {
        dispatch({type:"FETCH_THING_ALBUMS_LIST_REJECTED", payload: err})        
      })
  }
}

export function fetchThingAlbum(album_id) {
  return function(dispatch) {
    dispatch({type:"FETCH_THING_ALBUMS"});
    Server.get(`albums/thing/${album_id}/`)
      .then((response) => {
        dispatch({type:"FETCH_THING_ALBUMS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type:"FETCH_THING_ALBUMS_REJECTED", payload: err})        
      })
  }
}







export function fetchPlaceAlbumsList() {
  return function(dispatch) {
    dispatch({type:"FETCH_PLACE_ALBUMS_LIST"});
    Server.get("albums/place/list/")
      .then((response) => {
        dispatch({type:"FETCH_PLACE_ALBUMS_LIST_FULFILLED", payload: response.data.results})
      })
      .catch((err) => {
        dispatch({type:"FETCH_PLACE_ALBUMS_LIST_REJECTED", payload: err})        
      })
  }
}

export function fetchPlaceAlbum(album_id) {
  return function(dispatch) {
    dispatch({type:"FETCH_PLACE_ALBUMS"});
    Server.get(`albums/place/${album_id}/`)
      .then((response) => {
        dispatch({type:"FETCH_PLACE_ALBUMS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type:"FETCH_PLACE_ALBUMS_REJECTED", payload: err})        
      })
  }
}







export function fetchPeopleAlbums(person_id) {
  return function(dispatch) {
    dispatch({type: "FETCH_PEOPLE_ALBUMS"});
    Server.get(`albums/person/${person_id}/`)
      .then((response) => {
        dispatch({type: "FETCH_PEOPLE_ALBUMS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PEOPLE_ALBUMS_REJECTED", payload: err})
      })
  }
}


export function generateAutoAlbums() {
	return function(dispatch) {
		dispatch({type: "GENERATE_AUTO_ALBUMS"})
    Server.get("autoalbumgen/")
      .then((response) => {
        dispatch({type: "GENERATE_AUTO_ALBUMS_FULFILLED", payload: response.data})
        dispatch(fetchAutoAlbums())
      })
      .catch((err) => {
        dispatch({type: "GENERATE_AUTO_ALBUMS_REJECTED", payload: err})
      })
	}
}


export function fetchAutoAlbums() {
  return function(dispatch) {
    dispatch({type: "FETCH_AUTO_ALBUMS"});
    Server.get("albums/auto/?page_size=50")
      .then((response) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_FULFILLED", payload: response.data.results})
      })
      .catch((err) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_REJECTED", payload: err})
      })
  }
}

//actions using new list view in backend

export function fetchAutoAlbumsList() {
  return function(dispatch) {
    dispatch({type: "FETCH_AUTO_ALBUMS_LIST"});
    Server.get("albums/auto/list/")
      .then((response) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_LIST_FULFILLED", payload: response.data.results})
      })
      .catch((err) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_LIST_REJECTED", payload: err})
      })
  }
}

export function fetchDateAlbumsList() {
  return function(dispatch) {
    dispatch({type: "FETCH_DATE_ALBUMS_LIST"});
    Server.get("albums/date/list/",{timeout:100000})
      .then((response) => {
        dispatch({type: "FETCH_DATE_ALBUMS_LIST_FULFILLED", payload: response.data.results})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATE_ALBUMS_LIST_REJECTED", payload: err})
      })
  }
}

export function fetchDateAlbumsPhotoHashList() {
  return function(dispatch) {
    dispatch({type: "FETCH_DATE_ALBUMS_PHOTO_HASH_LIST"});
    Server.get("albums/date/photohash/list/",{timeout:100000})
      .then((response) => {
        var idx2hash = [] 
        response.data.results.forEach((day)=>{
            day.photos.forEach((photo)=>{
                idx2hash.push(photo.image_hash)
            })
        })
        dispatch({type: "FETCH_DATE_ALBUMS_PHOTO_HASH_LIST_FULFILLED", payload: response.data.results})
        dispatch({type: "SET_IDX_TO_IMAGE_HASH", payload: idx2hash})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATE_ALBUMS_PHOTO_HASH_LIST_REJECTED", payload: err})
      })
  }
}

//actions using new retrieve view in backend

export function fetchAlbumsAutoGalleries(album_id) {
  return function(dispatch) {
    dispatch({type: "FETCH_AUTO_ALBUMS_RETRIEVE"});
    console.log(`albums/auto/${album_id}/`)

    Server.get(`albums/auto/${album_id}/`)
      .then((response) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_RETRIEVE_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_AUTO_ALBUMS_RETRIEVE_REJECTED", payload: err})
      })
  }
}

export function fetchAlbumsDateGalleries(album_id) {
  return function(dispatch) {
    dispatch({type: "FETCH_DATE_ALBUMS_RETRIEVE"});
    Server.get(`albums/date/${album_id}/`)
      .then((response) => {
        dispatch({type: "FETCH_DATE_ALBUMS_RETRIEVE_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DATE_ALBUMS_RETRIEVE_REJECTED", payload: err})
      })
  }
}

export function toggleAlbumAutoFavorite(album_id,rating) {
  return function(dispatch) {
    dispatch({type: "TOGGLE_ALBUM_AUTO_FAVORITE"});
    Server.patch(`albums/auto/list/${album_id}/`,{favorited:rating})
      .then((response) => {
        console.log('patch request made. response',response)
        dispatch({type: "TOGGLE_ALBUM_AUTO_FAVORITE_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "TOGGLE_ALBUM_AUTO_FAVORITE_REJECTED", payload: err})
      })
  }
}



