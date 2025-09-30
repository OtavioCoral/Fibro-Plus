import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import axios from "axios";
 
const { width, height } = Dimensions.get("window");
 
// Sua chave do OpenWeather
const API_KEY = "SUA_API_KEY";  //INCREMENTAR CHAVE
const CITY = "Sao Paulo";
 
export default function WeatherScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [uvIndex, setUvIndex] = useState(0);
  const [illumination, setIllumination] = useState(0);
 
  // Animação das bolinhas
  const animX = useRef(new Animated.Value(0)).current;
  const animY = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    // Loop infinito para flutuação
    Animated.loop(
      Animated.sequence([
        Animated.timing(animX, {
          toValue: 20,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(animX, {
          toValue: -20,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
 
    Animated.loop(
      Animated.sequence([
        Animated.timing(animY, {
          toValue: 15,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: -15,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
 
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}&lang=pt_br`
        );
 
        setData(res.data);
 
        // Pegar lat/lon para UV
        const { lat, lon } = res.data.coord;
        const uvRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setUvIndex(uvRes.data.value);
 
        // Cálculo de iluminação (0% noite, 100% meio dia)
        const now = Date.now() / 1000; // timestamp atual em segundos
        const { sunrise, sunset } = res.data.sys;
        if (now < sunrise || now > sunset) {
          setIllumination(0);
        } else {
          const midDay = (sunrise + sunset) / 2;
          const daylightDuration = sunset - sunrise;
          const distanceFromMid = Math.abs(now - midDay);
          const percent =
            100 - (distanceFromMid / (daylightDuration / 2)) * 100;
          setIllumination(Math.round(percent));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, []);
 
  if (!data) {
    return (
<View style={styles.container}>
<Text style={{ color: "#fff" }}>Carregando...</Text>
</View>
    );
  }
 
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
 
  // Termômetro circular
  const maxTemp = 50;
  const strokeDasharray = 2 * Math.PI * 70;
  const strokeDashoffset =
    strokeDasharray - (temperature / maxTemp) * strokeDasharray;
 
  return (
<View style={styles.container}>
      {/* Bolinhas animadas no fundo */}
<Animated.View
        style={[
          styles.circle,
          { transform: [{ translateX: animX }, { translateY: animY }] },
        ]}
      />
<Animated.View
        style={[
          styles.circleSmall,
          { transform: [{ translateX: animY }, { translateY: animX }] },
        ]}
      />
 
      <Text style={styles.title}>Exercícios Aeróbicos</Text>
 
      {/* Termômetro Circular */}
<Svg height="180" width="180">
<Circle
          cx="90"
          cy="90"
          r="70"
          stroke="#ddd"
          strokeWidth="10"
          fill="none"
        />
<Circle
          cx="90"
          cy="90"
          r="70"
          stroke="red"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
</Svg>
<Text style={styles.tempText}>{temperature}°C</Text>
 
      {/* Informações extras */}
<View style={styles.infoBox}>
<Text>Umidade: {humidity}%</Text>
<Text>Índice UV: {uvIndex}</Text>
<Text>Iluminação: {illumination}%</Text>
</View>
 
      {/* Botão voltar */}
<TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PaginaX")}
>
<Text style={styles.buttonText}>Voltar</Text>
</TouchableOpacity>
</View>
  );
} 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  tempText: {
    position: "absolute",
    top: 200,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginTop: 50,
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  circle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(128,0,128,0.4)",
    top: 100,
    left: 40,
  },
  circleSmall: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(186,85,211,0.5)",
    top: height / 2,
    left: width / 2.5,
  },
});