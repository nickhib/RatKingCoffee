# ecommerce-full-stack - under development,
There have been a lot of updates!<br>
Note:<br>
Stripe is not implemented on the backend yet, so one will have to provide a client secret and api key for some features. Refer to environment, and stripe service in app
1. Updated to the most recent Angular version.
2. Changed all components to be standalone and split up features for a more modular design
3. Rehaul of home page design: 
  ui/ux has changed. adopting a new, simple, and sleek design. 
  ![image](https://github.com/user-attachments/assets/3b80fa3a-1d05-4a33-92ab-e588e9a44813)
4. Rehaul of all products page design:<br>
  ui/ux has changed. adopting a new, simple, and sleek design. making use of a working filter.<br>
  ![image](https://github.com/user-attachments/assets/2ab504a1-5c6b-4208-a1d8-de50bd5ceaf6)<br>
5. Rehaul of the individual product page:<br>
   This page has a product carousel. Users are able to look at multiple photos of the specific product.<br>
   One can add any quantity they desire to the cart. One can glance at total reviews or perhaps add their own review if they desire.<br>
   ![image](https://github.com/user-attachments/assets/a66d55e5-b68e-45ae-8eac-ab880d9c9009)<br>
   ![image](https://github.com/user-attachments/assets/87a36d22-c035-4158-90ef-38ddce6e12f6)
6. Rehauled the cart page design: <br>
adopting a simple style, showing all items their respective quantities. Items have adjustable quantities on the cart page as well.<br>
Showing total cost on the checkout button.<br>
![image](https://github.com/user-attachments/assets/b882c9d4-8ef5-4505-b67c-bb307a7330dc)<br>
7. Rehauled checkout with Stripe API<br>
adopting Angular Material components such as mat-stepper. Collects email for guests. Collects shipping info, then collects shipping method, and lastly<br>
The application will collect payment information, process it, and then return an alert if it succeeds. The user will be redirected to the home on success.<br>
![image](https://github.com/user-attachments/assets/589afca9-9d31-480e-b857-96c6108267fc)<br>
![image](https://github.com/user-attachments/assets/a6a0bf64-4ec4-4ead-80f1-057c7b9759f6)<br>

![image](https://github.com/user-attachments/assets/e4d22284-5efc-44b8-9758-f20c4e795a13)<br>
![image](https://github.com/user-attachments/assets/5b750f4c-a119-4d5d-845b-c3ed756fa97e)<br>








  Adding in animations here and there,<br>
Next steps: <br>
more ui overhauls:<br>
deal with potential bugs with UI, such as sizing<br>
Update api / redesign it to work with Stripe and all other functions of the website.<br>
Integrate Woocommerce, send receipts to users' emails on purchase<br>
