import React from "react";
import { Text, View } from "react-native";
import useAppStyle from "../../AppStyles";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";

export const Inscription = () => {
  const styles = useAppStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page d'inscription</Text>
      <EmailInput/>
      <PasswordInput
        minLength={8} 
        minNumbers={2} 
        minSpecialChars={2} 
      />
    </View>
  );
};
