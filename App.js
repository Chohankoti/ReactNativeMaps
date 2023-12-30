import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';

export default function App() {
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TabNavigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});