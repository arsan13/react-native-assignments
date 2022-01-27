import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Child from "./Child";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Data of parent used by child",
    };
  }

  updateData = (childText) => {
    this.setState({ text: childText });
  };

  render() {
    return (
      <View>
        <Text style={styles.heading}>Parent - Child</Text>
        <Child data={this.state.text} updateData={this.updateData} />
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
});
