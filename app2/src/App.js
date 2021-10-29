// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

// const Stack = createNativeStackNavigator();

function App(props) {
  const Stack = props.Stack;
  global.data = props;
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
    // </NavigationContainer> */}
    // <Screen1 {...props} />
  );
}

export default App;
