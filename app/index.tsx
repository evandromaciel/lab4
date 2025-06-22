import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";

export default function App() {
  const [tasks, setTasks] = useState(["Do Laundry", "Go to gym", "Walk dog"]);

  const addTask = (taskText: string) => {
    setTasks([...tasks, taskText]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <Text style={styles.title}>My Todo List</Text>

        <ToDoList tasks={tasks} />

        <ToDoForm addTask={addTask} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
});
