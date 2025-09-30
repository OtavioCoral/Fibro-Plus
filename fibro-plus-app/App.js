import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Suas telas
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import PainPointsScreen from "./src/screens/PainPointsScreen";
import InicialScreen from "./src/screens/InicialScreen";
import WeatherScreen from "./src/screens/WeatherScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{ headerShown: false }}
      >
        {/* Cadastro → Login */}
        <Stack.Screen name="Cadastro" component={CadastroScreen} />

        {/* Login → PainPoints */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* PainPoints → Inicial */}
        <Stack.Screen name="PainPoints" component={PainPointsScreen} />

        {/* Tela Inicial (Página X) */}
        <Stack.Screen name="Inicial" component={InicialScreen} />

        {/* Weather (se precisar ainda no projeto) */}
        <Stack.Screen name="Weather" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Inicial">
//         <Stack.Screen name="Inicial" component={InicialScreen} />
//         <Stack.Screen name="Weather" component={WeatherScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import WeatherScreen from "./WeatherScreen";
// import InicialScreen from "./InicialScreen";
 
// const Stack = createStackNavigator();
 
// export default function App() {
//   return (
// <NavigationContainer>
// <Stack.Navigator initialRouteName="Weather">
// <Stack.Screen name="Weather" component={WeatherScreen} />
// <Stack.Screen name="Inicial" component={InicialScreen} />
// </Stack.Navigator>
// </NavigationContainer>
//   );
// }
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from "react";
// import CadastroScreen from "../backend/src/screens/CadastroScreen";

// export default function App() {
//   return <CadastroScreen />;
// }
// import LoginScreen from "..backend/src/screens/LoginScreen";   
// import CadastroScreen from "./CadastroScreen"; 
 
// import { Text, View } from "react-native"; // só pra usar na PaginaX temporária
 
// const Stack = createStackNavigator();
 
// export default function App() {
//   return (
// <NavigationContainer>
// <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {/* Login */}
// <Stack.Screen name="Login" component={LoginScreen} />
 
//         {/* Cadastro */}
// <Stack.Screen name="Cadastro" component={CadastroScreen} />
 
//         {/* Tela Inicial */}
// <Stack.Screen
//           name="Tela Inicial"
//           component={() => (
// <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// <Text style={{ fontSize: 22, fontWeight: "bold" }}>Página X</Text>
// </View>
//           )}
//         />
// </Stack.Navigator>
// </NavigationContainer>
//   );
// }

// import PainPointsScreen from "./screens/PainPointsScreen";
// import InicialScreen from "./src/InicialScreen"; // pode ser em branco

// // Dentro do seu Stack.Navigator:
// <>
//   // Dentro do seu Stack.Navigator:
//   <Stack.Screen name="PainPointsScreen" component={PainPointsScreen} /><Stack.Screen name="InicialScreen" component={InicialScreen} /></>
