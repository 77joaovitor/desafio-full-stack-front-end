import { useEffect, useState } from "react";
import { StyleSheet, Button, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import { api } from "../components/LoginForm";
import { Text, View } from "../components/Themed";
import * as SecureStore from "expo-secure-store";

interface IUser {
  createdAt: string;
  email: string;
  id: string;
  isActive: boolean;
  isAdm: boolean;
  name: string;
  password: string;
  updatedAt: string;
}

interface IContact {
  id: string;
  name: string;
  cellphone: string;
  userid: IUser;
  email: string;
}

export default function HomePageScreen({ navigation }: any) {
  const [contact, setContact] = useState<IContact[] | never[]>([]);

  async function deleteContact(key: string, id: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      const config = {
        headers: { Authorization: `Bearer ${result}` },
      };
      api
        .delete(`contact/${id}`, config)
        .then((res) => {
          const newCoontact = contact.filter((elem) => elem.id !== id);
          console.log(id);
          console.log(res);
          // if (res.status === 200) {
          Alert.alert("contato excluido");
          // }
          setContact(newCoontact);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    async function getValueFor(key: string) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        const config = {
          headers: { Authorization: `Bearer ${result}` },
        };
        api
          .get("contact", config)
          .then((res) => {
            setContact(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
    getValueFor("key_token");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos</Text>
      <View
        style={[
          {
            width: 100,
            height: 35,
            backgroundColor: "black",
            borderRadius: 10,
            position: "absolute",
            right: 10,
            top: 30,
          },
        ]}
      >
        <Button
          onPress={() => {
            navigation.navigate("RegisterContact");
          }}
          title="Adicionar"
          color="black"
        />
      </View>
      <ScrollView style={{ width: "100%" }}>
        {contact?.map((elem) => (
          <View key={elem.id} style={styles.containerContact}>
            <View style={styles.containerText}>
              <Text>{elem.name}</Text>
              <Text>{elem.cellphone}</Text>
              <Text>{elem.email}</Text>
            </View>
            <View
              style={[
                {
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  backgroundColor: "black",
                  borderRadius: 8,
                },
              ]}
            >
              <Button
                onPress={() => deleteContact("key_token", elem.id)}
                title="Excluir"
                color="black"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
    // display: "flex",
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  containerContact: {
    width: "95%",
    height: 100,
    flexDirection: "row",
    backgroundColor: "rgba(200,200,200,0.5)",
    borderRadius: 8,
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    marginBottom: 20,
  },
  containerText: {
    backgroundColor: "rgba(200,200,200,0.5)",
  },
});
