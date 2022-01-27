import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      text: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  updateParentData = () => {
    this.props.updateData(this.state.text);
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter text to update parent data"
          onChangeText={(val) => this.setState({ text: val })}
          value={this.state.text}
        />
        <Button title="Update Parent Data" onPress={this.updateParentData} />
        <Text style={styles.text}>{this.state.data}</Text>
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
