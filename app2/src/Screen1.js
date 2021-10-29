import React, { useEffect, useState } from "react";
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
  const [screen2, setScreen2] = useState(global?.data?.route?.params?.screen2);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (screen2) {
      setTimeout(() => {
        props.navigation.navigate("Screen2");
        setScreen2(false);
      }, 500);
    }
  }, [props.navigation, screen2]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={backgroundStyle}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#68BBE3",
          }}
        >
          <Section title="App 2">
            This screen comes from <Text style={styles.highlight}>app2</Text>{" "}
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
            <Text>Navigate screen2 - app2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("App1");
            }}
            style={{
              marginTop: 10,
              marginHorizontal: 50,
              paddingVertical: 10,
              backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <Text>Navigate App1</Text>
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
