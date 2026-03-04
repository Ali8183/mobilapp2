import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors } from '../utils/colors';
import { INITIAL_NUTRITION } from '../data/mockData';
import { saveData, getData } from '../utils/storage';

const Nutrition = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const storedData = await getData('nutrition');
        if (storedData) {
            setData(storedData);
        } else {
            setData(INITIAL_NUTRITION);
            saveData('nutrition', INITIAL_NUTRITION);
        }
    };

    const handleAddFood = () => {
        if (!name || !calories || !amount) {
            Alert.alert('Eksik Bilgi', 'Tüm alanları doldurunuz.');
            return;
        }

        const newFood = {
            id: Math.random().toString(),
            name,
            calories,
            unit: unit || 'Porsiyon',
            amount,
        };

        const newData = [newFood, ...data];
        setData(newData);
        saveData('nutrition', newData);

        setName('');
        setCalories('');
        setUnit('');
        setAmount('');
    };

    const handleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        saveData('nutrition', newData);
    };

    const totalCalories = data.reduce((total, item) => total + (parseInt(item.calories) * parseFloat(item.amount)), 0);

    const renderItem = ({ item }) => (
        <Card style={styles.recordCard}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="food-apple" size={24} color={colors.primary} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodDetail}>{item.amount} {item.unit} • {item.calories} kcal/birim</Text>
                </View>
                <View style={styles.calorieContainer}>
                    <Text style={styles.totalItemCalorie}>{(parseInt(item.calories) * parseFloat(item.amount)).toFixed(0)}</Text>
                    <Text style={styles.kcalText}>kcal</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Günlük Toplam Kalori</Text>
                <Text style={styles.summaryValue}>{totalCalories.toFixed(0)} <Text style={styles.summaryUnit}>kcal</Text></Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Besin Ekle</Text>
                <TextInput style={styles.input} placeholder="Besin Adı (Örn: Elma)" value={name} onChangeText={setName} />

                <View style={styles.row}>
                    <TextInput style={[styles.input, styles.halfInput]} placeholder="Kalori (1 br)" keyboardType="numeric" value={calories} onChangeText={setCalories} />
                    <TextInput style={[styles.input, styles.halfInput]} placeholder="Birim (Adet, Porsion)" value={unit} onChangeText={setUnit} />
                </View>

                <View style={styles.row}>
                    <TextInput style={[styles.input, styles.fullInput]} placeholder="Tüketilen Miktar" keyboardType="numeric" value={amount} onChangeText={setAmount} />
                </View>

                <Button title="LİSTEYE KAYDET" onPress={handleAddFood} style={styles.saveButton} />
            </View>

            {data.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={48} color={colors.gray} />
                    <Text style={styles.emptyText}>Bugün henüz besin kaydı girmediniz.</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    summaryContainer: { backgroundColor: colors.primary, padding: 24, alignItems: 'center', justifyContent: 'center' },
    summaryTitle: { color: colors.white, fontSize: 16, opacity: 0.9, marginBottom: 8 },
    summaryValue: { color: colors.white, fontSize: 36, fontWeight: 'bold' },
    summaryUnit: { fontSize: 18, fontWeight: 'normal' },

    formContainer: { backgroundColor: colors.white, padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    formTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textDark, marginBottom: 16 },
    input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, marginBottom: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    halfInput: { flex: 1 },
    fullInput: { flex: 1 },
    saveButton: { marginTop: 8 },

    listContainer: { padding: 8, paddingBottom: 20 },
    recordCard: { padding: 12 },
    cardContent: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    infoContainer: { flex: 1 },
    foodName: { fontSize: 16, fontWeight: 'bold', color: colors.textDark, marginBottom: 4 },
    foodDetail: { fontSize: 13, color: colors.textLight },
    calorieContainer: { alignItems: 'flex-end', marginRight: 16 },
    totalItemCalorie: { fontSize: 18, fontWeight: 'bold', color: colors.warning },
    kcalText: { fontSize: 12, color: colors.textLight },
    deleteButton: { padding: 8 },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { marginTop: 12, fontSize: 14, color: colors.textLight },
});

export default Nutrition;
