<script src="http://localhost:8097"></script>;
import * as WebBrowser from "expo-web-browser";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Touchable,
} from "react-native";
import { Text, View } from "./Themed";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addID } from "../store/modules/fruits/action";
import * as SecureStore from "expo-secure-store";

interface IDecode {
  exp: number;
  iat: number;
  isActive: boolean;
  isAdm: boolean;
  sub: string;
}

export const api = axios.create({
  baseURL: `http://${process.env.IPHOST}:3000/`,
  responseType: "json",
  withCredentials: true,
});

export default function LoginForm({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [id, setId] = useState(false);
  const dispatch = useDispatch();
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  const onSubmit = (data: any) => {
    const { name, ...newData } = data;
    api
      .post("login", newData)
      .then((res) => {
        const token = res.data.token;
        save("key_token", token);
        // let decoded: IDecode = jwt_decode(token);
        setId(false);
        dispatch(addID(false));
        if (token) {
          navigation.navigate("Home");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <View style={styles.getStartedContainer}>
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

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            {
              width: 300,
              height: 50,
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 8,
              alignItems: "center",
            },
          ]}
        >
          <Text style={[{ color: "white" }]}>Login</Text>
        </TouchableOpacity>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={handleHelpPress}
            style={styles.helpLink}
          ></TouchableOpacity>
        </View>
      </View>

      <Text style={styles.register}>Não Possue Conta?</Text>
      <View
        style={[
          {
            width: 300,
            height: 50,
            justifyContent: "center",
            backgroundColor: "black",
            borderRadius: 8,
            marginTop: 20,
          },
        ]}
      >
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
          title="Realizar cadastro"
          color="black"
        />
      </View>
    </>
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
  register: {
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
});
