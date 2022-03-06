import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (tasks.find((task) => task.title === newTask.title)) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.title = newTitle;
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
