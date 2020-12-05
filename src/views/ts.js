import React from 'react';
import CloseIMG from '../assets/close.png';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet, StatusBar, ScrollView, View, Image, TouchableOpacity, Text, Platform } from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#fff"
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
    </View>
  );
}

export default function TS(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        { Platform.OS === 'ios' ? (
          <View style={styles.btn_view}>
            <TouchableOpacity onPressIn={ _ => props.navigation.goBack()}>
              <View style={styles.back_btn}>
                <Text style={styles.back_btn_text}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.close_btn}
            onPress={ _ => props.navigation.goBack()}>
            <Image style={styles.close_img} source={CloseIMG} />
          </TouchableOpacity>
        ) }
        <ScrollView style={styles.content}>
          <Text style={styles.header}>Terms of Services</Text>
          <View style={styles.ts_content}>
            <Text style={styles.h2}>BOOKING</Text>
            <Text style={styles.text}>
              For all (Non Wedding) photography sessions, the amount shall be paid in full, 
              the amount in full also includes the cancellation fee (30%). Upon cancellation, please read our 
              cancellation policy below.
            </Text>
            <Text style={styles.text}>
              For wedding packages; a $150 retainer is due immediately to book and hold the date of your 
              event and also serves as a cancellation fee.
            </Text>
            <Text style={styles.text}>
              The remaining balance is due two (2) weeks before the date of the wedding. You can break 
              this up into multiple payments however you see fit.
            </Text>

            <Text style={styles.h2}>PAYMENT</Text>
            <Text style={styles.text}>
              All (Non Wedding) photography sessions and packages need to be paid in full, and can be 
              paid via cash, check, Visa or MasterCard. If a client pays by check, the check must clear 
              and any uncleared check will have an additional charge of $35 to cover bank fees. 
            </Text>

            <Text style={styles.text}>
              All wedding photography bookings shall be able to make multiple payments however they see fit, 
              up until 2 weeks prior to the event. Contact us directly to make a payment so we may log any 
              payment(s) prior to your event date.
            </Text>

            <Text style={styles.h2}>CANCELLATION POLICY</Text>
            <Text style={styles.text}>
              For all (Non Wedding)  photography sessions, client forefeits their cancellation fee of 
              (30%). As previously stated, the fee can be credited towards a future session if the 
              client reschedules the appointment by calling, emailing or messaging us 72 hours prior 
              to the date of session and re-booking at an agreeable date and time.
            </Text>

            <Text style={styles.text}>
              For weddings and events, if for any reason the Client cancels before the wedding date, 
              the Photographer(s) will keep the the event retainer fee paid to hold the wedding or 
              event date as a cancellation fee. Cancellation must be made, and sent in writing, by 
              mail or e-mail. However, if the client requires to change the wedding date, we will 
              do our best to accommodate the change and no fee will be charged as long as the new 
              date is available and within five months of the original event date. If we are not 
              available for the new date, the original contract will be cancelled and subject to 
              the cancellation policy.
            </Text>

            <Text style={styles.text}>
              If Alpha Visuals Northwest cannot accomodate and perform this Contract due to fire 
              or other casualty, strike, act of God, or other cause beyond the control of the parties, 
              or due to Photographer’s illness or emergency, then the Photographer(s) shall return 
              the retainer fee to the Client but shall have no further liability with respect to the Contract. 
            </Text>

            <Text style={styles.text}>
              This limitation on liability shall also apply in the event that photographic materials are 
              damaged in processing, lost through camera or other media malfunction, lost in the mail, or 
              otherwise lost or damaged without fault on the part of the Photographer.
            </Text>

            <Text style={styles.text}>
              If the original photographer booked for the session cannot perform their service on the scheduled 
              date, we will offer a full refund, or reschedule to an appropriate date that will fit both parties. 
              We do have several photographers that can also help accommodate your photo session and can 
              offer their services if you choose. 
            </Text>

            <Text style={styles.text}>
              We try our hardest to accommodate all our clients, and their needs. Please contact us for further 
              assistance if there are additional questions needing to be answered.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

    content: {
      width: Dimensions.get('screen').width - 40,
    },

    btn_view: {
      alignSelf: 'flex-start',
      paddingBottom: 10,
    },

    back_btn: {
      marginTop: 15,
      marginLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      backgroundColor: '#0078A4',
    },

      back_btn_text: {
        fontWeight: 'bold',
        color: '#fff',
      },

    close_btn: {
      alignSelf: 'flex-end',
      marginTop: 20,
      marginRight: 20,
    },

      close_img: {
        width: 22,
        height: 22,
        opacity: 0.45,
      },

      header: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.75,
        textAlign: 'center',
        marginTop: 15,
      },

      ts_content: {
        paddingBottom: 20,
      },

        h2: {
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 18,
          color: '#000',
          opacity: 0.75,
        },

        text: {
          marginTop: 10,
          lineHeight: 18,
        },
});