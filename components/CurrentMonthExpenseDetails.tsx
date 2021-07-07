import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';


const CurrentMonthExpenseDetails = () => {

    const [data, setData] = useState([]);
    var URL = 'http://localhost:8080/get-total-expense-for-the-current-month-for-all-categories'

    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }, []);

    return (
        <View>
            <Text>Current Month Expense Details:</Text>

            <Text>Category Amount </Text>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                    <Text>{item.name} {item.amount}</Text>
                    )}
                />
        </View>
    );
};


export { CurrentMonthExpenseDetails }