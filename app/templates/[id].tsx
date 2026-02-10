// app/templates/[id].tsx
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TemplateTable from './components/templateTable';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';

const TEMPLATE_DETAILS = {
    '1': {
        title: 'Hypertrophie : Push/Pull/Legs',
        duration: '8 semaines',
        level: 'Intermédiaire',
        exercises: [
            { exercice: 'Développé couché', nbSeries: 4, poids: '80kg', rpe: 8, commentaire: 'Bonne exécution' },
            { exercice: 'Squat', nbSeries: 5, poids: '100kg', rpe: 9, commentaire: 'Dernière série difficile' },
        ],
    },
    '2': {
        title: 'Force 5×5 Classique',
        duration: '12 semaines',
        level: 'Débutant',
        exercises: [
            { exercice: 'Deadlift', nbSeries: 5, poids: '120kg', rpe: 8, commentaire: '' },
        ],
    },
};

export default function TemplateDetailPage() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { id } = useLocalSearchParams();
    const template = TEMPLATE_DETAILS[id as string];

    if (!template) return <Text>Template introuvable</Text>;

    return (
        <ScrollView style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
                    <Text style={styles.backText}>Retour</Text>
                </Pressable>
                <Text style={styles.title}>{template.title}</Text>
                <Text style={styles.subtitle}>{template.duration} • {template.level}</Text>
            </View>

            {/* Table */}
            <TemplateTable initialData={template.exercises} />
        </ScrollView>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        page: { flex: 1, padding: theme.spacing.lg },
        header: { marginBottom: theme.spacing.lg },
        backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
        backText: { color: theme.colors.primary, fontWeight: '600' },
        title: { fontSize: 26, fontWeight: '700', color: theme.colors.textPrimary },
        subtitle: { marginTop: 4, color: theme.colors.textSecondary },
    });
