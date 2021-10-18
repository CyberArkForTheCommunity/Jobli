import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {get} from '../services/api.service'
import {SEEKER_PROFILE_URL} from '../constants'


const styles = StyleSheet.create({
    container: {margin: 5, fontSize: 20, color: 'red'},
    header: {fontSize: 25},
    text: {fontSize: 16}
  });

export default function SummaryScreen({ navigation }) {
    const [userSummary, setUserSummary] = useState({})

    const getProfile = async() => {
        try{
            const res = await get('/api/seeker/profile');
            console.log(res);
            setUserSummary(res.data);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getProfile();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>סיכום</Text>
            <View>
                <Text style={styles.text}>{userSummary.full_name}</Text>
                <Text style={styles.text}>{userSummary.address}</Text>
                <Text style={styles.text}>{userSummary.email}</Text>
                <Text style={styles.header}>שפות</Text>
                {
                    userSummary.languages?.map(item => <Text style={styles.text} key={item}>{item}</Text>)
                }
            </View>
        </View>
    );
}
