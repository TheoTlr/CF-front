import { Slot, Link, usePathname } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

export default function SidebarLayout() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            {/* SIDEBAR RAIL */}
            <View style={styles.sidebar}>
                <View style={styles.topSection}>
                    {/* LOGO CIRCULAIRE */}
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoLetter}>C</Text>
                    </View>

                    {/* NAV ITEMS */}
                    <View style={styles.nav}>
                        <NavItem
                            href="/dashboard"
                            icon="grid-outline"
                            active={pathname === '/dashboard'}
                            styles={styles}
                            theme={theme}
                        />
                        <NavItem
                            href="/athletes"
                            icon="people-outline"
                            active={pathname === '/athletes'}
                            styles={styles}
                            theme={theme}
                        />
                        <NavItem
                            href="/templates"
                            icon="document-text-outline"
                            active={pathname.startsWith('/templates')}
                            styles={styles}
                            theme={theme}
                        />
                        <NavItem
                            href="/settings"
                            icon="settings-outline"
                            active={pathname === '/settings'}
                            styles={styles}
                            theme={theme}
                        />
                    </View>
                </View>

                {/* FOOTER - ICONES UNIQUEMENT */}
                <View style={styles.footer}>
                    <Pressable style={styles.footerIcon} onPress={toggleTheme}>
                        <Ionicons
                            name={theme.mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
                            size={22}
                            color={theme.colors.textSecondary}
                        />
                    </Pressable>

                    <Pressable style={styles.footerIcon}>
                        <Ionicons
                            name="help-circle-outline"
                            size={22}
                            color={theme.colors.textSecondary}
                        />
                    </Pressable>
                </View>
            </View>

            {/* CONTENU */}
            <View style={styles.content}>
                <Slot />
            </View>
        </View>
    );
}

function NavItem({ href, icon, active, styles, theme }) {
    return (
        <Link href={href} style={[styles.navItem, active && styles.navItemActive]}>
            <Ionicons
                name={icon}
                size={22}
                color={active ? theme.colors.backgroundInvert : theme.colors.background}
            />
        </Link>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: theme.colors.backgroundInvert,
        },

        /* SIDEBAR STYLE "RAIL" */
        sidebar: {
            width: '5%', // Réduit pour le style rail
            paddingVertical: theme.spacing.xl,
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        topSection: {
            alignItems: 'center',
            gap: 40,
        },

        logoCircle: {
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
        },
        logoLetter: {
            color: theme.colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
        },

        nav: {
            gap: 25,
        },

        navItem: {
            width: 48,
            height: 48,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        navItemActive: {
            backgroundColor: theme.colors.primary, // Fond plein pour l'item actif
        },

        footer: {
            gap: 20,
            paddingBottom: 10,
            alignItems: 'center',
        },
        footerIcon: {
            padding: 8,
        },

        /* CONTENT */
        content: {
            flex: 1,
            marginLeft: theme.spacing.sm,
            backgroundColor: theme.colors.textPrimary,
        },
    });