import React, { useState } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import Axios from "axios";
import "../css/CreateSubscription.css";
import { Segment, Button, Grid } from "semantic-ui-react";

const CreateSubscription = (props) => {
  //const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  const [subscriberStatus, setSubscriberStatus] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const submitPayment = async () => {
    const stripeResponse = await props.stripe.createToken();

    try {
      const paymentStatus = await Axios.post(
        "/subscriptions",
        { stripeToken: stripeResponse.token.id }
        //{ headers: headers }
      );
      if (paymentStatus.status === 200) {
        setSubscriberStatus(true);
        setTransactionMessage(paymentStatus.data.message);
        setTimeout(() => {
          setTransactionMessage("");
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment-container">
      {subscriberStatus ? (
        <div className="messages">
          <h2 id="transaction-message">{transactionMessage}</h2>
          <h1 id="subscriber-message">You are a subscriber!</h1>
        </div>
      ) : (
        <Segment inverted id="payment-interface">
          <h3>Subscription Options</h3>
          <div id="subscription-option">
            <input type="radio" id="1Month"></input>
            <label htmlFor="1Month">1 Month for only $10!</label>
            <input type="radio" id="12Month"></input>
            <label htmlFor="12Month">12 Months for only $80!</label>
          </div>

          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <label htmlFor="cardnumber">Card number</label>
                <Segment>
                  <CardNumberElement id="cardnumber" />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Column width={6}>
              <label htmlFor="exp-date">Expiry date</label>
              <Segment>
                <CardExpiryElement id="exp-date" />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <label htmlFor="cvc">CVC</label>
              <Segment>
                <CardCVCElement id="cvc" />
              </Segment>
            </Grid.Column>
          </Grid>
          <div>
            <Button basic inverted onClick={submitPayment}>
              Submit
            </Button>
          </div>
        </Segment>
      )}
    </div>
  );
};

export default injectStripe(CreateSubscription);
