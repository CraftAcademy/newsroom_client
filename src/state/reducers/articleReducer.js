import initialState from "../store/initialState";

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_ARTICLE":
      return {
        ...state,
        activeArticle: action.payload,
      };
    case "FETCH_ARTICLE_LIST":
      return {
        ...state,
        articleList: action.payload,
      }
    default:
      return state;
  }
};
export default articleReducer;
