// app/templates/components/TemplateTable.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TemplateRow from './templateRow';
import AddRowModal from './addRowModal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface Props {
    initialData: any[];
}

export default function TemplateTable({ initialData }: Props) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [data, setData] = useState(initialData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const moveRowUp = () => {
        if (selectedIndex === null || selectedIndex === 0) return;

        const newData = [...data];
        [newData[selectedIndex - 1], newData[selectedIndex]] =
            [newData[selectedIndex], newData[selectedIndex - 1]];

        setData(newData);
        setSelectedIndex(selectedIndex - 1);
    };

    const moveRowDown = () => {
        if (selectedIndex === null || selectedIndex === data.length - 1) return;

        const newData = [...data];
        [newData[selectedIndex + 1], newData[selectedIndex]] =
            [newData[selectedIndex], newData[selectedIndex + 1]];

        setData(newData);
        setSelectedIndex(selectedIndex + 1);
    };

    return (
        <View>
            {/* Ajouter une ligne */}
            <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={18} color={theme.colors.surface} />
                <Text style={styles.addButtonText}>Ajouter un exercice</Text>
            </Pressable>

            {/* Tableau */}
            <View style={styles.table}>
                {/* Header */}
                <View style={[styles.row, styles.rowHeader]}>
                    {/* Colonne boutons — PAS de border */}
                    <View style={styles.moveButtonsPlaceholder} />

                    <Text style={[styles.headerCell, styles.colBorder]}>Exercice</Text>
                    <Text style={[styles.headerCell, styles.colBorder]}>Séries</Text>
                    <Text style={[styles.headerCell, styles.colBorder]}>Poids</Text>
                    <Text style={[styles.headerCell, styles.colBorder]}>RPE</Text>
                    <Text style={styles.headerCell}>Commentaire</Text>
                </View>

                {data.map((item, index) => (
                    <View key={index} style={styles.rowWrapper}>
                        {/* Colonne boutons — PAS de border */}
                        <View style={styles.moveButtons}>
                            {selectedIndex === index && (
                                <>
                                    <Pressable onPress={moveRowUp} disabled={index === 0}>
                                        <Ionicons
                                            name="chevron-up"
                                            size={16}
                                            color={
                                                index === 0
                                                    ? theme.colors.textSecondary
                                                    : theme.colors.primary
                                            }
                                        />
                                    </Pressable>

                                    <Pressable
                                        onPress={moveRowDown}
                                        disabled={index === data.length - 1}
                                    >
                                        <Ionicons
                                            name="chevron-down"
                                            size={16}
                                            color={
                                                index === data.length - 1
                                                    ? theme.colors.textSecondary
                                                    : theme.colors.primary
                                            }
                                        />
                                    </Pressable>
                                </>
                            )}
                        </View>

                        <TemplateRow
                            item={item}
                            index={index}
                            isSelected={selectedIndex === index}
                            onPress={() =>
                                setSelectedIndex(
                                    selectedIndex === index ? null : index
                                )
                            }
                            withBorders
                        />
                    </View>
                ))}
            </View>

            {/* Modal ajout */}
            <AddRowModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={(row) => setData([...data, row])}
            />
        </View>
    );
}

const MOVE_BUTTONS_WIDTH = 40;

const createStyles = (theme) =>
    StyleSheet.create({
        addButton: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.md,
        },
        addButtonText: {
            color: theme.colors.surface,
            fontWeight: '600',
            marginLeft: theme.spacing.sm,
        },
        table: {
            backgroundColor: theme.colors.background,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            overflow: 'hidden',
        },
        rowWrapper: {
            flexDirection: 'row',
            alignItems: 'stretch',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        moveButtons: {
            width: MOVE_BUTTONS_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        },
        moveButtonsPlaceholder: {
            width: MOVE_BUTTONS_WIDTH,
        },
        row: {
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        rowHeader: {
            backgroundColor: theme.colors.surface,

            borderRightWidth: StyleSheet.hairlineWidth,
            borderRightColor: theme.colors.border,
        },
        headerCell: {
            flex: 1,
            fontWeight: '600',
            color: theme.colors.textSecondary,
            fontSize: 13,
            paddingRight: 8,
        },

        /* 🔥 Border UNIQUEMENT entre les colonnes de données */
        colBorder: {
            borderRightWidth: StyleSheet.hairlineWidth,
            borderRightColor: theme.colors.border,
        },
    });
