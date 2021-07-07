import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';


class AddExpense extends Component {
    state = {
       amount: 0,
       description: '',
       categoryId: 0,
       categoryList: []
    }

    handleAmount = (number) => {
        this.setState({ amount: number })
    }

    handleDescription = (text) => {
        this.setState({ description: text })
    }

    handleCategoryId = (number) => {
        var value = this.state.categoryList.filter(function(item) {
        return item.category_name == number.target.value
    })

    this.setState({ categoryId: value[0].category_id })

    }

    addExpense = (amount, description, categoryId) => {

        var URL = "http://localhost:8080/add-expense"
        var data = {
            amount : amount,
            description : description,
            category_id :categoryId
        }

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({"Content-Type": "application/json"})
        })
        .then(res => res.json())
        .catch(error => console.error("Error: ", error))
        .then(response => console.log("Success: ", response ));
    }

    componentDidMount() {
        let initialCategoryList = [];

        fetch('http://localhost:8080/get-categories')
        .then(response => { return response.json(); })
        .then(data => { initialCategoryList = data.map((categories) => { return categories });

        this.setState({ categoryList: initialCategoryList });

        });
    }

    render() {
        let categories = this.state.categoryList;
        let optionItems = categories.map((category) =>
            <option key={category.category_id} value={category.key}>{category.category_name}</option>
        );

        return (
            <View>
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Amount"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    keyboardType='numeric'
                    onChangeText = {this.handleAmount}
                />

                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Description"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleDescription}
                />

                <select onChange={this.handleCategoryId}>
                    {optionItems}
                </select>

                <TouchableOpacity
                    onPress = {
                        () => this.addExpense(this.state.amount, this.state.description, this.state.categoryId)
                        }>

                    <Text> Submit </Text>

                </TouchableOpacity>
            </View>
        )
    }
}


export { AddExpense }