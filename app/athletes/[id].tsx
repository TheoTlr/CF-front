import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import {Tab} from './components/tab';
import {Card} from './components/card';
import {MetricRow} from './components/metricRow';
import {StatCard} from './components/statCard';

export default function AthletesPageContent() {
    const { theme } = useTheme();

    return (
        <View>
            {/* HEADER */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xl }}>
                <View style={{ gap: theme.spacing.md }}>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                        <Ionicons name="arrow-back" size={20} color={theme.colors.textSecondary} />
                        <Text style={{ color: theme.colors.textSecondary }}>Retour</Text>
                    </Pressable>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                        <View style={{ width: 48, height: 48, borderRadius: 48, backgroundColor: theme.colors.border }} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.textPrimary }}>Thomas D.</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                                <View style={{ backgroundColor: theme.colors.success + '20', borderRadius: 999, paddingHorizontal: 8 }}>
                                    <Text style={{ fontSize: 12, color: theme.colors.success, fontWeight: '600' }}>Active</Text>
                                </View>
                                <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Hypertrophie PPL</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                    <Tab label="Séances" />
                    <Tab label="Programmation" />
                    <Tab label="Performance" active />
                </View>
            </View>

            {/* CONTENT */}
            <View style={{ flexDirection: 'row', gap: theme.spacing.xl }}>
                <View style={{ width: 320 }}>
                    <Card>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.md }}>
                            Métriques Suivies
                        </Text>
                        <MetricRow active label="Back Squat (1RM)" tag="force" />
                        <MetricRow label="Bench Press (1RM)" tag="force" />
                    </Card>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
                        <StatCard icon="trophy-outline" label="Record (PR)" value="125 kg" color={theme.colors.primary} />
                        <StatCard icon="trending-up-outline" label="Progression" value="+25.0%" color={theme.colors.success} />
                        <StatCard icon="calendar-outline" label="Moyenne" value="112.5 kg" color={theme.colors.primary} />
                    </View>

                    <Card style={{ marginTop: theme.spacing.lg }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.md }}>
                            Évolution : Back Squat (1RM)
                        </Text>
                        <View style={{ height: 260, borderRadius: theme.radius.md, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: theme.colors.textSecondary }}>(Graphique à brancher)</Text>
                        </View>
                    </Card>
                </View>
            </View>
        </View>
    );
}
