interface UserState {
    id: string
    username: string
    email: string
}

const initialState: UserState = {
    id: '',
    username: '',
    email: '',
}

export default function userReducer(
    state: UserState = initialState,
    action: any
) {
    // TODO add typing & initialState
    switch (action.type) {
        case 'CREATE_USER':
            // TODO add destructuring and some more logic
            return { ...state, ...action.user }
        case 'REMOVE_USER':
            return { ...initialState }
        default:
            return state
    }
}
