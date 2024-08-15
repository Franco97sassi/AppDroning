import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const FollowingScreen = () => {
    const navigation = useNavigation();

  return (
    <View>
      <Text>FollowingScreen</Text>
    </View>
  )
}

export default FollowingScreen

const styles = StyleSheet.create({})