import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const MODULES = [
    { id: '1', title: 'Kan Şekeri İzlem', icon: 'water', route: 'BloodSugar', color: '#E74C3C' },
    { id: '2', title: 'Fiziksel Aktivite', icon: 'run', route: 'PhysicalActivity', color: '#3498DB' },
    { id: '3', title: 'Beslenme Değerlendirme', icon: 'food-apple', route: 'Nutrition', color: '#2ECC71' },
    { id: '4', title: 'Günlük Hedefler', icon: 'flag-checkered', route: 'DailyGoals', color: '#F39C12' },
    { id: '5', title: 'Formlar', icon: 'clipboard-text', route: 'Forms', color: '#9B59B6' },
    { id: '6', title: 'Acil İletişim', icon: 'phone-in-talk', route: 'Emergency', color: '#E67E22' },
];

const Dashboard = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const renderItem = ({ item }) => (
        <Card
            style={styles.moduleCard}
            onPress={() => item.route ? navigation.navigate(item.route) : null}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons name={item.icon} size={40} color={item.color} />
            </View>
            <Text style={styles.moduleTitle} numberOfLines={2} adjustsFontSizeToFit>{item.title}</Text>
        </Card>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Sağlık Takip Sistemi</Text>
            <FlatList
                data={MODULES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        marginTop: 10,
        color: colors.textLight,
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textDark,
        marginVertical: 20,
        paddingHorizontal: CARD_MARGIN,
        textAlign: 'center',
    },
    gridContainer: {
        paddingHorizontal: CARD_MARGIN / 2,
        paddingBottom: 20,
    },
    moduleCard: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.1,
        marginHorizontal: CARD_MARGIN / 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    moduleTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textDark,
        textAlign: 'center',
    },
});

export default Dashboard;
