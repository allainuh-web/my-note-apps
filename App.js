import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  function noteInputHandler(text) {
    setEnteredNoteText(text);
  }

  function addNoteHandler() {
    if (!enteredNoteText.trim()) return;

    setNotes((currentNotes) => [
      ...currentNotes,
      { id: Math.random().toString(), text: enteredNoteText },
    ]);

    setEnteredNoteText("");
  }

  function deleteNoteHandler(id) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );

    if (selectedNoteId === id) {
      setSelectedNoteId(null);
      setEnteredNoteText("");
    }
  }

  function confirmDeleteHandler(id) {
    Alert.alert(
      "Delete this note?",
      "Are you sure you want to delete it?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: () => deleteNoteHandler(id) },
      ]
    );
  }

  function openNoteHandler(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    if (!noteToEdit) return;

    setSelectedNoteId(id);
    setEnteredNoteText(noteToEdit.text);
  }

  function updateNoteHandler() {
    if (!enteredNoteText.trim()) return;

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: enteredNoteText }
          : note
      )
    );

    setSelectedNoteId(null);
    setEnteredNoteText("");
  }

  function cancelEditHandler() {
    setSelectedNoteId(null);
    setEnteredNoteText("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

    
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a note..."
          value={enteredNoteText}
          onChangeText={noteInputHandler}
        />
        {selectedNoteId ? (
          <View style={{ gap: 6 }}>
            <Button title="Update" onPress={updateNoteHandler} />
            <Button title="Cancel" onPress={cancelEditHandler} />
          </View>
        ) : (
          <Button title="Add" onPress={addNoteHandler} />
        )}
      </View>

      
      <View style={styles.listBox}>
        <Text style={styles.listTitle}>
          {selectedNoteId ? "Editing Note:" : "List of Notes"}
        </Text>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteText}>{item.text}</Text>

              <View style={styles.noteButtons}>
                <Pressable
                  style={styles.deleteBtn}
                  onPress={() => confirmDeleteHandler(item.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>

                <Pressable
                  style={styles.editBtn}
                  onPress={() => openNoteHandler(item.id)}
                >
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#130606",
    padding: 10,
    width: 280,
    marginRight: 10,
    borderRadius: 5,
  },

  listBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#758897",
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  noteItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
  },

  noteText: {
    fontSize: 16,
  },

  noteButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
    gap: 6,
  },

  deleteBtn: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },

  editBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
});