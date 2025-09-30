import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from "react-native";

// Pegando largura e altura da tela
const { width, height } = Dimensions.get("window");

// Posições dos pontos de dor
const painPoints = [
  { id: 1, x: width * 0.3, y: height * 0.25 },
  { id: 2, x: width * 0.5, y: height * 0.2 },
  { id: 3, x: width * 0.7, y: height * 0.25 },
  { id: 4, x: width * 0.35, y: height * 0.45 },
  { id: 5, x: width * 0.65, y: height * 0.45 },
  { id: 6, x: width * 0.4, y: height * 0.65 },
  { id: 7, x: width * 0.6, y: height * 0.65 },
];

export default function PainPointsScreen({ navigation }) {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [animations] = useState(
    painPoints.map(() => new Animated.Value(0))
  );
  const [showSuccess, setShowSuccess] = useState(false);

  // Função chamada ao clicar em um ponto de dor
  const handlePress = (index, id) => {
    // Alterna seleção
    const isSelected = selectedPoints.includes(id);
    let newSelected = [];
    if (isSelected) {
      newSelected = selectedPoints.filter((p) => p !== id);
    } else {
      newSelected = [...selectedPoints, id];
    }
    setSelectedPoints(newSelected);

    // Animação suave de troca de cor
    Animated.timing(animations[index], {
      toValue: isSelected ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Função chamada ao confirmar
  const handleConfirm = () => {
    // Aqui você pode salvar no banco de dados
    console.log("Salvando pontos selecionados:", selectedPoints);

    // Mostra aviso de sucesso
    setShowSuccess(true);

    // Depois de 1.5s, navega para outra tela
    setTimeout(() => {
      setShowSuccess(false);
      navigation.navigate("NextScreen"); // Tela de destino (pode ser em branco)
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Clique nos pontos verdes abaixo para nos informar seu(s) foco(s) de DOR
      </Text>

      {/* Posição dos pontos de dor */}
      {painPoints.map((point, index) => {
        const backgroundColor = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["#006400", "#90EE90"], // verde escuro -> verde claro
        });
        return (
          <Animated.View
            key={point.id}
            style={[
              styles.point,
              {
                top: point.y,
                left: point.x,
                backgroundColor,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => handlePress(index, point.id)}
            />
          </Animated.View>
        );
      })}

      {/* Botão inverter (apenas ilustração) */}
      <TouchableOpacity style={styles.invertButton}>
        <Text style={{ color: "white" }}>🔄</Text>
      </TouchableOpacity>

      {/* Botão confirmar */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>CONTINUAR</Text>
      </TouchableOpacity>

      {/* Aviso de sucesso */}
      {showSuccess && (
        <View style={styles.successOverlay}>
          <Text style={styles.successText}>✅ Sucesso!</Text>
        </View>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  point: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
  },
  touchable: {
    flex: 1,
  },
  invertButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#800080",
    padding: 10,
    borderRadius: 25,
  },
  confirmButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#DA70D6",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
  },
  confirmText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  successOverlay: {
    position: "absolute",
    top: height / 2 - 50,
    left: width / 2 - 75,
    width: 150,
    height: 100,
    backgroundColor: "#32CD32",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  successText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
