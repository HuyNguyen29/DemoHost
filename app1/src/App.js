// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

function App(props) {
  const StackMiniApp1 = props.createNativeStackNavigator();
  return (
    <StackMiniApp1.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackMiniApp1.Screen name="Screen1" component={Screen1} />
      <StackMiniApp1.Screen name="Screen2" component={Screen2} />
    </StackMiniApp1.Navigator>
  );
}

export default App;
