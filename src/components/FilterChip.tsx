import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  count?: number;
};

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected,
  onPress,
  count,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected ? styles.chipSelected : styles.chipUnselected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Filter ${label}${count !== undefined ? `, ${count} items` : ""}`}
    >
      <Text
        style={[
          styles.text,
          isSelected ? styles.textSelected : styles.textUnselected,
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={[
            styles.badgeText,
            isSelected ? styles.badgeTextSelected : styles.badgeTextUnselected,
          ]}
        >
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: COLORS.chipRadius,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.accent,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
  textUnselected: {
    color: COLORS.textSecondary,
  },
  textSelected: {
    color: COLORS.accent,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  badgeTextUnselected: {
    backgroundColor: COLORS.border,
    color: COLORS.textMuted,
  },
  badgeTextSelected: {
    backgroundColor: COLORS.accentGlow,
    color: COLORS.accent,
  },
});
