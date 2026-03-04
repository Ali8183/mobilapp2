import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors } from '../utils/colors';

const MOCK_FORMS = [
    { id: '1', title: 'Aylık Diyabet Değerlendirme Formu', icon: 'file-document-outline', color: '#9B59B6', description: 'Ay sonu genel sağlık check-up verileri.' },
    { id: '2', title: 'Günlük Şeker Profili (7 Nokta)', icon: 'chart-line', color: colors.primary, description: 'Günde 7 kez ölçüm yapan hastalar için detaylı profil.' },
    { id: '3', title: 'İnsülin Değişim Talep Formu', icon: 'needle', color: '#3498DB', description: 'Doz değişikliği talep bildirim formu.' },
    { id: '4', title: 'Risk Analiz Anketi', icon: 'shield-check', color: '#F39C12', description: 'Nöropati ve göz sorunları için rutin tarama.' },
];

const Forms = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const handleOpenForm = (form) => {
        setSelectedForm(form);
    };

    const handleCloseForm = () => {
        setSelectedForm(null);
    };

    const handleSubmit = () => {
        Alert.alert('Başarılı', 'Form başarıyla tıbbi birime iletildi.', [
            { text: 'Tamam', onPress: handleCloseForm, style: 'default' }
        ]);
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => handleOpenForm(item)}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.descText} numberOfLines={2}>{item.description}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color={colors.border} />
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Text style={styles.headerTitle}>Tıbbi Formlar ve Anketler</Text>
                <Text style={styles.headerDesc}>Doktorunuzun sizden doldurmanızı istediği formlara buradan ulaşabilirsiniz.</Text>
            </View>

            <FlatList
                data={MOCK_FORMS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={selectedForm !== null}
                onRequestClose={handleCloseForm}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedForm?.title}</Text>
                            <TouchableOpacity onPress={handleCloseForm}>
                                <MaterialCommunityIcons name="close" size={28} color={colors.textDark} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScroll}>
                            <View style={styles.emptyFormContainer}>
                                <MaterialCommunityIcons name="file-question" size={80} color={colors.gray} />
                                <Text style={styles.emptyFormText}>
                                    Bu form içeriği şu anda hazırlanıyor. Daha sonra form alanları eklenecektir.
                                </Text>
                            </View>
                        </ScrollView>

                        <Button title="GÖNDER (Demodur)" onPress={handleSubmit} style={styles.submitBtn} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerArea: { padding: 24, paddingVertical: 32, alignItems: 'center', backgroundColor: colors.primary, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.white, marginBottom: 8, textAlign: 'center' },
    headerDesc: { fontSize: 13, color: colors.white, textAlign: 'center', opacity: 0.9, lineHeight: 20 },

    listContainer: { padding: 8, paddingTop: 16, paddingBottom: 24 },
    card: { padding: 12, marginBottom: 8, borderRadius: 16 },
    cardContent: { flexDirection: 'row', alignItems: 'center' },

    iconContainer: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    infoContainer: { flex: 1, justifyContent: 'center', paddingRight: 8 },
    titleText: { fontSize: 16, fontWeight: 'bold', color: colors.textDark, marginBottom: 6 },
    descText: { fontSize: 12, color: colors.textLight, opacity: 0.8 },

    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContainer: { height: '85%', backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, flex: 1, marginRight: 16 },
    modalScroll: { flex: 1 },

    emptyFormContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
    emptyFormText: { marginTop: 16, fontSize: 16, color: colors.textLight, textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 },
    submitBtn: { marginTop: 20, marginBottom: 24 },
});

export default Forms;
