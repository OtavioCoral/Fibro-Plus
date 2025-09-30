import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
 
const { width, height } = Dimensions.get("window");
 
export default function LoginScreen() {
  const navigation = useNavigation();
 
  // animações inputs
  const [scaleEmail] = useState(new Animated.Value(1));
  const [scaleSenha] = useState(new Animated.Value(1));
 
  // animações círculos
  const [circle1] = useState(new Animated.Value(0));
  const [circle2] = useState(new Animated.Value(0));
  const [circle3] = useState(new Animated.Value(0));
 
  useEffect(() => {
    // loop infinito com delay diferente pra cada círculo
    const animateCircle = (circle, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(circle, {
            toValue: 1,
            duration: 12000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(circle, {
            toValue: 0,
            duration: 12000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
 
    animateCircle(circle1, 0);
    animateCircle(circle2, 2000);
    animateCircle(circle3, 4000);
  }, []);
 
  // função anima input
  const animateInput = (input) => {
    Animated.sequence([
      Animated.timing(input, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(input, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
 
  return (
<View style={styles.container}>
      {/* Círculos animados */}
<Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: "#7b1fa2",
            top: -100,
            left: -50,
            transform: [
              {
                scale: circle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
              {
                translateX: circle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 30],
                }),
              },
              {
                translateY: circle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
            ],
          },
        ]}
      />
<Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: "#6a1b9a",
            bottom: -150,
            right: -80,
            transform: [
              {
                scale: circle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
              {
                translateX: circle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -25],
                }),
              },
              {
                translateY: circle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }),
              },
            ],
          },
        ]}
      />
<Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: "#8e24aa",
            top: height / 2,
            left: -100,
            transform: [
              {
                scale: circle3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.25],
                }),
              },
              {
                translateX: circle3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
              {
                translateY: circle3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]}
      />
 
  
<Text style={styles.title}>BEM VINDO AO{"\n"}FIBRO PLUS</Text>
 
      <Text style={styles.loginText}>LOGIN</Text>
 
      {/* Campo email */}
<Animated.View style={{ transform: [{ scale: scaleEmail }] }}>
<TextInput
          placeholder="email"
          style={styles.input}
          onFocus={() => animateInput(scaleEmail)}
        />
</Animated.View>
 
      {/* Campo senha */}
<Animated.View style={{ transform: [{ scale: scaleSenha }] }}>
<TextInput
          placeholder="senha"
          secureTextEntry
          style={styles.input}
          onFocus={() => animateInput(scaleSenha)}
        />
</Animated.View>
 
      {/* Botão Entrar */}
<TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inicial")}
>
<Text style={styles.buttonText}>ENTRAR</Text>
</TouchableOpacity>
 
      {/* Botão Cadastrar-se */}
<TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => navigation.navigate("Cadastro")}
>
<Text style={styles.buttonText}>CADASTRE-SE</Text>
</TouchableOpacity>
</View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B0A4E",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: 250,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#9c4dcc",
    padding: 12,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#ce93d8",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  circle: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.35,
  },
});