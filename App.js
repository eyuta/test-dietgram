import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit from "react-native-google-fit";
import {
  Platform,
} from 'react-native';

if (Platform.OS === 'ios') {
  let options = {
    permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex", "ActiveEnergyBurned"],
        write: ["Height", "Weight", "StepCount", "BodyMassIndex", "Biotin", "Caffeine", "Calcium", "Carbohydrates", "Chloride", "Cholesterol", "Copper", "EnergyConsumed", "FatMonounsaturated", "FatPolyunsaturated", "FatSaturated", "FatTotal", "Fiber", "Folate", "Iodine", "Iron", "Magnesium", "Manganese", "Molybdenum", "Niacin", "PantothenicAcid", "Phosphorus", "Potassium", "Protein", "Riboflavin", "Selenium", "Sodium", "Sugar", "Thiamin", "VitaminA", "VitaminB12", "VitaminB6", "VitaminC", "VitaminD", "VitaminE", "VitaminK", "Zinc", "Water"]
    }
  };
  AppleHealthKit.initHealthKit(options, (err, results) => {
    if (err) {
        console.warn("error initializing Healthkit!!: ", err);
        return;
    }
    let d = new Date(2016,1,1);
    let options = {
        date: d.toISOString()
    };
    // Height Example
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
          return;
      }
      console.warn(results)
  });

});
} else {
  GoogleFit.onAuthorize(() => {
    console.log('AUTH SUCCESS');
  });

  GoogleFit.onAuthorizeFailure(() => {
    console.log('AUTH ERROR');
  });

  GoogleFit.authorize();
  const options = {
    startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
    endDate: new Date().toISOString() // required ISO8601Timestamp
  };

  GoogleFit.getDailyStepCountSamples(options, (err, res) => {
    if (err) {
      throw err;
    }

    console.log("Daily steps >>>", res);
  });

}




export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
