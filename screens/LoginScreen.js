import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Hub } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { isAuthenticated, storeUserDetails, googleSignIn } from '../services/auth.service';

export default function LoginScreen({ navigation }) {
    useEffect(() => {
        Hub.listen('auth', async ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    await storeUserDetails();
                    navigation.navigate('ChooseUserTypeScreen');
                    break;
                case 'signOut':
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        isAuthenticated().then((isAuth) => {
            if (isAuth)
                navigation.navigate('ChooseUserTypeScreen');
        });
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="התחברות עם גוגל"
                onPress={() => googleSignIn()
                }
            />
        </View>
    );
}
