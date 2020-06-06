import React, { useState, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import Navbar from "./components/Navbar";
import CreateSubscription from "./components/CreateSubscription";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { useDispatch } from "react-redux";
import { getPlace } from "./modules/location";
import auth from "./modules/auth";

const App = (props) => {
  const [uid, setUid] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    getPlace(dispatch);
    if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
      const tokenParams = JSON.parse(
        localStorage.getItem("J-tockAuth-Storage")
      );
      try {
        const response = await auth.validateToken(tokenParams);
        setAuthenticated(response.success);
        setUid(response.data.uid);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <>
      <Header
        uid={uid}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      >
        <Suspense fallback={<div>Loading</div>} />
      </Header>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ArticleList}></Route>
        <Route
          exact
          path="/article/:id"
          render={() => <SingleArticle authenticated={authenticated} />}
        ></Route>
        <Route exact path="/category/:category" component={ArticleList}></Route>
        <Route
          exact
          path="/subscription"
          render={() => <CreateSubscription authenticated={authenticated} />}
        ></Route>
        <Route
          exact
          path="/sign_in"
          render={() => (
            <LoginForm
              uid={uid}
              setUid={setUid}
              setAuthenticated={setAuthenticated}
            />
          )}
        ></Route>
        <Route
          exact
          path="/sign_up"
          render={() => <SignUpForm setUid={setUid} />}
        ></Route>
      </Switch>
    </>
  );
};
export default App;
