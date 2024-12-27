import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addComment, deleteComment, getPostById } from "../api/posts";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
function PostViewItem({ route }) {
  const { id, title, description } = route.params.post;
  // console.log("id ", id);
  // const post = data;
  // console.log(post);

  const [comment, setComment] = useState("");

  const { data, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ["PostById"],
    queryFn: () => getPostById(id),
    enabled: true,
  });

  const addCommentMutation = useMutation({
    mutationKey: ["AddedComment"],
    mutationFn: (commentData) => addComment(commentData),
    onSuccess: () => {
      refetch();
      alert("Comment Added !");
    },
    onError: () => alert("Failed to add the Comment !"),
  });

  const deleteCommentMutation = useMutation({
    mutationKey: ["DeletedComment"],
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      refetch();
      alert("Comment deleted !");
    },
    onError: () => alert("Failed to delete the Comment !"),
  });

  let comments = data?.comments.map((comment, index) => (
    <View key={`${id}-comment-${index}`} style={styles.comment}>
      <Text style={styles.text}>
        {comment.username}: {comment.comment}
      </Text>
      <TouchableOpacity
        onPress={() => deleteCommentMutation.mutate(comment.id)}
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  ));
  // if (comments.length)
  //   comments = (
  //     <View key={`${id}-comment-none`} style={styles.comment}>
  //       <Text style={styles.text}>No Comments</Text>
  //     </View>
  //   );

  //   console.log(comments.length);

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.text}> title: {title}</Text>
        <Text style={styles.text}>description: {description}</Text>
      </View>
      <View style={styles.newComment}>
        <TextInput
          style={styles.inputField}
          onChangeText={(newComment) => setComment(newComment)}
        ></TextInput>
        <TouchableOpacity
          onPress={() =>
            addCommentMutation.mutate({
              username: "brht143",
              comment,
              postId: id,
            })
          }
        >
          <Ionicons name="add-circle" size={40} color="#C73659" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {comments}
        <View style={styles.comment}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlockStart: 10,
    flex: 1,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  newComment: {
    paddingInlineStart: 35,
    width: "100%",
    marginBlock: 30,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  post: {
    width: "85%",
    backgroundColor: "#A91D3A",
    borderRadius: 10,
    padding: 25,
    marginBlockEnd: 10,
  },
  comment: {
    width: "83%",
    backgroundColor: "#C73659",
    borderRadius: 5,
    padding: 25,
    marginBlockEnd: 10,
  },
  inputField: {
    backgroundColor: "#EEEEEE",
    color: "#C73659",
    width: 280,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
  user: {
    color: "#EEEEEE",
    fontWeight: "800",
  },
});
export default PostViewItem;
