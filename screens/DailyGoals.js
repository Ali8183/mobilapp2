import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import { colors } from '../utils/colors';
import { DAILY_GOALS } from '../data/mockData';

const DailyGoals = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Card style={styles.card}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                        <MaterialCommunityIcons name="water-outline" size={32} color={colors.primary} />
                    </View>
                    <Text style={styles.title}>Kan Şekeri Hedefleri</Text>
                </View>
                <Text style={styles.description}>{DAILY_GOALS.bloodSugar}</Text>
            </Card>

            <Card style={styles.card}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.warning + '15' }]}>
                        <MaterialCommunityIcons name="cup-water" size={32} color={colors.warning} />
                    </View>
                    <Text style={styles.title}>Su Tüketimi</Text>
                </View>
                <Text style={styles.description}>{DAILY_GOALS.water}</Text>
            </Card>

            <Card style={styles.card}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.success + '15' }]}>
                        <MaterialCommunityIcons name="run" size={32} color={colors.success} />
                    </View>
                    <Text style={styles.title}>Fiziksel Aktivite</Text>
                </View>
                <Text style={styles.description}>{DAILY_GOALS.exercise}</Text>
            </Card>

            <Card style={styles.card}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: '#9B59B615' }]}>
                        <MaterialCommunityIcons name="food-apple" size={32} color="#9B59B6" />
                    </View>
                    <Text style={styles.title}>Beslenme Önerisi</Text>
                </View>
                <Text style={styles.description}>{DAILY_GOALS.nutrition}</Text>
            </Card>

            <Card style={[styles.card, styles.noteCard]}>
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.textDark + '15' }]}>
                        <MaterialCommunityIcons name="information" size={32} color={colors.textDark} />
                    </View>
                    <Text style={styles.title}>Açıklama</Text>
                </View>
                <Text style={styles.description}>Bu değerler genel önerilerdir. Kendi sağlık durumunuza uygun hedefler için lütfen doktorunuza danışınız.</Text>
            </Card>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    contentContainer: { padding: 16, paddingBottom: 40 },
    card: { padding: 20, marginBottom: 12 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    iconContainer: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    title: { fontSize: 18, fontWeight: 'bold', color: colors.textDark, flex: 1 },
    description: { fontSize: 15, color: colors.textLight, lineHeight: 22 },
    noteCard: { backgroundColor: colors.border + '50' },
});

export default DailyGoals;
