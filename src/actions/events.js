export const fetchEvents = events => {
    return {
        type: 'FETCH_EVENTS',
        events
    }
}

export const fetchUserEvents = userEvents => {
    return {
        type: 'FETCH_USER_EVENTS',
        userEvents
    }
}