import axios from "axios";
import {Server} from '../api_client/apiClient'

export function searchPhotos(query) {
  return function(dispatch) {
    if (query.trim().length == 0) {
      dispatch({type:"SEARCH_PHOTOS_EMPTY_QUERY_ERROR"})
    } else {
      var url = `photos/?search=${query}`
      console.log(url)
      dispatch({type:"SEARCH_PHOTOS",payload: query});
      Server.get(`photos/list/?search=${query}`,{timeout:100000})
        .then((response) => {
          dispatch({type:"SEARCH_PHOTOS_FULFILLED",payload: response.data.results})
        }) 
        .catch((err) => {
          dispatch({type:"SEARCH_PHOTOS_REJECTED",payload: err})        
        })
    }
  }
}
