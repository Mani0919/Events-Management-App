import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
          title:"Explore Local Events Today!"
        }}/>
        <Stack.Screen name="maps"/>
        {/* <Stack.Screen name="locationsearch"/> */}
    </Stack>
  )
}