// app/templates/index.tsx
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

const TEMPLATES = [
    {
        id: '1',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'primary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '2',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '3',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'primary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '4',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Circuit', 'Cardio'],
    },
];

export default function TemplatesPage() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView style={styles.page}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Mes Templates</Text>
                <View style={styles.actions}>
                    <Pressable style={styles.primaryButton}>
                        <Ionicons name="add" size={18} color={theme.colors.surface} />
                        <Text style={styles.primaryButtonText}>Créer Template</Text>
                    </Pressable>
                </View>
            </View>

            {/* GRID */}
            <View style={styles.grid}>
                {TEMPLATES.map(template => {
                    const levelColor = theme.colors[template.levelColorKey];

                    return (
                        <Link
                            key={template.id}
                            href={template.id ? `/templates/${template.id}` : '/templates'}
                            style={styles.card}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.docIcon}>
                                    <Ionicons
                                        name="document-text-outline"
                                        size={22}
                                        color={theme.colors.textSecondary}
                                    />
                                </View>

                                <View style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}>
                                    <Text style={[styles.levelText, { color: levelColor }]}>
                                        {template.level}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.cardTitle}>{template.title}</Text>
                            <Text style={styles.cardSubtitle}>{template.duration}</Text>

                            <View style={styles.tags}>
                                {template.tags.map(tag => (
                                    <View key={tag} style={styles.tag}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </Link>
                    );
                })}
            </View>
        </ScrollView>
    );
}

/* STYLES */
const createStyles = (theme) =>
    StyleSheet.create({
        page: { flex: 1 },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xl,
        },
        title: { fontSize: 28, fontWeight: '700', color: theme.colors.textPrimary },
        actions: { flexDirection: 'row', gap: theme.spacing.sm },
        primaryButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.primary,
        },
        primaryButtonText: { color: theme.colors.surface, fontWeight: '600' },
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.lg },
        card: {
            width: '31%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm },
        docIcon: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' },
        levelBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: theme.radius.full },
        levelText: { fontSize: 12, fontWeight: '600' },
        cardTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
        cardSubtitle: { color: theme.colors.textSecondary, marginBottom: theme.spacing.sm },
        tags: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
        tag: { backgroundColor: theme.colors.background, paddingVertical: 4, paddingHorizontal: 10, borderRadius: theme.radius.full },
        tagText: { fontSize: 12, color: theme.colors.textPrimary },
    });
