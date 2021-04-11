import { REVIEWS_FETCH_SUCCESS } from './reviews.actions'

const initialState = {
  data: []
}

// updated reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
