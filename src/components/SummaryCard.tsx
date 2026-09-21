import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
  type?: "purchase" | "sale" | "neutral" | "highlight";
  iconSymbol?: string;
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  type = "neutral",
  iconSymbol,
}) => {
  let accentColor = COLORS.accent;
  let bgGradient = COLORS.surface;

  if (type === "purchase") {
    accentColor = COLORS.purchase;
  } else if (type === "sale") {
    accentColor = COLORS.sale;
  } else if (type === "highlight") {
    accentColor = COLORS.accentPurple;
  }

  return (
    <View
      style={[styles.card, { backgroundColor: bgGradient }]}
      accessibilityRole="summary"
      accessibilityLabel={`${title}: ${value}, ${subtitle}`}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {iconSymbol && (
          <View style={[styles.iconContainer, { backgroundColor: accentColor + "20" }]}>
            <Text style={[styles.iconText, { color: accentColor }]}>{iconSymbol}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    padding: 14,
    borderRadius: COLORS.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
