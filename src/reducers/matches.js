export default function matches(state = {matches: []}, action) {
    switch (action.type) {
        case 'ADD_MATCHES':
            return Object.assign({}, state, {
                matches: [...state.matches, ...action.matches]
            });
    }
    return state;
}