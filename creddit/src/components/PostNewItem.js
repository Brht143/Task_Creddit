import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { addPost } from "../api/posts";

function PostNewItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createMutation = useMutation({
    mutationKey: ["NewPost"],
    mutationFn: (postData) => addPost(postData),
  });

  return (
    <View key={"new-post"} style={styles.container}>
      <Text style={styles.text}>Create New Post</Text>;
      <View style={styles.formContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          key={"new-name"}
          style={styles.inputField}
          onChangeText={(title) => setTitle(title)}
        ></TextInput>
        <Text style={styles.text}>Post</Text>
        <TextInput
          key={"new-post"}
          style={styles.inputField}
          onChangeText={(description) => setDescription(description)}
        ></TextInput>
        <View style={styles.categories}>
          <TouchableOpacity
            onPress={() =>
              createMutation.mutate({
                title,
                description,
              })
            }
          >
            <Text style={styles.button}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlockStart: 50,
    flex: 1,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  post: {
    backgroundColor: "#A91D3A",
    borderRadius: 10,
    padding: 25,
    marginBlockEnd: 10,
  },
  comment: {
    backgroundColor: "#C73659",
    borderRadius: 10,
    padding: 15,
    marginBlockEnd: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "EEEEEE",
    // borderWidth: 2,
    // borderColor: "#C73659",
    height: 300,
    width: 300,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputField: {
    backgroundColor: "#C73659",
    color: "#EEEEEE",
    width: 296,
    borderRadius: 10,
  },
  user: {
    color: "#EEEEEE",
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#EEEEEE",
    padding: 20,
    borderRadius: 10,
    color: "#C73659",
  },
});
export default PostNewItem;
