import React, { useState, useEffect } from "react";
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
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { MOCK_TRADES } from "../data/mockTrades";
import { InsiderTrade } from "../types/trade";
import { COLORS } from "../theme/colors";
import { TradeCard } from "../components/TradeCard";
import { FilterChip } from "../components/FilterChip";

type ScreenerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Screener">;
  route: RouteProp<RootStackParamList, "Screener">;
};

type TypeFilter = "All" | "Purchases" | "Sales";
type RoleFilter = "All roles" | "CEO" | "CFO" | "Director";
type ValueFilter = "Any" | "$100K+" | "$500K+" | "$1M+";

export const ScreenerScreen: React.FC<ScreenerScreenProps> = ({ navigation, route }) => {
  const [search, setSearch] = useState(route.params?.initialSearch || "");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All roles");
  const [valueFilter, setValueFilter] = useState<ValueFilter>("Any");

  useEffect(() => {
    if (route.params?.initialSearch !== undefined) {
      setSearch(route.params.initialSearch);
    }
  }, [route.params?.initialSearch]);

  const clearAllFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setRoleFilter("All roles");
    setValueFilter("Any");
  };

  // Filter calculation logic
  const filteredTrades = MOCK_TRADES.filter((trade: InsiderTrade) => {
    // 1. Text Search (ticker, company, insider, signal)
    if (search.trim().length > 0) {
      const q = search.toLowerCase().trim();
      const matchesTicker = trade.ticker.toLowerCase().includes(q);
      const matchesCompany = trade.company.toLowerCase().includes(q);
      const matchesInsider = trade.insider.toLowerCase().includes(q);
      const matchesSignal = trade.signal.toLowerCase().includes(q);
      if (!matchesTicker && !matchesCompany && !matchesInsider && !matchesSignal) {
        return false;
      }
    }

    // 2. Transaction Type Filter
    if (typeFilter === "Purchases" && trade.type !== "purchase") return false;
    if (typeFilter === "Sales" && trade.type !== "sale") return false;

    // 3. Role Filter
    if (roleFilter !== "All roles") {
      if (trade.role !== roleFilter) return false;
    }

    // 4. Value Threshold Filter
    if (valueFilter === "$100K+" && trade.value < 100000) return false;
    if (valueFilter === "$500K+" && trade.value < 500000) return false;
    if (valueFilter === "$1M+" && trade.value < 1000000) return false;

    return true;
  });

  const isFilterActive =
    search.length > 0 || typeFilter !== "All" || roleFilter !== "All roles" || valueFilter !== "Any";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Insider Screener</Text>
          <Text style={styles.headerSubtitle}>
            Filter fictional filings by transaction type, executive role, or value
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ticker, company, insider, or signal..."
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
            accessibilityLabel="Search filter input field"
          />
          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearchBtn}
              onPress={() => setSearch("")}
              accessibilityRole="button"
              accessibilityLabel="Clear text input"
            >
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Group 1: Transaction Type */}
        <Text style={styles.filterGroupLabel}>Transaction Type</Text>
        <View style={styles.filterRow}>
          {(["All", "Purchases", "Sales"] as TypeFilter[]).map((type) => (
            <FilterChip
              key={type}
              label={type}
              isSelected={typeFilter === type}
              onPress={() => setTypeFilter(type)}
            />
          ))}
        </View>

        {/* Filter Group 2: Executive Role */}
        <Text style={styles.filterGroupLabel}>Insider Role</Text>
        <View style={styles.filterRow}>
          {(["All roles", "CEO", "CFO", "Director"] as RoleFilter[]).map((role) => (
            <FilterChip
              key={role}
              label={role}
              isSelected={roleFilter === role}
              onPress={() => setRoleFilter(role)}
            />
          ))}
        </View>

        {/* Filter Group 3: Value Threshold */}
        <Text style={styles.filterGroupLabel}>Minimum Value</Text>
        <View style={styles.filterRow}>
          {(["Any", "$100K+", "$500K+", "$1M+"] as ValueFilter[]).map((val) => (
            <FilterChip
              key={val}
              label={val}
              isSelected={valueFilter === val}
              onPress={() => setValueFilter(val)}
            />
          ))}
        </View>

        {/* Dynamic Result Header */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultCountText}>
            Showing <Text style={styles.resultCountHighlight}>{filteredTrades.length}</Text> demo filing{filteredTrades.length !== 1 ? "s" : ""}
          </Text>
          {isFilterActive && (
            <TouchableOpacity
              onPress={clearAllFilters}
              accessibilityRole="button"
              accessibilityLabel="Clear all filters button"
            >
              <Text style={styles.resetText}>Reset All Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Trade Feed or Empty State */}
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
            />
          ))
        ) : (
          <View style={styles.emptyStateContainer} accessibilityRole="summary">
            <Text style={styles.emptyStateIcon}>🔎</Text>
            <Text style={styles.emptyStateTitle}>No Matching Demo Trades</Text>
            <Text style={styles.emptyStateSub}>
              No fictional demo trades match your search criteria. Try adjusting your search term or active filters.
            </Text>
            <TouchableOpacity
              style={styles.clearFiltersBtn}
              onPress={clearAllFilters}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Clear filters button"
            >
              <Text style={styles.clearFiltersBtnText}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

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
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  clearSearchBtn: {
    padding: 6,
  },
  clearSearchText: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "bold",
  },
  filterGroupLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 4,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resultCountText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  resultCountHighlight: {
    color: COLORS.accent,
    fontWeight: "800",
  },
  resetText: {
    color: COLORS.sale,
    fontSize: 12,
    fontWeight: "700",
  },
  emptyStateContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: COLORS.cardRadius,
    padding: 24,
    alignItems: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyStateIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  emptyStateSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },
  clearFiltersBtn: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.accent,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearFiltersBtnText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "700",
  },
});
