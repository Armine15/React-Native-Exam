import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import useAppStyle from "../../AppStyles";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker";

export const AjoutMateriel = ({ navigation }) => {
  const styles = useAppStyle(); // Assurez-vous d'importer useAppStyle depuis le bon emplacement

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const onAddPhoto = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraPermission.granted === false) {
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) { // Utilisez "cancelled" au lieu de "cancelled"
    const { assets } = result;
    if (assets && assets.length > 0) {
      setPhoto(assets[0].uri); // Accédez aux actifs via "assets"
    }
  }
};


  const onAddMaterial = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("photo", {
      uri: photo,
      type: "image/jpeg",
      name: "photo.jpg",
    });
  
    fetch("http://172.20.10.2:3000/add-material", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Traitez la réponse du serveur ici
        if (data.success) {
          // La création du matériel a réussi
          console.log("Material added successfully:", data.message);
          // Réinitialisez les champs du formulaire après l'ajout réussi
          setName("");
          setDescription("");
          setPhoto(null);
        } else {
          // La création du matériel a échoué
          console.error("Error adding material:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding material:", error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text>Ajout de matériel : {name}</Text>

      <Input
        placeholder="Nom du matériel"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <Input
        placeholder="Description du matériel"
        value={description}
        onChangeText={(value) => setDescription(value)}
      />

      <Button text="Ajouter une photo" onPress={() => onAddPhoto()} />

      <Button text="Ajouter le matériel" onPress={() => onAddMaterial()} />
    </View>
  );
};
