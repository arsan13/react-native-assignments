import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { TouchableOpacity } from "react-native-web";

const MY_URL =
  "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=PsGLJ2p6xAJvZvNUeEy9tPQ2PbesnRsj";

class App extends Component {
  state = {
    articles: [],
  };

  //Using Async/await + Axios
  fetchData = async () => {
    try {
      const response = await axios.get(MY_URL);
      this.setState({ articles: response.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  // Using built-in Fetch API
  // fetchData = () => {
  //   fetch(MY_URL)
  //     .then((response) => response.json())
  //     .then((item) => this.setState({ articles: item.results }));
  // };

  componentDidMount() {
    this.fetchData();
  }

  // Invoked when "Mark as read" is clicked.
  onReadClick = (index) => {
    const tempArticles = [...this.state.articles];
    tempArticles[index].hasRead = true;
    this.setState({ articles: tempArticles });
  };

  renderItem = (data) => (
    <View style={styles.card}>
      <View style={{ padding: 10 }}>
        <Text style={styles.cardHeader}>{data.item.title}</Text>

        {/* Hide content when user clicks "Mark as read" button */}
        {!data.item.hasRead && (
          <Text style={styles.cardBody}>{data.item.abstract}</Text>
        )}
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterColor}>{data.item.published_date}</Text>

          {/* Display "Marks as read" button if article is not read, else display "has read" icon */}
          {!data.item.hasRead ? (
            <TouchableOpacity onPress={() => this.onReadClick(data.index)}>
              <Text style={styles.cardFooterColor}>Mark as read</Text>
            </TouchableOpacity>
          ) : (
            <Icon name="read" size={16} style={styles.cardFooterColor} />
          )}
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={{ backgroundColor: "#D3D3D3" }}>
        <View style={{ marginBottom: 5, backgroundColor: "#36454F" }}>
          <Text style={styles.heading}>NY Times Lite</Text>
        </View>
        <FlatList
          data={this.state.articles}
          keyExtractor={(item) => item.id}
          renderItem={(data) => this.renderItem(data)}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "justify",
  },
  cardBody: {
    marginTop: 5,
    fontSize: 15,
    textAlign: "justify",
  },
  cardFooter: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#A9A9A9",
  },
  cardFooterColor: {
    paddingTop: 5,
    color: "#36454F",
  },
});
