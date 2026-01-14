import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiProduct, shoppingCartItems , emailData , addressData , AllItems } from '../models/product.model';
import { firstValueFrom } from 'rxjs';
import { EmailValidator } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class StripeService {
  stripeUrl = 'http://localhost:3000/api/stripe/create-payment-intent';

 private stripePromise = loadStripe(environment.stripePublishableKey);
  constructor(private http: HttpClient) { }
  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }
  async createPaymentIntentMock(customerEmailData: emailData,customerAddressData: addressData,items: shoppingCartItems[], shipping: string): Promise<{ clientSecret: string }> {
    const allItems: AllItems = {
      products: items,
      shippingMethod: shipping,
      addressData: customerAddressData,
      EmailData: customerEmailData
    }
    //https://rxjs.dev/api/index/function/firstValueFrom
    const response = await firstValueFrom(this.http.post<{clientSecret: string}>(`${this.stripeUrl}`, { allItems },{ withCredentials: true }));
    console.log("response" , response);
    
    return {clientSecret: response.clientSecret};
}
}
