import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsList from "../components/PostsList";
import PostViewItem from "../components/PostViewItem";
import PostNewItem from "../components/PostNewItem";
import PostDeleteItem from "../components/PostDeleteItem";
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostsList" component={PostsList} />
      <Stack.Screen name="PostViewItem" component={PostViewItem} />
      <Stack.Screen name="PostNewItem" component={PostNewItem} />
      <Stack.Screen name="PostDeleteItem" component={PostDeleteItem} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
