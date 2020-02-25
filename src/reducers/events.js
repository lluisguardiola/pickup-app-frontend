export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_EVENTS':
            return action.events
        default:
            return state
    }
}
