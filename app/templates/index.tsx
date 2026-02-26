// app/templates/index.tsx
import {View, Text, StyleSheet, Pressable, ScrollView, TextInput, Modal} from 'react-native';
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
        levelColorKey: 'linePrimary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '2',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '3',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'lineTertiary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '4',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'lineTertiary',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '5',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'linePrimary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '6',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'yellow',
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
        levelColorKey: 'linePrimary',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '9',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'lineTertiary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '10',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '11',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'linePrimary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '12',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '13',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'lineTertiary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '14',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '15',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'lineTertiary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '16',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Circuit', 'Cardio'],
    },
    {
        id: '17',
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        levelColorKey: 'linePrimary',
        tags: ['Musculation', 'Esthétique'],
    },
    {
        id: '18',
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Force', 'Fondations'],
    },
    {
        id: '19',
        title: 'Préparation Marathon',
        duration: '16 semaines',
        level: 'Avancé',
        levelColorKey: 'lineTertiary',
        tags: ['Cardio', 'Endurance'],
    },
    {
        id: '20',
        title: 'Perte de poids HIIT',
        duration: '4 semaines',
        level: 'Débutant',
        levelColorKey: 'lineSecondary',
        tags: ['Circuit', 'Cardio'],
    },
];

export default function TemplatesPage() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [search, setSearch] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

            const matchLevel = !selectedLevel || t.level === selectedLevel;

            return matchText && matchTags && matchLevel;
        });
    }, [search, selectedTags, selectedLevel]);

    const levelBgMap = {
        'Débutant': theme.colors.lineTertiary,
        'Intermédiaire': theme.colors.lineSecondary,
        'Avancé': theme.colors.linePrimary,
    };

    return (
        <View style={styles.page}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>Finsights</Text>
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
            <View style={styles.templateContent}>
                <View style={styles.templateList}>
                    <View style={styles.templateListHeader}>
                        <View style={styles.legend}>
                            <Text style={styles.textTitleComponent}>Templates</Text>
                            <Pressable
                                style={styles.filterButton}
                                onPress={() => setIsModalVisible(true)}
                            >
                                <Ionicons name="options-outline" size={16} color={theme.colors.textPrimary} />
                                <Text style={styles.filterButtonText}>Filtrer par tags</Text>
                                {selectedTags.length > 0 && (
                                    <View style={styles.badgeCount}>
                                        <Text style={styles.badgeCountText}>{selectedTags.length}</Text>
                                    </View>
                                )}
                            </Pressable>

                            <Modal
                                transparent={true}
                                visible={isModalVisible}
                                animationType="fade"
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <Pressable
                                    style={styles.modalOverlay}
                                    onPress={() => setIsModalVisible(false)}
                                />
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        {/* HEADER */}
                                        <div style={styles.modalHeader}>
                                            <Text style={styles.modalTitle}>Filtres</Text>
                                            <Pressable onPress={() => setIsModalVisible(false)}>
                                                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                                            </Pressable>
                                        </div>

                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            {/* SECTION 1: NIVEAUX */}
                                            <Text style={styles.modalSectionTitle}>Difficulté</Text>
                                            <View style={styles.modalLevelGrid}>
                                                {Object.entries(levelBgMap).map(([label, color]) => {
                                                    const isActive = selectedLevel === label;
                                                    return (
                                                        <Pressable
                                                            key={label}
                                                            onPress={() => setSelectedLevel(isActive ? null : label)}
                                                            style={[
                                                                styles.modalLevelItem,
                                                                isActive && { borderColor: theme.colors.primary, borderWidth: 2 }
                                                            ]}
                                                        >
                                                            <View style={[styles.legendColor, { backgroundColor: color }]} />
                                                            <Text style={[
                                                                styles.legendText,
                                                                isActive && { fontWeight: '700' }
                                                            ]}>
                                                                {label}
                                                            </Text>
                                                        </Pressable>
                                                    );
                                                })}
                                            </View>

                                            {/* SECTION 2: TAGS */}
                                            <Text style={styles.modalSectionTitle}>Catégories</Text>
                                            <View style={styles.tagGrid}>
                                                {allTags.map(tag => {
                                                    const active = selectedTags.includes(tag);
                                                    return (
                                                        <Pressable
                                                            key={tag}
                                                            onPress={() => toggleTag(tag)}
                                                            style={[
                                                                styles.tagOption,
                                                                active && styles.tagOptionActive
                                                            ]}
                                                        >
                                                            <Text style={[
                                                                styles.tagOptionText,
                                                                active && styles.tagOptionTextActive
                                                            ]}>
                                                                {tag}
                                                            </Text>
                                                        </Pressable>
                                                    );
                                                })}
                                            </View>
                                        </ScrollView>

                                        {/* BOUTON ACTIONS */}
                                        <View style={styles.modalFooter}>
                                            <Pressable
                                                style={styles.resetButton}
                                                onPress={() => {
                                                    setSelectedTags([]);
                                                    setSelectedLevel(null);
                                                }}
                                            >
                                                <Text style={styles.resetButtonText}>Réinitialiser</Text>
                                            </Pressable>

                                            <Pressable
                                                style={styles.applyButton}
                                                onPress={() => setIsModalVisible(false)}
                                            >
                                                <Text style={styles.applyButtonText}>Appliquer</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View style={styles.filterContainer}>
                            <View style={styles.legend}>
                                <Pressable style={styles.primaryButton}>
                                    <Ionicons name="add" size={18}  color={theme.colors.surface} />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fixedWrapper}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            {filteredTemplates.map(template => {
                                const bgColor = levelBgMap[template.level] || theme.colors.lineTertiary;

                                return (
                                    <View
                                        key={template.id}
                                        style={[styles.rowItem, { backgroundColor: bgColor + 90 }]} // Fond coloré semi-transparent
                                    >
                                        <View style={styles.rowContent}>
                                            {/* Checkbox / Icône à gauche */}
                                            <View style={styles.checkboxPlaceholder} />

                                            {/* Texte principal */}
                                            <View style={styles.textContainer}>
                                                <Text style={styles.rowTitle}>{template.title}</Text>
                                                <Text style={styles.rowSubtitle}>{template.duration}</Text>
                                            </View>

                                            {/* Badge ou Action à droite */}
                                            <View style={styles.actionContainer}>
                                                <Link style={styles.viewButton} href={template.id ? `/templates/${template.id}` : '/templates'}>
                                                    <Text style={styles.viewButtonText}>Edit</Text>
                                                </Link>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.templateEdit}>
                    <Text>dqdqzdqd</Text>
                    <Text>dqdqzdqd</Text>
                    <Text>dqdqzdqd</Text>
                    <Text>dqdqzdqd</Text>
                    <Text>dqdqzdqd</Text>
                    <Text>dqdqzdqd</Text>
                </View>
            </View>
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
        },

        filterButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            padding: theme.spacing.sm,
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
        templateContent: {
            display: 'flex',
            flexDirection: 'row',
            height: '40%',
            gap: theme.spacing.xl,
        },
        templateList: {
            backgroundColor: theme.colors.backgroundInvert,
            width : '60%',
            gap: theme.spacing.md,
            borderRadius: theme.radius.lg,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
        },
        templateListHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        legend: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing.sm,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.primary
        },
        legendItemActive: {
            backgroundColor: '#FFF', // Fond blanc quand actif
            borderColor: theme.colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            elevation: 2,
        },
        legendTextActive: {
            fontWeight: '700',
            color: '#000',
        },
        legendColor: {
            width: 12,
            height: 12,
            borderRadius: 2,
            marginRight: 6,
        },
        legendText: {
            fontSize: 12,
        },
        textTitleComponent: { fontSize: 20, fontWeight: '500' },
        templateEdit: {
            backgroundColor: theme.colors.surface,
            flex: 1,
            marginRight: theme.spacing.lg,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
        },

        fixedWrapper: {
            height: '85%',
            overflow: "hidden"
        },
        scrollView: {
            flex: 1,
        },
        rowItem: {
            borderRadius: 16, // Coins très arrondis comme sur l'image
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        rowContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
        checkboxPlaceholder: {
            width: 16,
            height: 16,
            backgroundColor: '#FFF',
            borderRadius: 6,
            marginRight: 12,
        },
        textContainer: {
            flex: 1,
            gap: 10,
            display: 'flex',
            flexDirection: 'row',
        },
        actionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end', // Aligne le contenu du container à droite
            gap: 8, // Espace entre les icônes si tu en ajoutes plusieurs (ex: bouton + avatar)
        },
        rowTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: '#1a1a1a',
        },
        rowSubtitle: {
            fontSize: 14,
            color: '#666',
            marginTop: 2,
        },
        viewButton: {
            backgroundColor: theme.colors.buttonPrimary,
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 20,
        },
        viewButtonText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000',
        },


        badgeCount: {
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
        },
        badgeCountText: {
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
        },

        // MODAL STYLES
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalContainer: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: '80%',
            maxWidth: 400,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.textPrimary,
        },
        tagGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            paddingBottom: 20,
        },
        tagOption: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
        },
        tagOptionActive: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        tagOptionText: {
            fontSize: 14,
            color: theme.colors.textPrimary,
        },
        tagOptionTextActive: {
            color: '#FFF',
            fontWeight: '600',
        },
        applyButtonText: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 16,
        },
        modalSectionTitle: {
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.textSecondary,
            textTransform: 'uppercase',
            marginBottom: 12,
            marginTop: 8,
        },
        modalLevelGrid: {
            flexDirection: 'row',
            gap: 10,
            marginBottom: 24,
        },
        modalLevelItem: {
            flex: 1, // Pour que les 3 niveaux prennent la même largeur
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: theme.colors.background,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        modalFooter: {
            flexDirection: 'row',
            gap: 12,
            marginTop: 20,
            paddingTop: 15,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
        resetButton: {
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        resetButtonText: {
            color: theme.colors.textSecondary,
            fontWeight: '600',
        },
        applyButton: {
            flex: 2,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            paddingVertical: 12,
            alignItems: 'center',
        },




















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
