import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api/posts";

function PostViewItem({ route }) {
  const { id, title, description } = route.params.post;
  console.log("id ", id);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["PostById"],
    queryFn: () => getPostById(id),
    enabled: true,
  });

  const post = data;
  console.log(post);

  let comments = data?.comments.map((comment, index) => (
    <View key={`${id}-comment-${index}`} style={styles.comment}>
      <Text style={styles.text}>
        {comment.username}: {comment.comment}
      </Text>
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
      <ScrollView>
        {comments}
        <View style={styles.comment}></View>
      </ScrollView>
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
  },
  user: {
    color: "#EEEEEE",
    fontWeight: "800",
  },
});
export default PostViewItem;
