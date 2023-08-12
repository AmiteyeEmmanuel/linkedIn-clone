import { SET_LOADING_STATUS, GET_ARTICLES } from "../app/actionType";


export const initstate = {
    post: [],
    loading: false,
}

const articleReducer = (state = initstate, action) => {
    switch(action.type) {
        case GET_ARTICLES: 
            return {
                ...state,
                post: action.payload,
            }
        case SET_LOADING_STATUS: 
            return { 
                ...state,
                loading: action.status,
                };
        default:
            return state;
    }
};

export const selectLoading = (state) => state.postState.loading;

export const selectArticle = (state) => state.postState.post;


export default articleReducer;

