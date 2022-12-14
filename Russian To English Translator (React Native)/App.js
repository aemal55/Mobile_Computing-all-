import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SavedScreen from './screens/SavedScreen';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import colors from './utils/colors';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';



SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Translate",
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'red',
          tabBarIcon: (props) => <MaterialIcons name="g-translate" size={props.size} color={'black'} />
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Favourites",
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'red',
          tabBarIcon: (props) => <AntDesign name="heart" size={props.size} color={'black'} />
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'red',
          tabBarIcon: (props) => <Ionicons name="settings-sharp" size={props.size} color={'black'} />
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setAppIsLoaded(true);
      }
    };

    prepare();

  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);
  
  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{ flex: 1 }}>
          <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontFamily: 'medium',
              color: 'black'
            },
            headerStyle: {
              backgroundColor: colors.primary
            }
          }}>
            <Stack.Group>
              <Stack.Screen
                name="main"
                component={TabNavigator}
                options={{
                  headerTitle: "Translate"
                }}
              />
            </Stack.Group>

            <Stack.Group
              screenOptions={{
                presentation: 'containedModel',
                headerStyle: {
                  backgroundColor: 'white'
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: 'medium'
                }
              }}
            >
              <Stack.Screen
                name="LanguageSelect"
                component={LanguageSelectScreen}
              />
            </Stack.Group>
            </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
