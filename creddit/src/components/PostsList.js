import { StatusBar } from "react-native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/posts";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function PostsList(props) {
  const { data, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
    enabled: true,
  });

  const handleViewPost = (post) =>
    navigation.navigate("PostViewItem", { post });
  const handleDeletePost = (post) =>
    navigation.navigate("PostDeleteItem", { post });

  const posts = data?.map((post, index) => (
    <View key={`post-${index}`} style={styles.post}>
      <TouchableOpacity onPress={() => handleViewPost(post)}>
        <Text style={styles.text}>{post.title}</Text>
        <Text style={styles.text}>{post.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeletePost(post)}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  ));
  //   console.log(result);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.newPost}
          onPress={() => navigation.navigate("PostNewItem")}
        >
          <Ionicons name="create" size={30} color="#C73659" />
          <Text style={styles.text}>Create New Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newPost} onPress={() => refetch()}>
          <FontAwesome name="refresh" size={24} color="#C73659" />
          <Text style={styles.text}>Refresh</Text>
        </TouchableOpacity>
        <View key={"postsList"} style={styles.categoryBox}>
          {posts}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },
  newPost: {
    marginBlock: 30,
    flexDirection: "row",
    gap: 25,
    alignItems: "center",
  },
  post: {
    backgroundColor: "#A91D3A",
    borderRadius: 10,
    padding: 25,
    marginBlock: 10,
    width: 280,
    gap: 30,
  },
  text: {
    color: "#fff",
  },
});
export default PostsList;
