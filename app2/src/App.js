// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import { Provider } from "react-redux";
import { store } from "./store";
import { testRedux } from "./redux/actionTest";

function App(props) {
  const StackMiniApp2 = props.createNativeStackNavigator();

  React.useEffect(() => {
    if (props?.routeHost?.params?.screen2) {
      store.dispatch(testRedux(props.routeHost));
    }
  }, [props?.routeHost?.params?.id]);
  return (
    <Provider store={store}>
      <StackMiniApp2.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackMiniApp2.Screen name="Screen1" component={Screen1} />
        <StackMiniApp2.Screen name="Screen2" component={Screen2} />
      </StackMiniApp2.Navigator>
    </Provider>
  );
}

export default App;
