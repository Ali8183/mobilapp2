import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors } from '../utils/colors';
import { INITIAL_PHYSICAL_ACTIVITY } from '../data/mockData';
import { saveData, getData } from '../utils/storage';

const FILTERS = ['Tümü', 'Yapıldı', 'Yapılmadı'];

const PhysicalActivity = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('Tümü');
    const [modalVisible, setModalVisible] = useState(false);

    // Form State
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const storedData = await getData('physicalActivity');
        if (storedData) {
            setData(storedData);
        } else {
            setData(INITIAL_PHYSICAL_ACTIVITY);
            saveData('physicalActivity', INITIAL_PHYSICAL_ACTIVITY);
        }
    };

    const handleAddActivity = () => {
        if (!type || !duration) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
            return;
        }

        const newActivity = {
            id: Math.random().toString(),
            type,
            duration,
            completed: true,
            datetime: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
        };

        const newData = [newActivity, ...data];
        setData(newData);
        saveData('physicalActivity', newData);

        setModalVisible(false);
        setType('');
        setDuration('');
    };

    const toggleComplete = (id) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setData(newData);
        saveData('physicalActivity', newData);
    };

    const handleDelete = (id) => {
        Alert.alert('Sil', 'Bu aktiviteyi silmek istiyor musunuz?', [
            { text: 'İptal', style: 'cancel' },
            {
                text: 'Sil', style: 'destructive', onPress: () => {
                    const newData = data.filter(item => item.id !== id);
                    setData(newData);
                    saveData('physicalActivity', newData);
                }
            }
        ]);
    };

    const filteredData = data.filter(item => {
        if (filter === 'Yapıldı') return item.completed;
        if (filter === 'Yapılmadı') return !item.completed;
        return true;
    });

    const renderItem = ({ item }) => (
        <Card style={styles.recordCard}>
            <View style={styles.cardContent}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleComplete(item.id)}
                >
                    <MaterialCommunityIcons
                        name={item.completed ? 'check-circle' : 'circle-outline'}
                        size={28}
                        color={item.completed ? colors.success : colors.gray}
                    />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Text style={[styles.activityType, item.completed && styles.textCompleted]}>{item.type}</Text>
                    <Text style={styles.activityDetail}>{item.duration} dk • {item.datetime}</Text>
                </View>

                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Button title="YENİ AKTİVİTE EKLE" onPress={() => setModalVisible(true)} />

                <View style={styles.filterContainer}>
                    {FILTERS.map(f => (
                        <TouchableOpacity
                            key={f}
                            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {filteredData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="run" size={64} color={colors.gray} />
                    <Text style={styles.emptyText}>Bu filtreye uygun aktivite bulunamadı.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {/* Modal Ekleme Formu */}
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Aktivite Ekle</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Aktivite Türü (Örn: Yürüyüş)"
                            value={type}
                            onChangeText={setType}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Süre (Dakika)"
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                        />

                        <View style={styles.modalActions}>
                            <Button title="İptal" style={[styles.actionBtn, { backgroundColor: colors.gray }]} onPress={() => setModalVisible(false)} />
                            <Button title="Kaydet" style={styles.actionBtn} onPress={handleAddActivity} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerArea: { padding: 16, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    filterButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.background },
    filterButtonActive: { backgroundColor: colors.primary },
    filterText: { color: colors.textLight, fontWeight: '600', fontSize: 13 },
    filterTextActive: { color: colors.white },
    listContainer: { padding: 8, paddingBottom: 20 },

    recordCard: { padding: 16 },
    cardContent: { flexDirection: 'row', alignItems: 'center' },
    checkbox: { marginRight: 12 },
    infoContainer: { flex: 1 },
    activityType: { fontSize: 16, fontWeight: 'bold', color: colors.textDark, marginBottom: 4 },
    activityDetail: { fontSize: 13, color: colors.textLight },
    textCompleted: { textDecorationLine: 'line-through', color: colors.textLight },
    deleteButton: { padding: 8 },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { marginTop: 16, fontSize: 16, color: colors.textLight, textAlign: 'center' },

    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContainer: { backgroundColor: colors.white, borderRadius: 16, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textDark, marginBottom: 16, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
    modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    actionBtn: { flex: 1, marginHorizontal: 4 },
});

export default PhysicalActivity;
