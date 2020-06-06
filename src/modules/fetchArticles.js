import axios from 'axios'

const fetchArticleList = async ({dispatch, location}) => {
  try {
    const response = await axios.get("/articles", { location: location });
    dispatch({
      type: "FETCH_ARTICLE_LIST",
      payload: response.data.articles
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchSingleArticle = async ({dispatch, id}) => {
  try {
    const response = await axios.get(`/articles/${id}`);
    dispatch({ 
      type: "SET_ACTIVE_ARTICLE", 
      payload: response.data.article 
    });
  } catch (error) {
    console.log(error)
  }
}

export { fetchArticleList, fetchSingleArticle }