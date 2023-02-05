import * as WebBrowser from "expo-web-browser";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { useForm, Controller } from "react-hook-form";
import { api } from "./LoginForm";

export default function FormInput() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      cellphone: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    const { registerTime, ...newData } = data;
    console.log(newData);
    api
      .post("users", newData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.getStartedContainer}>
      <Text>Nome</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}
      <Text>Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.name && <Text>This is required.</Text>}
      <Text>Senha</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.name && <Text>This is required.</Text>}
      <Text>Telefone</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="cellphone"
      />
      {errors.name && <Text>This is required.</Text>}

      <View
        style={[
          {
            width: 300,
            height: 50,
            justifyContent: "center",
            backgroundColor: "black",
          },
        ]}
      >
        <Button
          onPress={handleSubmit(onSubmit)}
          title="Cadastrar"
          color="black"
        />
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity
          onPress={handleHelpPress}
          style={styles.helpLink}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "flex-start",
    marginHorizontal: 50,
    display: "flex",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.7)",
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
});
