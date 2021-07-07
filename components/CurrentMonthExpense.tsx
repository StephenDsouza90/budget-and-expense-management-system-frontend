import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';


const CurrentMonthExpense = () => {

    const [data, setData] = useState([]);
    var URL = 'http://localhost:8080/get-total-expense-for-the-current-month'

    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }, []);

    return (
        <View>
            <Text>Current Month Expense:</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                    <Text>{item.total_expense}</Text>
                    )}
                />
        </View>
    );
};


export { CurrentMonthExpense }