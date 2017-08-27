export default function (state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_INFO':
            return Object.assign({}, state, {
               userInfo: action.user
            });
    }
    return state;
}
