import * as React from 'react';
import { Text, View, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { Icon, Button } from 'react-native-elements';
import * as yup from 'yup';
import Theme from '../theme';
import { put, get } from '../services/api.service';
import useAxios from '../hooks/axios.hook';

const validationSchema = yup.object().shape({
  about_me: yup.string(),
  job_ambitions: yup.string(),
  hobbies: yup.string(),
});

const FormAboutMe = ({ handleChange, handleBlur, values }) => {
  return (
    <View>
      <View>
        <Text style={styles.textTitle}>המשפט יופיע בדף הפורפיל שלך</Text>
        <TextInput
          style={styles.input}
          editable
          maxLength={300}
          multiline
          numberOfLines={4}
          placeholder="אני אוהב לקרוא ספרים..."
          onChangeText={handleChange("about_me")}
          onBlur={handleBlur("about_me")}
          value={values.about_me}
          label="המשפט יופיע בדף הפורפיל שלך"
        />
      </View>

      <View>
        <Text style={styles.textTitle}>כאן כדאי לרשום מה אני מחפש במקום העבודה</Text>
        <TextInput
          style={styles.input}
          editable
          maxLength={300}
          multiline
          numberOfLines={4}
          placeholder="אני רוצה לעבוד בעבודה משרדית, בסביבה שקטה עם צוות קטן"
          onChangeText={handleChange("job_ambitions")}
          onBlur={handleBlur("job_ambitions")}
          value={values.job_ambitions}
          label="כאן כדאי לרשום מה אני מחפש במקום העבודה"
        />
      </View>

      <View>
        <Text style={styles.textTitle}>כאן זה המקום לספר על התחביבים שלך</Text>
        <Text style={styles.textTitle}>כדי שהמעסיק יוכל להכיר אותך מעט טוב יותר</Text>
        <TextInput
          style={styles.input}
          editable
          maxLength={300}
          multiline
          numberOfLines={4}
          placeholder="רשום פה תחביבים"
          onChangeText={handleChange("hobbies")}
          onBlur={handleBlur("hobbies")}
          value={values.hobbies}
          label="כאן זה המקום לספר על התחביבים שלך"
        />
      </View>
    </View>
  );
};

export default function AboutMeProfileScreen({ navigation }) {
  const [submitLoading, setLoader] = React.useState(false);

  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/api/seeker/profile',
  });

  React.useEffect(() => {
    if (response && (response.about_me || response.job_ambitions || response.hobbies)) {
        navigation.replace('AddLanguage');
    }
}, [response])

  function submit(values) {
    setLoader(true);
    get("/api/seeker/profile", values).then(async ({ data }) => {
      const results = {
        full_name: data.full_name,
        birth_year: new Date(data.birth_date).getFullYear(),
        birth_month: new Date(data.birth_date).getMonth() + 1,
        birth_day: new Date(data.birth_date).getDate(),
        address: data.address,
        email: data.email,
      };

      put('/api/seeker/profile', {...values, ...results}).then(async res => {
        setLoader(false);
        navigation.replace('AddLanguage')
      }).catch(error => console.log('>>>', error))
    })
  }

  const initialValues = {
    about_me: "",
    job_ambitions: "",
    hobbies: "",
  };

  if (submitLoading || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values) => submit(values)}>
      {(formikHelpers) => (
        <>
          <View style={styles.container} accessible={true}>
            <Text style={styles.textLabel}>קצת עלי</Text>
            <Text style={styles.textSubLabel}>כאן זה המקום לספר על עצמך</Text>
            <View>
              <FormAboutMe {...formikHelpers} />
            </View>
            <View>
              <Button
                onPress={formikHelpers.handleSubmit}
                accessibilityLabel="המשך לשלב הבא"
                buttonStyle={{ backgroundColor: Theme.c3, borderRadius: 64, width: 64, height: 64 }}
                icon={<Icon name="arrow-back" size={30} color={Theme.white} />}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textLabel}>קצת עלי</Text>
        <Text style={styles.textSubLabel}>כאן זה המקום לספר על עצמך</Text>
      </View>

      <View>
        <Text style={styles.textTitle}>המשפט יופיע בדף הפורפיל שלך</Text>
        <TextInput style={styles.input} editable maxLength={300} multiline numberOfLines={4} placeholder="אני אוהב לקרוא ספרים..." />
      </View>

      <View>
        <Text style={styles.textTitle}>כאן כדאי לרשום מה אני מחפש במקום העבודה</Text>
        <TextInput style={styles.input} editable maxLength={300} multiline numberOfLines={4} placeholder="אני רוצה לעבוד בעבודה משרדית, בסביבה שקטה עם צוות קטן" />
      </View>

      <View>
        <Text style={styles.textTitle}>כאן זה המקום לספר על התחביבים שלך</Text>
        <Text style={styles.textTitle}>כדי שהמעסיק יוכל להכיר אותך מעט טוב יותר</Text>
        <TextInput style={styles.input} editable maxLength={300} multiline numberOfLines={4} placeholder="רשום פה תחביבים" />
      </View>
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          color="white"
          size={28}
          onPress={() => {
            alert(JSON.stringify(selectedItems));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  textLabel: {
    fontSize: 22,
    color: "#2E2E2E",
    marginBottom: 3,
  },
  textSubLabel: {
    fontSize: 18,
    color: "#2E2E2E",
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 16,
    color: "#2E2E2E",
  },
  input: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d6ccdb",
  },
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#28527A",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});
