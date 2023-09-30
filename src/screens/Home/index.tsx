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
  const participants = [
    "Felipe",
    "Ana Luiza",
    "Gleiton",
    "Rafael",
    "Davidson",
    "Pedro",
    "Igor",
    "Alexandre",
    "Larissa",
    "Lorraine",
    "Vinicius",
  ];

  function handleParticipantAdd() {
    if (participants.includes("Felipe")) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome"
      );
    }
  }

  function handleParticipantRemove(name: string) {
    return Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      { text: "Sim", onPress: () => Alert.alert("Participante removido") },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
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
