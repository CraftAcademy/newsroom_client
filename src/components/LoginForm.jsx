import React, { useState } from "react";
import { Grid, Button, Form, Input } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";
import "../css/index.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'

const LoginForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const signupMessage = useSelector((state) => state.messages.signupMessage);
  const history = useHistory();
  const { t } = useTranslation();

  const login = async (e) => {
    try {
      const response = await auth.signIn(
        e.target.email.value,
        e.target.password.value
      );

      if (response.success) {
        props.setUid(response.data.uid);
        props.setAuthenticated(true);
        history.goBack();
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };
  const signUp_message =
    props.uid === "" ? (
      <p>
        {t("Don't have an account?")}<br></br>
        <Link id="signup" name="Signup" to={{ pathname: "/sign_up" }}>
          {t("Click here to sign up")}
        </Link>
      </p>
    ) : (
      <p id="signedup">{t("Signed up sucessfully!")}</p>
    );
  return (
    <>
      <Grid className="login-container" verticalAlign="middle">
        <Grid.Column align="center">
          <h3 style={{ color: "black" }} id="error-message">
            {errorMessage}
          </h3>
          <Form unstackable id="login-form" onSubmit={login}>
            <h1>{t('Log in')}</h1>
            <h4>{t('Email')}</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4>{t('Password')}</h4>
            <Input name="password" type="password" id="password"></Input>
            <br></br>
            <Button id="submit">{t('Submit')}</Button>
            <br></br>
            {signUp_message}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;
