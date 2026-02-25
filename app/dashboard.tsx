import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
    startOfWeek,
    addDays,
    format,
    addWeeks,
    subWeeks
} from "date-fns";
import { fr } from "date-fns/locale";
import { useTheme } from "@/hooks/useTheme";

export default function Dashboard() {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [currentWeekStart, setCurrentWeekStart] = useState(
        startOfWeek(new Date(), { weekStartsOn: 1 })
    );

    const nextWeek = () => setCurrentWeekStart(w => addWeeks(w, 1));
    const prevWeek = () => setCurrentWeekStart(w => subWeeks(w, 1));

    const monthYear = useMemo(() => {
        return format(currentWeekStart, "MMMM yyyy", { locale: fr });
    }, [currentWeekStart]);

    const week = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => {
            const date = addDays(currentWeekStart, i);

            return {
                id: format(date, "yyyy-MM-dd"),
                label: format(date, "EEEE dd", { locale: fr }),
                events: [
                    { id: "1", title: "Event A" },
                    { id: "2", title: "Event B" }
                ]
            };
        });
    }, [currentWeekStart]);

    const renderDay = ({ item }) => (
        <View style={styles.dayCard}>
            <Text style={styles.dayTitle}>{item.label}</Text>

            <FlashList
                data={item.events}
                horizontal
                estimatedItemSize={120}
                keyExtractor={(e) => e.id}
                renderItem={({ item }) => (
                    <View style={styles.eventCard}>
                        <Text style={styles.eventText}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );

    return (
        <View style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={prevWeek}>
                    <Text style={styles.navBtn}>←</Text>
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.subtitle}>{monthYear}</Text>
                </View>

                <TouchableOpacity onPress={nextWeek}>
                    <Text style={styles.navBtn}>→</Text>
                </TouchableOpacity>
            </View>

            <FlashList
                data={week}
                renderItem={renderDay}
                estimatedItemSize={120}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
            />
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({

        page: {
            flex: 1,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background
        },

        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: theme.spacing.lg
        },

        headerCenter: {
            alignItems: "center"
        },

        title: {
            fontSize: 26,
            fontWeight: "700",
            color: theme.colors.textPrimary
        },

        subtitle: {
            marginTop: 4,
            color: theme.colors.textSecondary
        },

        navBtn: {
            fontSize: 22,
            fontWeight: "700",
            color: theme.colors.primary,
            paddingHorizontal: 10
        },

        dayCard: {
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: theme.spacing.md,
            marginBottom: theme.spacing.md
        },

        dayTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.colors.textPrimary,
            marginBottom: theme.spacing.sm
        },

        eventCard: {
            backgroundColor: theme.colors.surface,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginRight: theme.spacing.sm
        },

        eventText: {
            color: theme.colors.textPrimary,
            fontWeight: "500"
        }
    });
