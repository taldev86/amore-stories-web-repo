import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './PayStripe.css'
import clientSecret from '../Secrets/Stripe_Client_Secret';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckoutForm = ({ hanleCallback, amount }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [isLoadingStripe, setIsLoadingStripe] = useState(false)

  const handleSubmit = async (secretKeyis) => {
    setIsLoadingForm(true)
    if (elements == null) {
      setIsLoadingForm(false)
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setIsLoadingForm(false)
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: secretKeyis,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required"
    });

    if (error) {
      setIsLoadingForm(false)
      setErrorMessage(error.message);
    } else {
      setIsLoadingForm(false)
      hanleCallback("success")
      toast.info("Congratulations you have made your purchase, Thank You!")
    }
  };

  const ObtainSecret = async (event) => {
    event.preventDefault();
    setIsLoadingStripe(true)
    const user = localStorage.getItem('user');

    const data = {
      currency: "usd",
      email: JSON.parse(user).email,
      amount: amount,
      paymentMethodType: "card"
    };

    const url = "https://jiabxmgv39.us.aircode.run/payment";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        setIsLoadingStripe(false)
        handleSubmit(data.client_secret);
      })
      .catch(error => {
        setIsLoadingStripe(false)
        return null
      });
  }

  return (
    <form
      className='FormBody'
      onSubmit={ObtainSecret}>
      <PaymentElement />
      <button type="submit" className='bg-red' disabled={!stripe || !elements || isLoadingForm || isLoadingStripe}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};


const PayStripe = ({ amount, hanleCallback }) => {
  const options = {
    mode: 'payment',
    amount: amount,
    currency: 'usd',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm hanleCallback={hanleCallback} amount={amount} />
    </Elements>
  )

};


export default PayStripe
