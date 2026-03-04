import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

// Screens
import Dashboard from '../screens/Dashboard';
import BloodSugar from '../screens/BloodSugar';
import PhysicalActivity from '../screens/PhysicalActivity';
import Nutrition from '../screens/Nutrition';
import DailyGoals from '../screens/DailyGoals';
import Forms from '../screens/Forms';
import Emergency from '../screens/Emergency';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Ana Sayfa') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Kan Şekeri') {
                        iconName = focused ? 'water' : 'water-outline';
                    } else if (route.name === 'Aktivite') {
                        iconName = focused ? 'run-fast' : 'run';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight,
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
            })}
        >
            <Tab.Screen name="Ana Sayfa" component={Dashboard} options={{ title: 'Sağlık Takip Sistemi' }} />
            <Tab.Screen name="Kan Şekeri" component={BloodSugar} options={{ title: 'Kan Şekeri İzlemi' }} />
            <Tab.Screen name="Aktivite" component={PhysicalActivity} options={{ title: 'Fiziksel Aktivitelerim' }} />
        </Tab.Navigator>
    );
}

// Stack Navigator wrapper
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: colors.white,
                    headerBackTitleVisible: false,
                }}
                initialRouteName="HomeTabs"
            >
                <Stack.Screen
                    name="HomeTabs"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="BloodSugar" component={BloodSugar} options={{ title: 'Kan Şekeri İzlemi' }} />
                <Stack.Screen name="PhysicalActivity" component={PhysicalActivity} options={{ title: 'Fiziksel Aktivitelerim' }} />
                <Stack.Screen name="Nutrition" component={Nutrition} options={{ title: 'Beslenme Değerlendirme' }} />
                <Stack.Screen name="DailyGoals" component={DailyGoals} options={{ title: 'Günlük Hedefler' }} />
                <Stack.Screen name="Forms" component={Forms} options={{ title: 'Formlar' }} />
                <Stack.Screen name="Emergency" component={Emergency} options={{ title: 'Acil İletişim' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
