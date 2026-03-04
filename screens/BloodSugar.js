import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, Modal, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors } from '../utils/colors';
import { INITIAL_BLOOD_SUGAR } from '../data/mockData';
import { saveData, getData } from '../utils/storage';

const BloodSugar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Form State
    const [meal, setMeal] = useState('Sabah');
    const [status, setStatus] = useState('Açlık');
    const [value, setValue] = useState('');
    const [insulin, setInsulin] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const storedData = await getData('bloodSugar');
        if (storedData) {
            setData(storedData);
        } else {
            setData(INITIAL_BLOOD_SUGAR);
            saveData('bloodSugar', INITIAL_BLOOD_SUGAR);
        }
        setLoading(false);
    };

    const handleAddMeasurement = () => {
        if (!value || !insulin) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
            return;
        }

        const numericValue = parseInt(value, 10);

        if (numericValue < 70) {
            Alert.alert(
                'Uyarı: Düşük Kan Şekeri!',
                '15 dakika sonra tekrar ölçüm yapınız. Şekerli bir gıda tüketmeniz önerilir.',
                [{ text: 'Tamam', style: 'default' }]
            );
        }

        const newMeasurement = {
            id: Math.random().toString(),
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            meal,
            status,
            value: numericValue,
            insulin
        };

        const newData = [newMeasurement, ...data];
        setData(newData);
        saveData('bloodSugar', newData);

        setModalVisible(false);
        setValue('');
        setInsulin('');
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Kayıt Silinecek',
            'Bu kaydı silmek istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => {
                        const newData = data.filter(item => item.id !== id);
                        setData(newData);
                        saveData('bloodSugar', newData);
                    }
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <Card style={styles.recordCard}>
            <View style={styles.recordHeader}>
                <View style={styles.dateContainer}>
                    <MaterialCommunityIcons name="calendar" size={16} color={colors.textLight} />
                    <Text style={styles.recordDate}>{item.date} {item.time}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete" size={24} color={colors.danger} />
                </TouchableOpacity>
            </View>
            <View style={styles.recordDetails}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Öğün:</Text>
                    <Text style={styles.detailValue}>{item.meal}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Açlık/Tokluk:</Text>
                    <Text style={styles.detailValue}>{item.status}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Kan Şekeri:</Text>
                    <Text style={[styles.detailValue, { color: item.value < 70 ? colors.danger : item.value > 140 ? colors.warning : colors.success, fontWeight: 'bold' }]}>
                        {item.value} mg/dL
                    </Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>İnsülin:</Text>
                    <Text style={styles.detailValue}>{item.insulin} Ünite</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Button
                    title="YENİ KAYIT EKLE"
                    onPress={() => setModalVisible(true)}
                    style={styles.addButton}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.center} />
            ) : data.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="clipboard-text-off" size={64} color={colors.gray} />
                    <Text style={styles.emptyText}>Henüz ölçüm kaydı bulunmamaktadır.</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {/* Add Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalBackground}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Kan Şekeri Ekle</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={28} color={colors.textDark} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            <Text style={styles.inputLabel}>Öğün</Text>
                            <View style={styles.buttonGroup}>
                                {['Sabah', 'Öğle', 'Akşam'].map(m => (
                                    <TouchableOpacity
                                        key={m}
                                        style={[styles.selectorButton, meal === m && styles.selectorActive]}
                                        onPress={() => setMeal(m)}
                                    >
                                        <Text style={[styles.selectorText, meal === m && styles.selectorTextActive]}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.inputLabel}>Açlık Durumu</Text>
                            <View style={styles.buttonGroup}>
                                {['Açlık', 'Tokluk'].map(s => (
                                    <TouchableOpacity
                                        key={s}
                                        style={[styles.selectorButton, status === s && styles.selectorActive]}
                                        onPress={() => setStatus(s)}
                                    >
                                        <Text style={[styles.selectorText, status === s && styles.selectorTextActive]}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.inputLabel}>Kan Şekeri (mg/dL)</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={value}
                                onChangeText={setValue}
                                placeholder="Örn: 90"
                            />

                            <Text style={styles.inputLabel}>İnsülin Dozu (Ünite)</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={insulin}
                                onChangeText={setInsulin}
                                placeholder="Örn: 4"
                            />

                            <Button title="KAYDET" onPress={handleAddMeasurement} style={styles.saveButton} />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    center: { flex: 1, justifyContent: 'center' },
    headerArea: { padding: 16, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
    addButton: { width: '100%', borderRadius: 8 },
    listContainer: { padding: 8, paddingBottom: 20 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { marginTop: 16, fontSize: 16, color: colors.textLight, textAlign: 'center' },

    recordCard: { padding: 0, overflow: 'hidden' },
    recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary + '10', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    dateContainer: { flexDirection: 'row', alignItems: 'center' },
    recordDate: { marginLeft: 8, fontSize: 14, fontWeight: '600', color: colors.textDark },
    deleteButton: { padding: 4 },
    recordDetails: { padding: 16 },
    detailItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
    detailLabel: { fontSize: 15, color: colors.textLight, fontWeight: '500' },
    detailValue: { fontSize: 15, color: colors.textDark, fontWeight: '600' },

    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContainer: { backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '90%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textDark },
    inputLabel: { fontSize: 14, fontWeight: '600', color: colors.textDark, marginBottom: 8, marginTop: 12 },
    input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: colors.textDark },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    selectorButton: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 8, alignItems: 'center' },
    selectorActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    selectorText: { color: colors.textLight, fontWeight: '600' },
    selectorTextActive: { color: colors.white },
    saveButton: { marginTop: 24, marginBottom: 40 },
});

export default BloodSugar;
