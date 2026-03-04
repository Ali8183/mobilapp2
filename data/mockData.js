export const INITIAL_BLOOD_SUGAR = [
    { id: '1', date: '2023-10-25', time: '08:00', meal: 'Sabah', status: 'Açlık', value: 95, insulin: '4' },
    { id: '2', date: '2023-10-25', time: '13:00', meal: 'Öğle', status: 'Tokluk', value: 140, insulin: '6' },
];

export const INITIAL_PHYSICAL_ACTIVITY = [
    { id: '1', type: 'Yürüyüş', duration: '30', completed: true, datetime: '2023-10-25 09:00' },
    { id: '2', type: 'Bisiklet', duration: '45', completed: false, datetime: '2023-10-26 18:00' },
];

export const INITIAL_NUTRITION = [
    { id: '1', name: 'Yumurta', calories: '78', unit: 'Adet', amount: '2' },
    { id: '2', name: 'Tam Buğday Ekmeği', calories: '69', unit: 'Dilim', amount: '2' },
];

export const DAILY_GOALS = {
    bloodSugar: 'Açlık: 70-130 mg/dL, Tokluk: < 180 mg/dL',
    water: 'Günde en az 2.5 - 3 litre',
    exercise: 'Haftada en az 150 dakika orta şiddetli aktivite',
    nutrition: 'Düşük glisemik indeksli gıdalar, bol lifli sebzeler ve dengeli karbonhidrat tüketimi önerilmektedir.',
};
