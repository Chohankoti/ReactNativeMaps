import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Maps from './Maps';
import AddLocation from './AddLocation';
import NavigateToLocation from './NavigateToLocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    const tabBarOptions = {
        tabBarStyle: {
            backgroundColor: 'black',
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            position: 'absolute',
        },
    };

    return (
        <Tab.Navigator
            screenOptions={{
                ...tabBarOptions,
                headerShown: false,
            }}
        >
            <Tab.Screen name="Maps" component={Maps} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="google-maps" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="AddLocation" component={AddLocation} options={{
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="location" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="Navigate" component={NavigateToLocation} options={{
                tabBarIcon: ({ color, size }) => (
                    <Feather name="navigation" size={size} color={color} />
                ),
            }} />
        </Tab.Navigator>
    );
}