import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Hub } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { isAuthenticated, storeUserDetails, googleSignIn } from '../services/auth.service';
import { get } from '../services/api.service';

export default function LoginScreen({ navigation }) {
    const [state, setState] = useState({
        authLoading: false,
        apiCheckLoading: false
    });
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
            setState({
                ...state,
                authLoading: true
            });
            if (isAuth) {
                get('/api/seeker/profile').then(() => {
                    navigation.navigate('ChooseUserTypeScreen');
                }).catch((err) => {
                    setState({
                        apiCheckLoading: true,
                        authLoading: true
                    });
                })
            } else {
                setState({
                    apiCheckLoading: true,
                    authLoading: true
                });
            }
        });
    }, []);

    if (!state.authLoading || !state.authLoading) {
        return (
            <View style={{
                flex: 1, justifyContent: "center"
            }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="התחברות עם גוגל"
                onPress={() => googleSignIn()}
            />
        </View>
    );
}
