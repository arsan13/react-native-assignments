import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-web";
import { DATA } from "./DATA";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tasks: DATA,
    };
  }

  onAdd = () => {
    const task = { id: Date.now(), text: this.state.text, isCompleted: false };
    this.setState((state) => ({ tasks: [...state.tasks, task], text: "" }));
  };

  onCompletion = (id) => {
    const updatedTasks = [];
    for (let item of this.state.tasks) {
      if (item.id !== id) updatedTasks.push(item);
      else updatedTasks.push({ ...item, isCompleted: true });
    }
    this.setState({ tasks: updatedTasks });
  };

  renderItem = (data) => (
    <View style={styles.item}>
      <Text style={[styles.itemText, data.item.isCompleted && styles.overline]}>
        {data.item.text}
      </Text>
      <Button
        title="Done"
        onPress={() => this.onCompletion(data.item.id)}
        disabled={data.item.isCompleted ? true : false}
      />
    </View>
  );

  render() {
    return (
      <View>
        <Text style={styles.heading}>Simple Todo App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text for todo"
          onChangeText={(val) => this.setState({ text: val })}
          value={this.state.text}
        />
        <Button title="Add" onPress={this.onAdd} />
        <FlatList
          style={{ padding: 10 }}
          data={this.state.tasks}
          keyExtractor={(item) => item.id}
          renderItem={(item) => this.renderItem(item)}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 20,
    padding: 5,
  },
  overline: {
    textDecorationLine: "line-through",
  },
});
