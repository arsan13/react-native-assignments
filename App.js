import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Comments from "./Comments";
import { DATA } from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: DATA,
      showCommentBox: false,
      commentItem: null,
    };
  }

  onLike = (id) => {
    let tempPosts = [...this.state.posts];
    for (let item of tempPosts) {
      if (item.id === id) {
        item.likes += 1;
        break;
      }
    }
    this.setState({ posts: tempPosts });
  };

  onShowComments = (item) => {
    this.setState({ showCommentBox: true, commentItem: item });
  };

  onHideComments = () => {
    this.setState({ showCommentBox: false, commentItem: null });
  };

  onAddComment = (comment) => {
    let tempPosts = [...this.state.posts];
    for (let item of tempPosts) {
      if (item.id === this.state.commentItem.id) {
        item.comments.push(comment);
        break;
      }
    }
    this.setState({ posts: tempPosts });
  };

  // Display images one by one
  renderItem = (data) => (
    <View style={styles.item}>
      {/* Display Image */}
      <Image style={styles.image} source={{ uri: data.item.image }} />

      {/* Likes and Coomment section */}
      <View style={styles.textContent}>
        {/* Display Like button icon and number of likes */}
        <View style={{ flexDirection: "row" }}>
          <EvilIcons
            size={25}
            name="heart"
            onPress={() => this.onLike(data.item.id)}
          />
          <Text style={styles.itemText}>{data.item.likes}</Text>
        </View>

        {/* A new component is mounted to display comment box */}
        <TouchableOpacity onPress={() => this.onShowComments(data.item)}>
          <Text style={styles.itemText}>
            {data.item.comments.length} Comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <>
        {this.state.showCommentBox === false ? (
          <View>
            <Text style={styles.heading}>Instagram Lite</Text>
            <FlatList
              data={this.state.posts}
              keyExtractor={(item) => item.id}
              renderItem={(item) => this.renderItem(item)}
            />
          </View>
        ) : (
          <Comments
            hideCommentBox={this.onHideComments}
            addComment={this.onAddComment}
            item={this.state.commentItem}
          />
        )}
      </>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
  },
  item: {
    marginVertical: 5,
  },
  textContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 15,
    padding: 5,
  },
});
