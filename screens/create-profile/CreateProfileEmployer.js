import * as React from 'react';
import { View, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Theme from '../../theme';
import { post } from '../../services/api.service';
import InputText from '../../components/input-text';
import UploadProfileImage from './UploadProfileImage';
import { Icon, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

// const validationSchema = yup.object().shape({
//     employer_email: yup
//         .string()
//         .email("דואר אלקטרוני לא תקין")
//         .required('דואר אלקטרוני הוא שדה חובה'),
//     business_name: yup
//         .string()
//         .required('חובה להזין שם מלא'),
//     business_address: yup
//         .string(),
//     full_address: yup
//         .number()
//         .test('len', 'שנה לא תקינה', val => Number(val) > 1970 && Number(val) < new Date().getFullYear())
//         .required('חובה להזין שנת לידה'),
//     business_website: yup
//         .number()
//         .test('len', 'חודש לא תקין', val => Number(val) > 0 && Number(val) < 13)
//         .required('חובה להזין חודש לידה'),
//     description: yup
//         .string()
//         .test('len', 'יום לא תקין', val => Number(val) > 0 && Number(val) < 32)
//         .required('חובה להזין יום לידה'),
// })

const FormProfile = ({ handleChange, handleBlur, values }) => {
    return (
        <View>
            <InputText
                onChangeText={handleChange('business_name')}
                onBlur={handleBlur('business_name')}
                value={values.business_name}
                label="שם העסק"
            />
            <InputText
                onChangeText={handleChange('business_address.full_address')}
                onBlur={handleBlur('business_address.full_address')}
                value={values.business_address.full_address}
                label="כתובת העסק"
            />
            <InputText
                onChangeText={handleChange('business_website')}
                onBlur={handleBlur('business_website')}
                value={values.business_website}
                label="קישור לאתר העסק"
            />
            <InputText
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                label="תיאור העסק"
                placeholder="כאן כדאי לרשום תיאור קצר של בית העסק"
            />
        </View>
    );
};

export default function CreateProfileEmployer({ navigation }) {
    const [loading, setLoader] = React.useState(false);

    function nextPage() {
        navigation.replace('משרות לפרסום');
        setLoader(false);
    }

    function submit(values) {
        setLoader(true);
        post('/api/employers', values).then(async res => {
            await AsyncStorage.setItem(
                'employer_id',
                res.employer_id
            );
            setLoader(false);
            nextPage();
        }).catch(e => {
            Alert.alert('', 'משהו קרה, נסה שנית!');
            setLoader(false);
        });
    }

    React.useEffect(() => {
        AsyncStorage.getItem('employer_id').then(employerId => {
            if (employerId) {
                nextPage();
            }
        })
    }, []);

    const initialValues = {
        employer_email: '',
        business_name: '',
        business_address: { full_address: '' },
        business_website: '',
        description: ''
    }

    if (loading) {
        return (
            <View style={{
                flex: 1, justifyContent: "center"
            }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Formik
            // validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={values => submit(values)}
        >
            {(formikHelpers) => (
                <View accessible={true} style={styles.wrapper}>
                    {/* <View style={styles.uploadProfileImageWrapper}>
                <UploadProfileImage />
            </View> */}
                    <View style={styles.formWrapper}>
                        <FormProfile {...formikHelpers} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button
                            onPress={() => {
                                const { isValid, errors } = formikHelpers;
                                if (!isValid) {
                                    const firstErrorKey = Object.keys(errors)[0];
                                    Alert.alert('', errors[firstErrorKey]);
                                } else {
                                    formikHelpers.handleSubmit();
                                }
                            }}
                            accessibilityLabel="המשך לשלב הבא"
                            buttonStyle={{ backgroundColor: Theme.c3, borderRadius: 64, width: 64, height: 64 }}
                            icon={
                                <Icon
                                    name="arrow-back"
                                    size={30}
                                    color={Theme.white}
                                />
                            }
                        />

                    </View>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.white,
        alignItems: 'stretch'
    },
    formWrapper: {
        flex: 4,
        paddingTop: 30
    },
    buttonWrapper: {
        flex: 1,
        paddingBottom: 30,
    },
    uploadProfileImageWrapper: {
        height: 126,
        padding: 28,
        flex: 1,
    },
    birthday: {
        flexDirection: 'row',
        padding: 10,
        width: screenWidth
    },
    birthdayText: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.textColor,
        paddingRight: 16
    },
    titlePopup: {
        textAlign: 'right',
        fontSize: 22,
        color: Theme.textColor,
        paddingBottom: 20,

    },
    textPopup: {
        textAlign: 'right',
        fontSize: 16,
        color: Theme.textColor,
        paddingBottom: 20,
    },
});

export const CreateProfileEmployerScreenName = 'יצירת פרופיל מעסיק';
export const CreateProfileEmployerScreenOptions = {
    title: 'יצירת פרופיל',
    headerStyle: {
        backgroundColor: Theme.c1,
    },
    headerTintColor: Theme.textColor
}