import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { InsiderTrade } from "../types/trade";
import { COLORS } from "../theme/colors";
import { formatCurrency } from "../utils/formatters";
import { SignalBadge } from "./SignalBadge";

type TradeCardProps = {
  trade: InsiderTrade;
  onPress: () => void;
};

export const TradeCard: React.FC<TradeCardProps> = ({ trade, onPress }) => {
  const isPurchase = trade.type === "purchase";
  const badgeColor = isPurchase ? COLORS.purchase : COLORS.sale;
  const badgeBg = isPurchase ? COLORS.purchaseBg : COLORS.saleBg;
  const badgeBorder = isPurchase ? COLORS.purchaseBorder : COLORS.saleBorder;
  const arrowSymbol = isPurchase ? "↑" : "↓";
  const typeText = isPurchase ? "Purchase" : "Sale";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${trade.company} ticker ${trade.ticker}, ${typeText} of ${formatCurrency(trade.value)} by ${trade.insider} ${trade.role}`}
    >
      {/* Top Header: Ticker, Company & Signal Strength */}
      <View style={styles.topRow}>
        <View style={styles.tickerBadgeContainer}>
          <View style={styles.tickerPill}>
            <Text style={styles.tickerText}>{trade.ticker}</Text>
          </View>
          <Text style={styles.companyText} numberOfLines={1}>
            {trade.company}
          </Text>
        </View>
        <SignalBadge strength={trade.signalStrength} size="small" />
      </View>

      {/* Main Stats: Type + Arrow & Formatted Value */}
      <View style={styles.middleRow}>
        <View style={[styles.typeBadge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
          <Text style={[styles.arrowText, { color: badgeColor }]}>{arrowSymbol}</Text>
          <Text style={[styles.typeText, { color: badgeColor }]}>{typeText}</Text>
        </View>
        <Text style={styles.valueText}>{formatCurrency(trade.value)}</Text>
      </View>

      {/* Details Row: Insider, Role & Filing Time */}
      <View style={styles.bottomRow}>
        <Text style={styles.insiderText} numberOfLines={1}>
          {trade.insider} • <Text style={styles.roleText}>{trade.role}</Text>
        </Text>
        <Text style={styles.dateText}>{trade.filedAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: COLORS.cardRadius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tickerBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  tickerPill: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tickerText: {
    color: COLORS.accent,
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  companyText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  arrowText: {
    fontWeight: "900",
    fontSize: 14,
    marginRight: 4,
  },
  typeText: {
    fontWeight: "700",
    fontSize: 13,
  },
  valueText: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  insiderText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  roleText: {
    color: COLORS.accentPurple,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
});
