import { useMutation } from "@tanstack/react-query";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { deletePost } from "../api/posts";
import { useNavigation } from "@react-navigation/native";

function PostDeleteItem({ route }) {
  const { title, id } = route.params.post;
  const navigation = useNavigation();
  console.log(route.params.post);

  const deleteMutation = useMutation({
    mutationKey: ["DeletedPost"],
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      navigation.navigate("PostsList");
      alert("Post deleted !");
    },
    onError: () => alert("Failed to delete the post !"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.inputField}>
        Are you sure to delete post with {title} ?
      </Text>
      <View style={styles.confirm}>
        <TouchableOpacity>
          <Text style={styles.option} onPress={() => deleteMutation.mutate(id)}>
            YES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.option}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputField: {
    marginBlock: 40,
    paddingBlock: 40,
    paddingInlineStart: 10,
    backgroundColor: "#C73659",
    borderRadius: 10,
    width: 296,
    fontWeight: "800",

    color: "#EEEEEE",
  },
  confirm: {
    flexDirection: "row",
    gap: 25,
  },
  option: {
    backgroundColor: "#A91D3A",
    borderRadius: 10,
    padding: 25,
    marginBlockEnd: 10,
    color: "#fff",
    fontWeight: "800",
  },
});

export default PostDeleteItem;
