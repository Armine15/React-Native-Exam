import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

const PasswordInput = ({
  minLength = 6,
  maxLength = 20,
  minNumbers = 1,
  minSpecialChars = 1,
}) => {
  const [password, setPassword] = useState('');
  const [validations, setValidations] = useState({
    length: false,
    numbers: false,
    specialChars: false,
  });

  const validatePassword = (inputPassword) => {
    const hasValidLength = inputPassword.length >= minLength && inputPassword.length <= maxLength;
    const hasRequiredNumbers = (inputPassword.match(/[0-9]/g) || []).length >= minNumbers;
    const hasRequiredSpecialChars = (inputPassword.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/g) || []).length >= minSpecialChars;

    setValidations({
      length: hasValidLength,
      numbers: hasRequiredNumbers,
      specialChars: hasRequiredSpecialChars,
    });
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    validatePassword(input);
  };

  return (
    <View>
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
      />
      <Text>Minimum length: {validations.length ? 'Valid' : 'Invalid'}</Text>
      <Text>Minimum {minNumbers} numbers: {validations.numbers ? 'Valid' : 'Invalid'}</Text>
      <Text>Minimum {minSpecialChars} special characters: {validations.specialChars ? 'Valid' : 'Invalid'}</Text>
    </View>
  );
};

export default PasswordInput;
