import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";

export default function index() {
  return <Redirect href={"/(usertabs)"} />;
}
