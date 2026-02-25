import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { StatusBadge, TagBadge } from "@/app/athletes/components/statusBadge";

/* ================= PAGE ================= */

const ATHLETES = [
    { id: '1', name: 'Thomas D.', status: 'ACTIVE', tag: 'HYPERTROPHIE PPL' },
    { id: '2', name: 'Sophie L.', status: 'ACTIVE', tag: 'POWERLIFTING' },
    { id: '3', name: 'Marc A.', status: 'PAUSE', tag: 'MOBILITÉ' },
    { id: '4', name: 'Léa R.', status: 'ACTIVE', tag: 'MOBILITÉ' },
    { id: '5', name: 'Kevin G.', status: 'ACTIVE', tag: 'POWERLIFTING' },
    { id: '6', name: 'Amandine B.', status: 'NOUVEAU', tag: 'HYPERTROPHIE PPL' },
];


export default function AthletesListPage() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView style={styles.page}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}> Mes Athlètes</Text>

                <View style={styles.actions}>
                    <View style={styles.search}>
                        <Ionicons
                            name="search-outline"
                            size={18}
                            color={theme.colors.textSecondary}
                        />
                        <TextInput
                            placeholder="Rechercher un athlète..."
                            placeholderTextColor={theme.colors.textSecondary}
                            style={styles.searchInput}
                        />
                    </View>

                    <Pressable style={styles.addBtn}>
                        <Ionicons
                            name="add"
                            size={18}
                            color={theme.colors.surface}
                        />
                        <Text style={styles.addText}>Nouveau</Text>
                    </Pressable>
                </View>
            </View>

            {/* GRID */}
            <View style={styles.grid}>
                {ATHLETES.map((athlete) => (
                    <AthleteCard key={athlete.id} {...athlete} />
                ))}
            </View>
        </ScrollView>
    );
}

type AthleteCardProps = {
    name: string;
    status: string;
    tag?: string;
};

export function AthleteCard({ name, status, tag }: AthleteCardProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.card}>
            <View style={styles.avatar} />

            <Text style={styles.cardName}>{name}</Text>

            <View style={styles.badges}>
                <StatusBadge status={status} />
                {tag && <TagBadge label={tag} />}
            </View>
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        page: {
            flex: 1,
        },

        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
        },

        title: {
            fontSize: 28,
            fontWeight: '700',
            color: theme.colors.textPrimary,
        },
        subtitle: {
            marginTop: 4,
            color: theme.colors.textSecondary,
            fontSize: 14,
        },

        actions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
        },

        search: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.full,
            paddingHorizontal: theme.spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            height: 40,
        },
        searchInput: {
            color: theme.colors.textPrimary,
            minWidth: 220,
        },

        addBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.primary,
        },
        addText: {
            color: theme.colors.surface,
            fontWeight: '600',
        },

        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.lg,
        },

        card: {
            width: 220,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
        },

        avatar: {
            width: 56,
            height: 56,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.border,
            marginBottom: theme.spacing.sm,
        },

        cardName: {
            fontWeight: '600',
            color: theme.colors.textPrimary,
        },

        badges: {
            flexDirection: 'row',
            gap: 6,
            marginTop: theme.spacing.sm,
        },
    });
