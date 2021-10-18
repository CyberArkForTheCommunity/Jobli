import React, { onChange } from 'react';
import { View, Text, FlatList, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { get } from '../services/api.service';

export default function JobsListScreen({ navigation }) {

    const [data, updateData] = React.useState('');

//    async function getData(updateData) {
//            const res = await get('/api/employers', {});
//            console.log(res)
//            updateData(JSON.stringify(res));
//    }
//
    React.useEffect(() => {
        const mock = [
                             {
                                 job_id: 1,
                                 employer_id: 3,
                                 created_time: '1634471825136',
                                 job_description: 'תיאור המשרה ייכנס פה',
                                 job_scope: 'מלאה',
                                 job_name: 'שוטף כלים',
                                 job_fields: 'מסעדות',
                                 business_name: 'בית הקפה שלי',
                                 business_address: 'תל אביב',
                                 business_website: 'www.coffeeshop.co.il',
                                 employer_email: 'contact@coffeeshop.co.il',
                             },
                             {
                                 job_id: 2,
                                 employer_id: 3,
                                 created_time: '1634471936441',
                                 job_description: 'תיאור המשרה הנוספת ייכנס פה',
                                 job_scope: 'חלקית',
                                 job_name: 'טבח',
                                 job_fields: 'מסעדות',
                                 business_name: 'בית הקפה שלי',
                                 business_address: 'תל אביב',
                                 business_website: 'www.coffeeshop.co.il',
                                 employer_email: 'contact@coffeeshop.co.il',
                             }
                         ]
        updateData(mock);
    }, [])

     const renderJob = ({ item }) => (
         <View style={style.card}>
            <View style={style.cardRightSide}>
                <View style={style.cardRow}>
                    <Text style={style.businessName}>{item.business_name} </Text>
                    <Text style={style.businessAddress}>{item.business_address}</Text>
                </View>
                <View style={style.cardRow}>
                    <Text style={style.jobName}>{item.job_name}  </Text>
                    <Text>{item.job_fields}</Text>
                </View>
            <Text>{item.job_description}</Text>
            <TouchableHighlight style={style.applyButton} onPress={() => Linking.openURL('mailto:mailto@' + item.employer_email + '?subject=abcdefg&body=body')}>
                  <Text style={style.applyButtonText}>הגשת מועמדות</Text>
            </TouchableHighlight>
         </View>
         <View style={style.cardLeftSide}>
             <Text>{item.created_time}</Text>
             <Text>{item.job_scope}</Text>
             <Text>{item.business_website}</Text>
         </View>
         </View>
     )

    return (
        <View>
             <FlatList
                    data={data}
                    renderItem={renderJob}
                    keyExtractor={job => job.job_id.toString()}
              />
        </View>
    );
}

const style = StyleSheet.create({
    card: {
         borderColor: '#848787',
         borderWidth: 1,
         marginTop: 15,
         marginRight: 10,
         marginLeft: 10,
         padding: 5,
         borderRadius: 10,
         flex: 1,
         flexDirection: "row",
         textAlign: "right"
    },
    cardRightSide: {
        flex: 2,
        flexDirection: "column",
        textAlign: "left"
    },
    cardLeftSide: {
        flex: 1,
        flexDirection: "column"
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10
    },
    businessName: {
        fontSize: 12,
        fontWeight: "bold"
    },
    businessAddress: {
        fontSize: 10,
        marginRight: 10
    },
    jobName: {
        fontSize: 18
    },
    applyButton: {
        paddingVertical: 10
    },
    applyButtonText: {
        fontWeight: "bold",
        fontSize: 16
    }
});