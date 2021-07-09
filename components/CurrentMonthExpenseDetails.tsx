import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { styles } from './Styles'


const CurrentMonthExpenseDetails = () => {

    const [data, setData] = useState([]);
    var URL = 'http://localhost:8080/get-total-expense-for-the-current-month-for-all-categories'

    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }, []);

    const tableHead = ['Category', 'Amount']

    return (
        <View>
            <Text style = {styles.titleName}>Current Month Expense Details</Text>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                    <Text style = {styles.details}>{item.name} {item.amount}</Text>
                    )}
                />
        </View>
    );
};


export { CurrentMonthExpenseDetails }