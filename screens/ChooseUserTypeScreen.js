import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { JOBLI_FONT, PRIMARY_BTN, SECONDARY_BTN } from '../assets/theme';
import { isJobSeeker, updateUserType } from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChooseUserTypeScreen({ navigation }) {
    function navigateUserByType(userType) {
        updateUserType(userType).then(() => {
            if (userType === 'job_seeker') {
                navigation.replace('יצירת פרופיל מחפש עבודה');
            } else if (userType === 'employer') {
                navigation.navigate('יצירת פרופיל מעסיק');
            }
        });
    }

    React.useEffect(() => {
        // AsyncStorage.clear()
        if (isJobSeeker()) {
            navigation.replace('יצירת פרופיל מחפש עבודה');
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Image style={styles.imageStyle} resizeMode="contain" source={require('./../assets/images/JobliLogo.png')} />
            <View style={styles.contentContainer}>
                <Text style={[styles.textStyle, JOBLI_FONT]}>מה ברצונך לעשות?</Text>
                <Button
                    buttonStyle={[styles.choosetypeBtn, styles.seekingForWorkBtnStyle, PRIMARY_BTN.BTN_STYLE]}
                    title="לחפש עבודה"
                    titleStyle={PRIMARY_BTN.TITLE_STYLE}
                    onPress={() => {
                        const userType = 'job_seeker';
                        AsyncStorage.setItem('user_type', userType);
                        navigateUserByType(userType)
                    }}
                />
                {/* <Button
                    buttonStyle={[styles.choosetypeBtn, styles.seekingForEmployeesBtnStyle, SECONDARY_BTN.BTN_STYLE]}
                    title="לחפש עובדים"
                    titleStyle={SECONDARY_BTN.TITLE_STYLE}
                    onPress={() => {
                        const userType = 'employer';
                        AsyncStorage.setItem('user_type', userType);
                        navigateUserByType(userType)
                    }}
                /> */}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 162,
        height: 74,
        marginTop: 100
    },
    textStyle: {
        fontSize: 22,
        fontFamily: 'Rubik_400Regular',
        color: '#000000',
        marginBottom: 20,
    },
    choosetypeBtn: {
        margin: 15
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seekingForWorkBtnStyle: {
        width: 251,
    },
    seekingForEmployeesBtnStyle: {
        width: 165,
    }
})