import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { MOCK_TRADES } from "../data/mockTrades";
import { formatCurrency, formatNumber, formatDate } from "../utils/formatters";
import { COLORS } from "../theme/colors";
import { SignalBadge } from "../components/SignalBadge";
import { MockActivityChart } from "../components/MockActivityChart";

type TradeDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TradeDetails">;
  route: RouteProp<RootStackParamList, "TradeDetails">;
};

export const TradeDetailsScreen: React.FC<TradeDetailsScreenProps> = ({ navigation, route }) => {
  const { tradeId } = route.params;
  const trade = MOCK_TRADES.find((t) => t.id === tradeId) || MOCK_TRADES[0];

  const isPurchase = trade.type === "purchase";
  const badgeColor = isPurchase ? COLORS.purchase : COLORS.sale;
  const badgeBg = isPurchase ? COLORS.purchaseBg : COLORS.saleBg;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* Navigation Header */}
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.demoPill}>
            <Text style={styles.demoPillText}>FICTIONAL DEMO DATA</Text>
          </View>
        </View>

        {/* Company Title & Ticker Row */}
        <View style={styles.companyHeader}>
          <View style={styles.companyTitleGroup}>
            <View style={styles.tickerPill}>
              <Text style={styles.tickerText}>{trade.ticker}</Text>
            </View>
            <Text style={styles.companyName}>{trade.company}</Text>
          </View>
          <Text style={styles.sectorText}>{trade.sector}</Text>
        </View>

        {/* Signal Highlight Banner */}
        <View style={[styles.signalBanner, { backgroundColor: badgeBg, borderColor: badgeColor + "40" }]}>
          <View style={styles.signalBannerTop}>
            <SignalBadge strength={trade.signalStrength} label={trade.signal} />
            <Text style={[styles.signalValueText, { color: badgeColor }]}>
              {formatCurrency(trade.value)}
            </Text>
          </View>
          <Text style={styles.signalDescription}>
            {isPurchase
              ? `Fictional ${trade.role} insider buy of ${formatNumber(trade.shares)} shares at $${trade.pricePerShare.toFixed(2)}.`
              : `Fictional ${trade.role} insider sale of ${formatNumber(trade.shares)} shares at $${trade.pricePerShare.toFixed(2)}.`}
          </Text>
        </View>

        {/* Structured Grid Metrics */}
        <Text style={styles.sectionHeader}>Filing Specifications</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Insider</Text>
              <Text style={styles.gridValuePrimary}>{trade.insider}</Text>
              <Text style={styles.gridValueSub}>{trade.role}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Transaction</Text>
              <Text style={[styles.gridValuePrimary, { color: badgeColor }]}>
                {isPurchase ? "Purchase ↑" : "Sale ↓"}
              </Text>
              <Text style={styles.gridValueSub}>SEC Code: {trade.transactionCode}</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Volume</Text>
              <Text style={styles.gridValuePrimary}>{formatNumber(trade.shares)}</Text>
              <Text style={styles.gridValueSub}>shares</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Price / Share</Text>
              <Text style={styles.gridValuePrimary}>${trade.pricePerShare.toFixed(2)}</Text>
              <Text style={styles.gridValueSub}>mock rate</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Total Value</Text>
              <Text style={styles.gridValuePrimary}>{formatCurrency(trade.value)}</Text>
              <Text style={styles.gridValueSub}>demo valuation</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Signal Category</Text>
              <Text style={styles.gridValuePrimary}>{trade.signal}</Text>
              <Text style={styles.gridValueSub}>Strength: {trade.signalStrength}</Text>
            </View>
          </View>

          <View style={[styles.gridRow, { borderBottomWidth: 0 }]}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Transaction Date</Text>
              <Text style={styles.gridValuePrimary}>{formatDate(trade.transactionDate)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Filing Time</Text>
              <Text style={styles.gridValuePrimary}>{trade.filedAt}</Text>
            </View>
          </View>
        </View>

        {/* Custom 7-Day Activity Visual Chart */}
        <MockActivityChart data={trade.historicalActivity} type={trade.type} />

        {/* Educational Section ("Why this matters") */}
        <View style={styles.educationalCard}>
          <Text style={styles.educationalTitle}>💡 Why This Signal Matters</Text>
          <Text style={styles.educationalBody}>
            {isPurchase
              ? "Open-market insider purchases often indicate that company leadership holds positive conviction regarding the firm's strategic trajectory and underlying intrinsic value."
              : "Executive sales are common for portfolio diversification, option exercises, or pre-planned trading schedules, though large clusters can signal cautious sentiment."}
          </Text>
        </View>

        {/* Mandatory Required Disclaimer Box */}
        <View style={styles.disclaimerBox} accessibilityRole="text">
          <Text style={styles.disclaimerHeader}>⚠️ Mandatory Legal & Prototype Disclaimer</Text>
          <Text style={styles.disclaimerBody}>
            This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 12,
  },
  backButtonText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: "700",
  },
  demoPill: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  demoPillText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.accentPurple,
    letterSpacing: 0.5,
  },
  companyHeader: {
    marginBottom: 16,
  },
  companyTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tickerPill: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tickerText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.textPrimary,
    flex: 1,
  },
  sectorText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  signalBanner: {
    borderRadius: COLORS.cardRadius,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  signalBannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  signalValueText: {
    fontSize: 22,
    fontWeight: "900",
  },
  signalDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  gridContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: COLORS.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  gridItem: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 3,
  },
  gridValuePrimary: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  gridValueSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  educationalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: COLORS.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  educationalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  educationalBody: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  disclaimerBox: {
    backgroundColor: COLORS.disclaimerBg,
    borderRadius: COLORS.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.disclaimerBorder,
    marginTop: 8,
  },
  disclaimerHeader: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.accentPurple,
    marginBottom: 6,
  },
  disclaimerBody: {
    fontSize: 12,
    color: COLORS.disclaimerText,
    lineHeight: 17,
    fontStyle: "italic",
  },
});
