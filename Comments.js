import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.item,
      text: "",
    };
  }

  onAddComment = () => {
    this.props.addComment(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View>
        {/* Go back icon - hide comments box */}
        <Ionicons
          size={30}
          name="arrow-back"
          onPress={this.props.hideCommentBox}
        />

        {/* Display the image in comments page */}
        <Image
          style={styles.image}
          source={{
            uri: this.state.post.image,
          }}
        />

        {/* Add a new comment */}
        <View style={styles.addComment}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Comment..."
            onChangeText={(val) => this.setState({ text: val })}
          />
          <Button title="Add" onPress={this.onAddComment} />
        </View>

        {/* Display all comments */}
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={this.state.post.comments}
          keyExtractor={(item, index) => index}
          renderItem={(item) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentText}>{item.item}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default Comments;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  addComment: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentItem: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    marginVertical: 5,
  },
  commentText: {
    fontSize: 15,
    padding: 10,
  },
  input: {
    width: "80%",
    fontSize: 15,
    padding: 5,
    borderBottomWidth: 1,
  },
});
