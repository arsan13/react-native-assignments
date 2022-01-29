import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  updateParentData = () => {
    this.props.updateData(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View>
        {/* Text input and a update button to update data throuh parent */}
        <TextInput
          style={styles.input}
          placeholder="Enter text to update parent data"
          onChangeText={(val) => this.setState({ text: val })}
          value={this.state.text}
        />
        <Button title="Update Parent Data" onPress={this.updateParentData} />

        {/* Data passed from parent through props */}
        <Text style={styles.text}>{this.props.data}</Text>
      </View>
    );
  }
}

export default Child;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    margin: 30,
    fontSize: 20,
  },
});
