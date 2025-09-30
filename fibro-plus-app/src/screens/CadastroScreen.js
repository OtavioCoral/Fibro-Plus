import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import api from "../services/api"

export default function CadastroScreen() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função chamada ao clicar em "Cadastrar"
  const handleCadastrar = async () => {
    try {
      const response = await api.post('/users/register', { nome, CPF, email, password });
      console.log('Cadastro bem-sucedido:', response.data);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso! Faça login para continuar.');
      navigation.navigate('Login'); // Volta para a tela de login após o cadastro
    } catch (error) {
      console.error('Erro no cadastro:', error.response?.data || error.message);
      console.log(error);
      Alert.alert('Erro no Cadastro', error.response?.data?.message || 'Ocorreu um erro ao tentar cadastrar.');
    }
  };


  // Função chamada ao clicar em "Entrar"
  const handleEntrar = () => {
    console.log("Entrando com:", { email, password });
    // Aqui futuramente você pode redirecionar para a tela principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BEM VINDO AO{"\n"}FIBRO PLUS</Text>

      <Text style={styles.subtitulo}>CADASTRE-SE</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#666"
        value={CPF}
        onChangeText={setCPF}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botões */}
      <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastrar}>
        <Text style={styles.textoBotao}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoEntrar} onPress={handleEntrar}>
        <Text style={styles.textoBotao}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b0a57", // Roxo escuro do fundo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  botaoCadastrar: {
    backgroundColor: "#c79bd9", // Roxo claro
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  botaoEntrar: {
    backgroundColor: "#b07dbf", // Outro tom roxo
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
