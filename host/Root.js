import * as React from "react";
import { AppRegistry, Text, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChunkManager } from "@callstack/repack/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Host from "./Host";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
      case "app1":
        url = `http://localhost:9000/${chunkId}.chunk.bundle`;
        break;
      case "app2":
        url = `http://localhost:9001/${chunkId}.chunk.bundle`;
        break;
      case "main":
      default:
        url =
          {
            // containers
            app1: "http://localhost:9000/app1.container.bundle",
            app2: "http://localhost:9001/app2.container.bundle",
          }[chunkId] ?? `http://localhost:8081/${chunkId}.chunk.bundle`;
        break;
    }

    return {
      url: `${url}?platform=${Platform.OS}`,
      excludeExtension: true,
    };
  },
});

async function loadComponent(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  // Download and execute container
  await ChunkManager.loadChunk(scope, "main");

  const container = self[scope];

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const exports = factory();
  return exports;
}

const App1 = React.lazy(() => loadComponent("app1", "./App.js"));

const App2 = React.lazy(() => loadComponent("app2", "./App.js"));

function App1Wrapper({ navigation, route }) {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading...</Text>}
    >
      <App1
        navigationHost={navigation}
        routeHost={route}
        createNativeStackNavigator={createNativeStackNavigator}
        Stack={Stack}
      />
    </React.Suspense>
  );
}

function App2Wrapper({ navigation, route }) {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading...</Text>}
    >
      <App2
        navigationHost={navigation}
        routeHost={route}
        createNativeStackNavigator={createNativeStackNavigator}
        Stack={Stack}
      />
    </React.Suspense>
  );
}

const Tab = createBottomTabNavigator();

export function Root() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Host"
        >
          <Tab.Screen name="Host" component={Host} />
          <Tab.Screen name="App1" component={App1Wrapper} />
          <Tab.Screen name="App2" component={App2Wrapper} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
