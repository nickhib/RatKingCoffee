import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

 private stripePromise = loadStripe(environment.stripePublishableKey);
  constructor() { }
  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }
  async createPaymentIntentMock(): Promise<{ clientSecret: string }> {
     /*
     please produce client secret from stripe cli
     ./stripe payment_intents create   --amount=100   --currency=usd
     output should have client secrete you can replace pi_xxxxxxxxx with
     */
  return Promise.resolve({
    clientSecret: 'pi_xxxxxxxxxxxxxxx',
  });
}
}
