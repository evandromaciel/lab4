import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import tasksData from "../data/tasks.json";

interface ToDoFormProps {
  addTask: (task: string) => void;
}

interface TasksData {
  tasks: string[];
}

function ToDoForm({ addTask }: ToDoFormProps) {
  const [taskText, setTaskText] = useState("");
  const [availableTasks, setAvailableTasks] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tasks from the JSON file
    const fetchTasks = () => {
      try {
        // Import the JSON data directly (already imported at the top)
        const data = tasksData as TasksData;
        setAvailableTasks(data.tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleGenerateRandomTask = () => {
    if (availableTasks.length > 0) {
      // Randomly select a task from the available tasks
      const randomIndex = Math.floor(Math.random() * availableTasks.length);
      const randomTask = availableTasks[randomIndex];

      // Set the random task in the input field
      setTaskText(randomTask);
    }
  };

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Click 'Generate' to get a random task..."
          onChangeText={(text) => setTaskText(text)}
          value={taskText}
          onSubmitEditing={handleAddTask}
        />
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button
            title="Generate Random Task"
            onPress={handleGenerateRandomTask}
            color="#007AFF"
          />
        </View>
        <View style={styles.button}>
          <Button title="Add Task" onPress={handleAddTask} color="#34C759" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  inputRow: {
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default ToDoForm;
