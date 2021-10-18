import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { get } from "../services/api.service";
import { SEEKER_SUMMARY } from "../constants";
import Theme from "./../theme";

const styles = StyleSheet.create({
  container: { margin: 5, fontSize: 20, color: "red" },
  header: { fontSize: 25 },
  text: { fontSize: 16, padding: 5 },
  subTitle: { fontSize: 16, backgroundColor: Theme.c2, padding: 5 },
});

// const mock = {
//   profile: {
//     id: "830ac377-9846-4c9a-96eb-7d2ea9560357",
//     full_name: "test user 1",
//     birth_date: 143769600000,
//     address: "Ramat Gan",
//     email: "testuser1@gmail.com",
//     languages: ["english", "hebrew", "russian", "france", "spanish"],
//     creationTime: "2021-10-17T09:11:12.229Z",
//     lastUpdateTime: "2021-10-17T09:11:12.229Z",
//     version: 0,
//   },
//   experience_list: [
//     {
//       workplace_name: "microsoft",
//       start_year: 1984,
//       end_year: 1985,
//       role: "Developer",
//       role_description: "Worked as a developer",
//     }
//   ],
// };

export default function SummaryScreen({ navigation }) {
  const [userSummary, setUserSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    console.log("getUserType");

    const res = await get("/api/seeker/summary").catch(console.log);
    if (res) {
      setUserSummary(res.data);
      //setUserSummary(mock);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const showUserExperienceList = () =>
    userSummary.experience_list &&
    userSummary.experience_list.length > 0 && (
      <FlatList
        data={userSummary.experience_list}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.subTitle} key={item}>
              {item.workplace_name}
            </Text>
            <Text style={styles.text}>
              {item.start_year} - {item.end_year || ""}
            </Text>
            <Text style={styles.text}>{item.role}</Text>
            <Text style={styles.text}>{item.role_description}</Text>
          </View>
        )}
      />
    );

  const showUserSummary = () => {
    if (userSummary) {
      return (
        <>
          <Text style={styles.text}>{userSummary.profile.full_name}</Text>
          {userSummary.profile.birth_date && <Text style={styles.text}>{new Date(userSummary.profile.birth_date).toLocaleString()}</Text>}
          <Text style={styles.text}>{userSummary.profile.address}</Text>
          <Text style={styles.text}>{userSummary.profile.email}</Text>
          {userSummary.profile.about_me && <Text style={styles.text}>{userSummary.profile.about_me}</Text>}

          <Text style={styles.header}>שפות</Text>
          <FlatList
            data={userSummary.profile.languages}
            renderItem={({ item }) => (
              <Text style={styles.text} key={item}>
                {item}
              </Text>
            )}
          />
          <Text style={styles.header}>נסיון</Text>
          {showUserExperienceList()}
        </>
      );
    }
    return <Text style={styles.text}>הייתה שגיאה, נסה שוב מאוחר יותר</Text>;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>פרופיל אישי</Text>
        <View>{loading ? <Text style={styles.text}>טוען...</Text> : showUserSummary()}</View>
      </View>
    </ScrollView>
  );
}
