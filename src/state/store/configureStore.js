import { createStore, compose } from "redux";
import rootReducer from "../reducers/rootReducer";

const configureStore = () => {
  return createStore(
    rootReducer,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

export default configureStore;
