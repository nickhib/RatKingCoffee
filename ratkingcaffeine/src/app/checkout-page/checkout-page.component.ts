import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../services/stripe.service';
import { environment } from '../../environments/environment';
import { Stripe, StripeElements, StripeAddressElement,StripeCardCvcElement, StripeCardNumberElement, StripeCardExpiryElement, StripePaymentElement,Appearance } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service'; 
import {MatFormFieldModule} from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';

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
    MatRadioModule
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
  checkoutForm!: FormGroup;
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
shippingchoice: any;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient,
    private ngZone: NgZone,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
    this.cartItems = this.cartService.getCart(); 
    this.total = 24.99;     
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
    this.payment = this.elements.create('payment');
    this.payment.mount(this.paymentElement.nativeElement);
  }

  ngOnDestroy() {
 
  }

  async onPay() {

  }

}
