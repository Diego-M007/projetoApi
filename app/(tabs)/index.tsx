import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const App = () => {
  // Criando os UseStates para poder usar o Set para mudar os valores
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  // constante para quando clicar no botão de enviar
  const fetchAddress = async () => {
    try {
      // aqui está esperando fazer a busca de acordo com o CPF e após a busca está Setando o valor do endereço
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
      // aqui ele busca caso der erro e mostra o erro no Console e caso houver erro ele Seta novamente o endereço como "Null"
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  const NovaBusca = () => {
    setAddress(null);
    setCep("");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          height: 400,
          width: 400,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: "#363636",
          margin: 200,
        }}
      >
        {/* Informações para chamar o Icon */}
        <FontAwesome name="map-o" color={"#DC143C"} size={60} />
        <TextInput
          placeholder="Digite o CEP"
          // Value é o valor que aparece no Inpit enquanto a pessoa digita, ele está definindo o valor como Cep
          value={cep}
          // Aqui está usando o OnChange para ir atualizando conforme o usuario digita
          onChangeText={setCep}
          keyboardType="numeric"
          style={{
            height: 50,
            width: "60%",
            borderWidth: 1,
            borderColor: "#D3D3D3",
            padding: 10,
            fontSize: 15,
            color: "#D3D3D3",
            borderRadius: 10,
            margin: 30,
          }}
        />
        {/* Usando o onPress para chamar a função de enviar o endereço */}
        <TouchableOpacity
          onPress={fetchAddress}
          style={{
            backgroundColor: "#DC143C",
            height: 50,
            width: 150,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>Encontrar</Text>
        </TouchableOpacity>

        <Text> Encontramos qualquer endereço do Brasil</Text>
        <Text>Exemplo 72015-180</Text>
      </View>
      {address && (
        // Renderizando a View com as informações caso achar um endereço válido
        <View
          style={{
            height: 400,
            width: 400,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderColor: "#363636",
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 20,
            }}
          >
            {/* chamando os valores dos Props dentro do Endereço para passar as informações */}
            <Text style={{ margin: 10, fontSize: 17 }}>
              <Text style={{ fontWeight: "bold" }}>CEP:</Text>
              <Text> {address.cep}</Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 17 }}>
              <Text style={{ fontWeight: "bold" }}>Rua:</Text>
              <Text> {address.logradouro}</Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 17 }}>
              <Text style={{ fontWeight: "bold" }}>Bairro:</Text>
              <Text> {address.bairro}</Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 17 }}>
              <Text style={{ fontWeight: "bold" }}>Cidade:</Text>
              <Text> {address.localidade}</Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 17 }}>
              <Text style={{ fontWeight: "bold" }}>Estado:</Text>
              <Text> {address.uf}</Text>
            </Text>
          </View>

          <TouchableOpacity
            // botão chamando a função para fazer nova busca, zerando valores de CEP e Endereço
            onPress={NovaBusca}
            style={{
              backgroundColor: "#DC143C",
              height: 50,
              width: 150,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 17 }}>Nova Busca</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default App;
