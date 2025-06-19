import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../services/stripe.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Stripe, StripeElements, StripeAddressElement,StripeCardCvcElement, StripeCardNumberElement, StripeCardExpiryElement, StripePaymentElement,Appearance } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service'; 
import {MatFormFieldModule} from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  standalone: true,
  selector: 'app-checkout-page',
  imports: [ 
    CommonModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit{
  
  @ViewChild('cardInfo') cardInfo!: ElementRef;
  @ViewChild('addressInfo') addressInfo!: ElementRef;
  @ViewChild('cvcElement') cvcElement!: ElementRef;
  @ViewChild('cardNumberElement') cardNumberElement!: ElementRef;
  @ViewChild('expireElement') expireElement!: ElementRef;
  @ViewChild('paymentElement') paymentElement!: ElementRef;
  stripe!: Stripe | null;
  elements!: StripeElements | null;
  cvc!: StripeCardCvcElement | null;
  cardNumber!:  StripeCardNumberElement | null;
  expireDate!: StripeCardExpiryElement | null;
  address!: StripeAddressElement | null ;
  payment!: StripePaymentElement | null;
clientSecret: string | null = null;
  cardError: string | null = null;
  generalError: string | null = null;
  isProcessing = false;
  paymentSucceeded = false;
  cartItems: any[] = [];
  total = 0;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    EmailCtrl: ['', [Validators.required, Validators.email]],
  });
  isLinear = false;
  secondFormGroup = this._formBuilder.group({
    firstNameCtrl: ['', [Validators.required]],
    lastNameCtrl: ['', [Validators.required]],
    countryOrRegionCtrl: ['', [Validators.required]],
    Addressline1Ctrl: ['', [Validators.required]],
    Addressline2Ctrl: [''],
    cityCtrl: ['', [Validators.required]],
    StateCtrl: ['', [Validators.required]],
    zipCodeCtrl: ['', [Validators.required]],
    phoneNumber: [''],
  });
  thirdFormGroup = this._formBuilder.group({
    shippingMethod: ['', Validators.required]
   })
  shippingOptions = [
  {
    value: 'economy',
    label: 'Economy Shipping (7–10 days)',

    price: 0.0,
  },
  {
    value: 'standard',
    label: 'Standard Ground (5–7 days)',
    price: 14.99,
  },
  {
    value: 'express',
    label: 'Two Business Day',
    price: 32.94,
  }
];

  constructor(
    private stripeService: StripeService,
    private router: Router,
    private cartService: CartService
  ) { }
  onShipTo(){
    if(this.secondFormGroup.valid){
    console.log("Form Values:", this.secondFormGroup.value);
    }
    else{
      console.log("Second form group is invalid")
    }
  }
  onContinueAsGuest()
  {
    if(this.firstFormGroup.valid){
      console.log("Form Values:", this.firstFormGroup.value);
    }
    else{
      console.log("first form group invalid")
    }

  }
  onSubmit(){
    //show shipping choice
    if(this.thirdFormGroup.valid)
    {
      console.log("Form Values:", this.thirdFormGroup.value);
    }
    else{
      console.log("third form group invalid")
    }
    const selectedOption = this.shippingOptions.find(option => option.value === this.thirdFormGroup.value.shippingMethod);
    if(selectedOption)
    this.total += selectedOption.price;

  }

  ngOnInit() {

    this.cartItems = this.cartService.getFullCart(); 
    this.total = this.cartService.getCashTotal();     
  }

  async ngAfterViewInit() {

    const appearance: Appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: 'white',
        colorBackground: 'rgb(30, 30, 30)',
        colorText: 'white',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      }
    };
    this.stripe = await this.stripeService.getStripe();
    const createResp = await this.stripeService.createPaymentIntentMock();
    const clientSecret = createResp.clientSecret;
    this.stripe = await this.stripeService.getStripe();
    if (!this.stripe) {
      console.error('Stripe.js failed to load.');
      this.generalError = 'Payment system unavailable. Please try later.';
      return;
    }
    console.log(clientSecret);
    if (!clientSecret) {
      this.generalError = 'Failed to initialize payment.';
      return;
    }
    this.elements = this.stripe.elements({ clientSecret: clientSecret, appearance});
    this.payment = this.elements.create('payment');
    this.payment.mount(this.paymentElement.nativeElement);
  }

  ngOnDestroy() {
 
  }

  async onPay(event: Event) {
    event.preventDefault();//prevent page from reloading from form alternatively can get rid of form 

    if (!this.stripe || !this.elements) return;

    this.isProcessing = true;

    try {
      console.log("ASd");
      await this.elements.submit();//validate the form fields and collect any data required for wallets 
      const result = await this.stripe.confirmPayment({//
        elements: this.elements,
        confirmParams: {
          return_url: 'http://localhost:4200/home',  // change as needed
          payment_method_data: {
      billing_details: {
        name: `${this.secondFormGroup.value.firstNameCtrl! ?? ' '}' '${this.secondFormGroup.value.lastNameCtrl ?? ' '}`,
        email: this.firstFormGroup.value.EmailCtrl,
        phone: this.secondFormGroup.value.phoneNumber,
        address: {
          line1: this.secondFormGroup.value.Addressline1Ctrl,
          city: this.secondFormGroup.value.cityCtrl,
          state: this.secondFormGroup.value.StateCtrl,
          postal_code: this.secondFormGroup.value.zipCodeCtrl,
          country: this.secondFormGroup.value.countryOrRegionCtrl
        }
      }
    },
    shipping: {
      name: `${this.secondFormGroup.value.firstNameCtrl! ?? ' '}' '${this.secondFormGroup.value.lastNameCtrl ?? ' '}`,
      address: {
        line1: `${this.secondFormGroup.value.Addressline1Ctrl}`,
        city: `${this.secondFormGroup.value.cityCtrl}`,
        state: `${this.secondFormGroup.value.StateCtrl}`,
        postal_code: `${this.secondFormGroup.value.zipCodeCtrl}`,
        country: `${this.secondFormGroup.value.countryOrRegionCtrl}`
      }
    }
        },
       redirect: 'if_required',
      });

      if(result.paymentIntent&&result.paymentIntent.status ==="succeeded")
      {
        console.log("payment succeded");
        this.paymentSucceeded = true;
        this.isProcessing = false;
        setTimeout(() => {
        alert('Payment successful!');
        this.router.navigate(['/home']);
}, 10);
      }
    if (result.error) {
      console.error('Payment failed:', result.error.message);
      this.isProcessing = false;
      setTimeout(() => { alert(result.error.message)} , 10);
    }
  } catch (err: any) {
    console.error('Unexpected error:', err);
    this.isProcessing = false;
            setTimeout(() => {
  alert('Something went wrong!');
}, 10);
  }

  }
}



   /* this.address = this.elements.create('address',{ 
      mode : 'shipping',
      allowedCountries: ['US'],
    } );
    if(this.addressInfo)
    this.address.mount(this.addressInfo.nativeElement);
    this.cardNumber= this.elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cvc = this.elements.create('cardCvc');
    this.cvc.mount(this.cvcElement.nativeElement);
    this.expireDate = this.elements.create('cardExpiry');
    this.expireDate.mount(this.expireElement.nativeElement);*/