import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { styles } from './Styles'


const CurrentBankBalance = () => {

    const [data, setData] = useState([]);
    var URL = 'http://localhost:8080/get-bank-balance'

    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }, []);

    return (
        <View>
            <Text style = {styles.titleName}>Current Bank Balance</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                    <Text style = {styles.details}>{item.balance}</Text>
                    )}
                />
        </View>
    );
};


export { CurrentBankBalance }