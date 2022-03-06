import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import editIcon from "../assets/icons/edit/edit.png";
import trashIcon from "../assets/icons/trash/trash.png";
import cancelIcon from "../assets/icons/cancel/cancel.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditValue(task.title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editValue);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.checkButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.markerDone : styles.marker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isBeingEdited ? (
            <TextInput
              ref={textInputRef}
              style={[
                task.done ? styles.textDone : styles.text,
                { paddingVertical: Platform.OS === "ios" ? 5 : 0 },
              ]}
              value={editValue}
              editable={isBeingEdited}
              onChangeText={setEditValue}
              onSubmitEditing={handleSubmitEditing}
            />
          ) : (
            <Text style={task.done ? styles.textDone : styles.text}>
              {task.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup}>
        {isBeingEdited ? (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={styles.editButton}
            onPress={handleCancelEditing}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={styles.editButton}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID={`trash-${index}`}
          style={styles.removeButton}
          onPress={() => removeTask(task.id)}
          disabled={isBeingEdited}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  marker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  markerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonGroup: { paddingLeft: "auto", flexDirection: "row" },
  editButton: {
    paddingHorizontal: 12,
    borderRightColor: "#E2E2E2",
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    paddingHorizontal: 12,
  },
});
