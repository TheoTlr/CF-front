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
            {/* SIDEBAR */}
            <View style={styles.sidebar}>
                {/* LOGO */}
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Text style={styles.logoLetter}>C</Text>
                    </View>
                    <Text style={styles.logoText}>CoachFlow</Text>
                </View>

                {/* NAV */}
                <View style={styles.nav}>
                    <NavItem
                        href="/dashboard"
                        label="Dashboard"
                        icon="grid-outline"
                        active={pathname === '/dashboard'}
                        styles={styles}
                        theme={theme}
                    />
                    <NavItem
                        href="/athletes"
                        label="Athlètes"
                        icon="people-outline"
                        active={pathname === '/athletes'}
                        styles={styles}
                        theme={theme}
                    />
                    <NavItem
                        href="/templates"
                        label="Templates"
                        icon="document-text-outline"
                        active={pathname.startsWith('/templates')}
                        styles={styles}
                        theme={theme}
                    />
                    <NavItem
                        href="/settings"
                        label="Paramètres"
                        icon="settings-outline"
                        active={pathname === '/settings'}
                        styles={styles}
                        theme={theme}
                    />
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    {/* THEME TOGGLE */}
                    <Pressable style={styles.themeToggle} onPress={toggleTheme}>
                        <Ionicons
                            name={theme.mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
                            size={20}
                            color={theme.colors.textPrimary}
                        />
                        <Text style={styles.themeToggleText}>
                            {theme.mode === 'dark' ? 'Light mode' : 'Dark mode'}
                        </Text>
                    </Pressable>

                    {/* LOGOUT */}
                    <Pressable style={styles.logout}>
                        <Ionicons
                            name="log-out-outline"
                            size={20}
                            color={theme.colors.danger}
                        />
                        <Text style={styles.logoutText}>Déconnexion</Text>
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

function NavItem({ href, label, icon, active, styles, theme }) {
    return (
        <Link
            href={href}
            style={[
                styles.navItem,
                active && styles.navItemActive,
            ]}
        >
            <Ionicons
                name={icon}
                size={20}
                color={
                    active
                        ? theme.colors.textPrimary
                        : theme.colors.textSecondary
                }
            />
            <Text
                style={[
                    styles.navText,
                    active && styles.navTextActive,
                ]}
            >
                {label}
            </Text>
        </Link>
    );
}

/* 🎨 STYLES DÉRIVÉS DU DESIGN SYSTEM */
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: theme.colors.background,
        },

        /* SIDEBAR */
        sidebar: {
            width: 260,
            backgroundColor: theme.colors.surface,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.md,
            justifyContent: 'space-between',
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
        },

        logoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
        },
        logoIcon: {
            width: 36,
            height: 36,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing.sm,
        },
        logoLetter: {
            color: theme.colors.surface,
            fontWeight: 'bold',
            fontSize: 18,
        },
        logoText: {
            color: theme.colors.textPrimary,
            fontSize: 18,
            fontWeight: '600',
        },

        nav: {
            flex: 1,
            gap: theme.spacing.sm,
        },

        navItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.radius.md,
        },
        navItemActive: {
            backgroundColor: theme.colors.primarySoft,
        },
        navText: {
            color: theme.colors.textSecondary,
            fontSize: 15,
            fontWeight: '500',
        },
        navTextActive: {
            color: theme.colors.textPrimary,
        },

        footer: {
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingTop: theme.spacing.md,
            gap: theme.spacing.md,
        },

        themeToggle: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
        },
        themeToggleText: {
            color: theme.colors.textPrimary,
            fontWeight: '500',
        },

        logout: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
        },
        logoutText: {
            color: theme.colors.danger,
            fontSize: 15,
        },

        /* CONTENT */
        content: {
            flex: 1,
            padding: theme.spacing.xl,
        },
    });
