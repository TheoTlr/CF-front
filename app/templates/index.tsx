// app/templates/index.tsx
import {View, Text, StyleSheet, Pressable, ScrollView, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import {useMemo, useState} from "react";

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
    {
        id: '5',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'primary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '6',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '7',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'primary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '8',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '9',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'primary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '10',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '11',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'primary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '12',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '13',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'primary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '14',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '15',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'primary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '16',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '17',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'primary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '18',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'success',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '19',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'primary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '20',
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

    const [search, setSearch] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(
        () => [...new Set(TEMPLATES.flatMap(t => t.tags))],
        []
    );

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const filteredTemplates = useMemo(() => {
        const q = search.toLowerCase();

        return TEMPLATES.filter(t => {
            const matchText =
                t.title.toLowerCase().includes(q) ||
                t.level.toLowerCase().includes(q) ||
                t.tags.some(tag => tag.toLowerCase().includes(q));

            const matchTags =
                selectedTags.length === 0 ||
                selectedTags.some(tag => t.tags.includes(tag));

            return matchText && matchTags;
        });
    }, [search, selectedTags]);

    return (
        <View style={styles.page}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>Templates</Text>
                </View>

                <View style={styles.headerMiddle}>
                    <View style={styles.searchWrapper}>
                        <Ionicons name="search" size={18} color={theme.colors.textSecondary} />
                        <TextInput
                            placeholder="Rechercher un template..."
                            placeholderTextColor={theme.colors.textSecondary}
                            value={search}
                            onChangeText={setSearch}
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <View style={styles.filterContainer}>
                        <Pressable
                            style={styles.filterButton}
                            onPress={() => setFilterOpen(!filterOpen)}
                        >
                            <Ionicons name="options-outline" size={16} color={theme.colors.textPrimary} />
                            <Text style={styles.filterButtonText}>Filter</Text>
                            <Ionicons
                                name={filterOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                color={theme.colors.textSecondary}
                            />
                        </Pressable>

                        {filterOpen && (
                            <View style={styles.dropdown}>
                                {allTags.map(tag => {
                                    const active = selectedTags.includes(tag);

                                    return (
                                        <Pressable
                                            key={tag}
                                            onPress={() => toggleTag(tag)}
                                            style={styles.dropdownItem}
                                        >
                                            <Ionicons
                                                name={active ? 'checkbox' : 'square-outline'}
                                                size={18}
                                                color={
                                                    active
                                                        ? theme.colors.primary
                                                        : theme.colors.textSecondary
                                                }
                                            />

                                            <Text style={styles.dropdownText}>{tag}</Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        )}
                    </View>

                    <Pressable style={styles.primaryButton}>
                        <Ionicons name="add" size={18} color={theme.colors.surface} />
                        <Text style={styles.primaryButtonText}>Créer Template</Text>
                    </Pressable>
                </View>
            </View>

            {filterOpen && (
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => setFilterOpen(false)}
                />
            )}

            {/* GRID */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
                {filteredTemplates.map(template => {
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
            </ScrollView>
        </View>
    );
}

/* STYLES */
const createStyles = (theme) =>
    StyleSheet.create({
        page: { flex: 1 },
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
            zIndex: 10,
        },
        headerLeft: {
            width: '33%',
            flexDirection: 'row',
            alignItems: 'center'
        },

        headerMiddle: {
            width: '33%',
            alignItems: 'center',
            justifyContent: 'center',
        },

        headerRight: {
            width: '33%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            gap: theme.spacing.sm
        },
        title: { fontSize: 28, fontWeight: '400', color: theme.colors.textPrimary },
        searchWrapper: {
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.full,
            paddingHorizontal: theme.spacing.md,
            height: 40,
        },
        searchInput: {
            flex: 1,
            color: theme.colors.textPrimary,
        },
        filterContainer: {
            position: 'relative',
            marginBottom: theme.spacing.md,
        },

        filterButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            paddingVertical: 10,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            alignSelf: 'flex-start',
        },

        filterButtonText: {
            fontWeight: '600',
            color: theme.colors.textPrimary,
        },

        dropdown: {
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 8,

            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.sm,
            borderWidth: 1,
            borderColor: theme.colors.border,

            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 6,

            zIndex: 999,
            minWidth: 180,
        },

        dropdownItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            paddingVertical: 8,
            paddingHorizontal: theme.spacing.sm,
        },

        dropdownText: {
            color: theme.colors.textPrimary,
            fontSize: 14,
        },
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
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.lg},
        card: {
            width: '32%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
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
