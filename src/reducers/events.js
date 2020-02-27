const initialState = {
    homeEvents: null,
    userEvents: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_EVENTS':
            return {
                ...state,
                homeEvents: action.events
            }
        case 'FETCH_USER_EVENTS':
            return {
                ...state,
                userEvents: action.userEvents
            }
        default:
            return state
    }
}
