import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/router';
import AuthProvider from './provider/AuthProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NiGUwHXmNJoGw98lQczyIk3YqrRWgeFdHmkkBUP83JVRjUu0WK6S8Y3wdNeAudK3MRrg2mB9ojQklK88owe9NCa00SUW63r4Z"); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </AuthProvider>  
  </StrictMode>
);

