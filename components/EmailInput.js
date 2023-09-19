import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";


const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);
  const [lastValidationTime, setLastValidationTime] = useState(0);
  const [foundEmail, setFoundEmail] = useState(null);

  useEffect(() => {
    if (showInvalidMessage) {
      const now = new Date().getTime();
      if (now - lastValidationTime >= 3000) {
        validateEmailExistence(email);
      }
    }
  }, [email, showInvalidMessage]);

  const handleEmailChange = (value) => {
    setEmail(value);
    setShowInvalidMessage(false);
    setIsValidFormat(validateEmailFormat(value)); // Reset format error when email changes
    setEmailExists(false); // Reset email exists error when email changes
    setFoundEmail(null);
  };

  const validateEmailFormat = (inputEmail) => {
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormatRegex.test(inputEmail);
  };

  const validateEmailExistence = (inputEmail) => {
    fetch(`http://172.20.10.2:3000/check-email?email=${inputEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.emailExists) {
          setEmailExists(true);
          setFoundEmail(inputEmail);
        }
        setLastValidationTime(new Date().getTime());
      })
      .catch((error) => {
        console.error("Error checking email existence:", error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        onBlur={() => setShowInvalidMessage(true)}
      />
     {!isValidFormat && (
        <Text>Invalid email format (xxxx@xxxx.xx)</Text>
      )}
    {showInvalidMessage && emailExists && (
    <Text>Email already exists : {foundEmail}</Text>
    )}
    </View>
  );
};

export default EmailInput;