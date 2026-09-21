import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SignalStrength } from "../types/trade";
import { COLORS } from "../theme/colors";

type SignalBadgeProps = {
  strength: SignalStrength;
  label?: string;
  size?: "small" | "medium";
};

export const SignalBadge: React.FC<SignalBadgeProps> = ({
  strength,
  label,
  size = "medium",
}) => {
  let bgColor = COLORS.signalLowBg;
  let textColor = COLORS.signalLow;
  let borderColor = COLORS.signalLow;

  if (strength === "High") {
    bgColor = COLORS.signalHighBg;
    textColor = COLORS.signalHigh;
    borderColor = COLORS.signalHigh;
  } else if (strength === "Medium") {
    bgColor = COLORS.signalMediumBg;
    textColor = COLORS.signalMedium;
    borderColor = COLORS.signalMedium;
  }

  const isSmall = size === "small";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor, borderColor },
        isSmall && styles.containerSmall,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Signal strength ${strength}${label ? `: ${label}` : ""}`}
    >
      <View style={[styles.dot, { backgroundColor: textColor }]} />
      <Text
        style={[
          styles.text,
          { color: textColor },
          isSmall && styles.textSmall,
        ]}
      >
        {label || `${strength} Signal`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: COLORS.badgeRadius,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  containerSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 10,
  },
});
