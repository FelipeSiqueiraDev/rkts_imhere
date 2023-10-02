import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome"
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    return Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Meu super evento incrível!</Text>
      <Text style={styles.eventDate}>Segunda, 2 de Outubro de 2023</Text>

      <View style={styles.form}>
        <TextInput
          value={participantName}
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
      />
    </View>
  );
}
