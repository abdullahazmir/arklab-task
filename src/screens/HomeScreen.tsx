import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { MOCK_TRADES } from "../data/mockTrades";
import { computeSummaryMetrics, formatCurrency } from "../utils/formatters";
import { COLORS } from "../theme/colors";
import { SummaryCard } from "../components/SummaryCard";
import { TradeCard } from "../components/TradeCard";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const metrics = computeSummaryMetrics(MOCK_TRADES);
  const latestTrades = MOCK_TRADES.slice(0, 5);

  const handleSearchSubmit = () => {
    navigation.navigate("Screener", { initialSearch: searchQuery });
  };

  const handleSignalSelect = (signalName: string) => {
    navigation.navigate("Screener", { initialSearch: signalName });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <View style={styles.titleBadgeRow}>
              <Text style={styles.headerTitle}>Market Pulse</Text>
              <View style={styles.demoBadge}>
                <Text style={styles.demoBadgeText}>MOCK DEMO DATA</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>
              Fictional insider-trading discovery concept
            </Text>
          </View>
        </View>

        {/* Mandatory Safe Wording Banner */}
        <View style={styles.safeWordingBanner}>
          <Text style={styles.safeWordingText}>
            ℹ️ Original mobile concept inspired by the insider-activity product category; all displayed content is fictional mock/demo data.
          </Text>
        </View>

        {/* Search Input Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ticker, company, or insider..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            accessibilityLabel="Search ticker or company input field"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchSubmit}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Search button"
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Metrics Section */}
        <Text style={styles.sectionTitle}>Today's Demo Activity</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryScroll}
        >
          <SummaryCard
            title="Demo Filings"
            value={`${metrics.totalFilings}`}
            subtitle="filings recorded"
            type="neutral"
            iconSymbol="📊"
          />
          <SummaryCard
            title="Total Purchases"
            value={formatCurrency(metrics.totalPurchases)}
            subtitle="fictional buys"
            type="purchase"
            iconSymbol="↑"
          />
          <SummaryCard
            title="Total Sales"
            value={formatCurrency(metrics.totalSales)}
            subtitle="fictional sales"
            type="sale"
            iconSymbol="↓"
          />
          <SummaryCard
            title="High Signals"
            value={`${metrics.highStrengthCount}`}
            subtitle="priority alerts"
            type="highlight"
            iconSymbol="🔥"
          />
        </ScrollView>

        {/* Top Signals Today */}
        <Text style={styles.sectionTitle}>Top Signals Today</Text>
        <View style={styles.signalsGrid}>
          {[
            { name: "Large CEO Purchase", count: 2, type: "purchase" },
            { name: "Cluster Buy", count: 1, type: "purchase" },
            { name: "Executive Sale", count: 2, type: "sale" },
          ].map((signal, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.signalChip}
              onPress={() => handleSignalSelect(signal.name)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${signal.name}`}
            >
              <View style={styles.signalChipLeft}>
                <View
                  style={[
                    styles.signalDot,
                    { backgroundColor: signal.type === "purchase" ? COLORS.purchase : COLORS.sale },
                  ]}
                />
                <Text style={styles.signalChipText}>{signal.name}</Text>
              </View>
              <Text style={styles.signalChipCount}>{signal.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Latest Activity Feed */}
        <View style={styles.feedHeader}>
          <Text style={styles.sectionTitle}>Latest Filings Feed</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Screener")}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="View all trades in screener"
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {latestTrades.map((trade) => (
          <TradeCard
            key={trade.id}
            trade={trade}
            onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
          />
        ))}

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate("Screener")}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Open Screener button"
        >
          <Text style={styles.ctaButtonText}>Open Full Screener ({MOCK_TRADES.length} Filings)</Text>
        </TouchableOpacity>

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
    paddingBottom: 32,
  },
  headerRow: {
    marginBottom: 12,
  },
  titleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  demoBadge: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  demoBadgeText: {
    color: COLORS.accentPurple,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  safeWordingBanner: {
    backgroundColor: COLORS.surface,
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    marginBottom: 16,
  },
  safeWordingText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchButtonText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  summaryScroll: {
    paddingBottom: 8,
  },
  signalsGrid: {
    marginBottom: 20,
  },
  signalChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  signalChipLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  signalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  signalChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  signalChipCount: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  viewAllText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 13,
  },
  ctaButton: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.accent,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: COLORS.cardRadius,
    alignItems: "center",
    marginTop: 12,
  },
  ctaButtonText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: "800",
  },
});
