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
  // Fake value you'd get from a real backend
  return Promise.resolve({
    clientSecret: 'pi_xxxxxxxxxxxxxxxxxxxx', // use real one when ready
  });
}
}
