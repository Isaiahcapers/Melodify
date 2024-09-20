export const initialState = {
    user:null,
    playlists: [],
    playing: false,
    item:null
}

const reducer = (state: any,action:any) => {
    console.log(action);

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state, // Keep whatever is in the current state
                user: action.user // Update the user with the user passed in
            }
        default: // If no action is passed in, return the current state
        return state;
    }
};

export default reducer;