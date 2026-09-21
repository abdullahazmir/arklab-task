import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type MockActivityChartProps = {
  data?: number[];
  type?: "purchase" | "sale";
};

export const MockActivityChart: React.FC<MockActivityChartProps> = ({
  data = [35, 50, 70, 45, 80, 110, 140],
  type = "purchase",
}) => {
  const maxVal = Math.max(...data, 1);
  const barColor = type === "purchase" ? COLORS.purchase : COLORS.sale;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View
      style={styles.container}
      accessibilityRole="image"
      accessibilityLabel="Mock 7-day activity bar chart visual"
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.pulseDot, { backgroundColor: barColor }]} />
          <Text style={styles.title}>Mock 7-day activity</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FICTIONAL DEMO</Text>
        </View>
      </View>

      <View style={styles.chartArea}>
        {data.map((value, index) => {
          const heightPercent = Math.max((value / maxVal) * 100, 12);
          const isHighest = value === maxVal;
          return (
            <View key={index} style={styles.barGroup}>
              <Text style={[styles.barValueText, isHighest && { color: barColor }]}>
                {value}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${heightPercent}%`,
                      backgroundColor: isHighest ? barColor : barColor + "80",
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{days[index] || `D${index + 1}`}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.footerNote}>
        Relative daily demo transaction density & volume index
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: COLORS.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  badge: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.accentPurple,
    letterSpacing: 0.5,
  },
  chartArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingTop: 20,
    paddingBottom: 4,
  },
  barGroup: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barValueText: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: "600",
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 70,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 7,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 7,
  },
  dayLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 6,
    fontWeight: "500",
  },
  footerNote: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic",
  },
});
