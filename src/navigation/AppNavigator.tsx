import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { ScreenerScreen } from "../screens/ScreenerScreen";
import { TradeDetailsScreen } from "../screens/TradeDetailsScreen";
import { COLORS } from "../theme/colors";

export type RootStackParamList = {
  Home: undefined;
  Screener: { initialSearch?: string } | undefined;
  TradeDetails: { tradeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: "800",
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screener"
          component={ScreenerScreen}
          options={{
            title: "Market Screener",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="TradeDetails"
          component={TradeDetailsScreen}
          options={{
            title: "Filing Details",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
