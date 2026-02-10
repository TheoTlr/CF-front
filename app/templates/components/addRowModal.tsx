// app/templates/components/AddRowModal.tsx
import { Modal, View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';

interface Props {
    visible: boolean;
    onClose: () => void;
    onAdd: (newRow: any) => void;
}

export default function AddRowModal({ visible, onClose, onAdd }: Props) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [newRow, setNewRow] = useState({
        exercice: '',
        nbSeries: '',
        poids: '',
        rpe: '',
        commentaire: '',
    });

    const handleAdd = () => {
        onAdd(newRow);
        setNewRow({ exercice: '', nbSeries: '', poids: '', rpe: '', commentaire: '' });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Ajouter un exercice</Text>

                    {['exercice', 'nbSeries', 'poids', 'rpe', 'commentaire'].map((field) => (
                        <TextInput
                            key={field}
                            style={styles.input}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newRow[field]}
                            onChangeText={(t) => setNewRow({ ...newRow, [field]: t })}
                        />
                    ))}

                    <View style={styles.actions}>
                        <Pressable style={styles.button} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Valider</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.cancel]} onPress={onClose}>
                            <Text style={[styles.buttonText, { color: theme.colors.textSecondary }]}>Annuler</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
        },
        container: {
            backgroundColor: theme.colors.surface,
            marginHorizontal: 20,
            borderRadius: theme.radius.md,
            padding: theme.spacing.lg,
        },
        title: {
            fontSize: 20,
            fontWeight: '700',
            marginBottom: theme.spacing.md,
            color: theme.colors.textPrimary,
        },
        input: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.sm,
            padding: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
            color: theme.colors.textPrimary,
        },
        actions: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing.md,
        },
        button: {
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: theme.radius.md,
        },
        buttonText: {
            color: theme.colors.surface,
            fontWeight: '600',
        },
        cancel: {
            backgroundColor: theme.colors.background,
        },
    });
