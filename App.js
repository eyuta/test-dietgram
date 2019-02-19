import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
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
        console.log("error initializing Healthkit: ", err);
        return;
    }

    // Height Example
    AppleHealthKit.getDateOfBirth(null, (err, results) => {
    if (this._handleHealthkitError(err, 'getDateOfBirth')) {
      return;
    }
      console.log(results)
    });

});
} else {

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
