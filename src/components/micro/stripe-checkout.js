import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview'

const STRIPE_PK = 'pk_test_eEz0rYKkWOWGHnE40nEDEucP00HIFzhAy0';

export default function StripeCheckout(props) {
  const [response, setResponse] = useState('');
  const [description, setDescription] = useState('');
  const cartContext = useContext(Context);
  const route = useRoute();

  useEffect( _ => {
    convertCartToDesc();
  }, [])

  const convertCartToDesc = _ => {
    let cart = [];
    cartContext.cart.forEach(el => cart.push(el.product));
    setDescription(cart);
  }

  const onCheckStatus = async (res) => {
    console.log(res);
    setResponse(res);

    let jsonRes = JSON.parse(res);

    try {
      const data = {
        price: cartContext.total,
        cart: cartContext.cart,
        user: cartContext.user,
        authToken: jsonRes,
        location: cartContext.shootLocation,
        photographer: cartContext.curPhotographer,
        date: cartContext.date,
      }

      console.log(data);

      const makePayment = await axios.post(`https://avnw-api.herokuapp.com/user/pay`, data);

      if (makePayment) {
        props.navigation.navigate('Orders');
      } else {
        console.log('Could not make the payment');
      }
    } catch (err) { console.log(err) }
  }


  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Page</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script src="https://js.stripe.com/v3/"></script>
      <style>
        form {
          margin-top: 35%
          padding: 10;
        }

        .card-holder{
          display: flex;
          flex-direction: column;
          height: 180px;
          justify-content: space-around;
          background-color: #fff;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 0 8px #BBBBBB;
        }

        .card-element{
          padding: 10px;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .card-name{
          padding: 10px;
          color: #008CC1;
          font-weight: 400;
          font-size: 20px;
          background-color: transparent;
          border: none;
        }

        input {
          outline: none;
          color: #008CC1;
          font-size: 20px;
          font-weight: 500;
          background-color: transparent;
          margin-top: 25px;
        }
          
          .row{
            margin-top: 50px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

          .products-info{
            height: 150px;
            width: 100%;
            padding: 20px;
            text-align: center;
          }

          .card-errors{
            color: red;
          }

          .pay-btn{
            display: flex;
            height: 50px;
            justify-content: center;
            align-items: center;
          }

          .pay-btn-input{
            margin-top: 40px;
            padding: 12px;
            border-radius: 6px;
            background-color: #0078A4;
            color: #fff;
            border: none;
          }

      </style>
    </head>
    <body>
      <div class="container-fluid">
        <div class="row">
          <label class="card-errors" id="card-errors"></label>
        </div>
        <form>
          <div class="card-holder">
            <input type="text" placeholder="Full Name" id="card-name" class="card-name" />
            <div id="card-element" class="card-element">
              <div class="form-group">
                <label for="card_number">Carn Number</label>
                <input type="text" class="form-control" id="card_number" data-stripe="number">
              </div>
              <div class="form-row">
                <label>
                  <span>Card number</span>
                  <input type="text" size="20" data-stripe="number">
                </label>
              </div> 
                            
              <div class="form-row">
                <label>
                  <span>Expiration (MM/YY)</span>
                  <input type="text" size="2" data-stripe="exp_month">
                </label>
                <span> / </span>
                <input type="text" size="2" data-stripe="exp_year">
              </div>
                            
              <div class="form-row">
                <label>
                  <span>CVC</span>
                  <input type="text" size="4" data-stripe="cvc">
                </label>
                </div>
            
                <div class="form-row">
                <label>
                  <span>Billing Zip</span>
                  <input type="hidden" size="6" data-stripe="address_zip" value="400012">
                </label>
              </div>
            </div>
          </div>
          <div class="pay-btn">
            <input type="submit" class="pay-btn-input" value="Pay Now with Stripe" />
          </div>
        </form>
      </div>
        
        <script>
            var stripe = Stripe('${STRIPE_PK}');
            var elements = stripe.elements();

                var card = elements.create("card", {
                    hidePostalCode: true,
                    style: {
                        base: {
                        color: '#008CC1',
                        fontWeight: 500,
                        fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                        fontSize: '20px',
                        fontSmoothing: 'antialiased',
                        '::placeholder': {
                            color: '#008CC1',
                        },
                        ':-webkit-autofill': {
                            color: '#e39f48',
                        },
                    },
                    invalid: {
                        color: '#FC011F',
                        '::placeholder': {
                            color: '#FFCCA5',
                        },
                    },
                    }
                });

                card.mount('#card-element');

                function showCardError(error){
                    document.getElementById('card-errors').innerHTML = ""
                    if(error){
                        document.getElementById('card-errors').innerHTML = error
                    } 
                }
                
                card.on('change', function(event) {
                    if (event.complete) {
                        showCardError()
                    } else if (event.error) {
                        const { message} = event.error
                        console.log(message)
                        showCardError(message)
                    }
                });
                
                card.mount('#card-element');
                
                var paymentRequest = stripe.paymentRequest({
                    country: "US",
                    currency: "usd",
                    total: {
                        amount: ${cartContext.total * 100},
                        label: "Total"
                    }
                });

                var form =  document.querySelector('form');
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
    
                    var additionalData = {
                        name: document.getElementById('card-name').value,
                        address_line1: '${cartContext.user.address}',
                        address_line2:' ${cartContext.user.unit}',
                        address_city:  '${cartContext.user.city}',
                        address_state: '${cartContext.user.state}',
                        address_zip: '${cartContext.user.zip}',
                    };
    
                    stripe.createToken(card, additionalData).then(function(result) {
                    
                    console.log(result);
                    if (result.token) {
                        window.postMessage(JSON.stringify(result));
                    } else {
                        window.postMessage(JSON.stringify(result));
                    }
                });
                })
        </script>
    </body>
    </html>
  `;

  const injectedJavaScript = `(function() {
      window.postMessage = function(data){
          window.ReactNativeWebView.postMessage(data);
      };
  })()`;

  const onMessage = (event) => {
    const { data } =  event.nativeEvent;
    console.log(data)
    onCheckStatus(data)
  }

  return (
    <WebView
      javaScriptEnabled={true}
      style={[styles.webview]}
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  )
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    height: '100%',
    borderWidth: 1,
  }
});
