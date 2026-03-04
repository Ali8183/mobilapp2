import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import { colors } from '../utils/colors';

const MOCK_CONTACTS = [
    { id: '1', name: 'Ambulans', phone: '112', icon: 'ambulance', color: colors.danger, description: 'Acil durumlarda hemen arayın.' },
    { id: '2', name: 'Doktorum (Dr. Ahmet Yılmaz)', phone: '05551234567', icon: 'doctor', color: colors.primary, description: 'Diyabet uzmanı.' },
    { id: '3', name: 'Diyabet Danışma Hattı', phone: '4440000', icon: 'phone-in-talk', color: '#3498DB', description: '7/24 ücretsiz danışmanlık.' },
    { id: '4', name: 'Yakınım (Eşim)', phone: '05321112233', icon: 'account-heart', color: '#9B59B6', description: 'Şeker düşmesi (hipoglisemi) durumunda aranacak kişi.' },
];

const Emergency = () => {
    const handleCall = (phone, name) => {
        Alert.alert(
            'Arama Yapılıyor',
            `${name} (${phone}) aranacak onaylıyor musunuz?`,
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Ara',
                    onPress: () => {
                        // React Native Linking will try to open the phone dialer
                        Linking.openURL(`tel:${phone}`).catch((err) => {
                            Alert.alert('Hata', 'Arama başlatılamadı. Bu cihaz desteklemiyor olabilir.');
                        });
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => handleCall(item.phone, item.name)}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.phoneText}>{item.phone}</Text>
                    <Text style={styles.descText} numberOfLines={2}>{item.description}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <View style={styles.callButton}>
                        <MaterialCommunityIcons name="phone" size={24} color={colors.white} />
                    </View>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.danger} />
                <Text style={styles.headerTitle}>Acil Durum İletişim Bilgileri</Text>
                <Text style={styles.headerDesc}>Kan şekeriniz aniden düşer veya artarsa zaman kaybetmeden iletişime geçin.</Text>
            </View>

            <FlatList
                data={MOCK_CONTACTS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerArea: { padding: 24, alignItems: 'center', backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textDark, marginTop: 12, textAlign: 'center' },
    headerDesc: { fontSize: 14, color: colors.textLight, textAlign: 'center', marginTop: 8, lineHeight: 20 },

    listContainer: { padding: 8, paddingTop: 16, paddingBottom: 24 },
    card: { padding: 12, marginBottom: 8 },
    cardContent: { flexDirection: 'row', alignItems: 'center' },

    iconContainer: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    infoContainer: { flex: 1, justifyContent: 'center' },
    nameText: { fontSize: 16, fontWeight: 'bold', color: colors.textDark, marginBottom: 4 },
    phoneText: { fontSize: 15, fontWeight: '600', color: colors.textLight, marginBottom: 4 },
    descText: { fontSize: 12, color: colors.textLight, opacity: 0.8 },

    actionContainer: { paddingLeft: 12 },
    callButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
});

export default Emergency;
