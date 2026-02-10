// app/templates/components/TemplateRow.tsx
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface Props {
    item: any;
    index: number;
    isSelected: boolean;
    onPress: () => void;
}

export default function TemplateRow({ item, index, isSelected, onPress }: Props) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.row,
                index % 2 === 0 && styles.rowAlt,
                isSelected && styles.rowSelected,
            ]}
        >
            <Text style={styles.cell}>{item.exercice}</Text>
            <Text style={styles.cell}>{item.nbSeries}</Text>
            <Text style={styles.cell}>{item.poids}</Text>
            <Text style={styles.cell}>{item.rpe}</Text>
            <Text style={styles.cell}>{item.commentaire || '-'}</Text>
        </Pressable>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: theme.colors.background,
            flex: 1,
        },
        rowAlt: {
            backgroundColor: theme.colors.backgroundSoft,
        },
        rowSelected: {
            backgroundColor: theme.colors.surface,
            borderLeftWidth: 3,
            borderLeftColor: theme.colors.primary,
        },
        cell: {
            flex: 1,
            color: theme.colors.textPrimary,
            fontSize: 14,
        },
    });
