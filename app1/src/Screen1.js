import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

export default function Screen1(props) {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log(`%c props.route 1`, props.route);
    if (props?.data) {
      props.navigation.navigate("Screen2");
    }
  }, [props]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={backgroundStyle}>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="App 1">
            This screen comes from <Text style={styles.highlight}>app1</Text>{" "}
            container.
          </Section>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Screen2");
            }}
            style={{
              marginTop: 10,
              marginHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <Text>Navigate screen2 App1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("App2");
            }}
            style={{
              marginTop: 10,
              marginHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <Text>Navigate App2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("App2", { screen2: true });
            }}
            style={{
              marginTop: 10,
              marginHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <Text>Navigate screen2 App2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Host");
            }}
            style={{
              marginTop: 10,
              marginHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <Text>Navigate Host</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
