
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';


class AddCategory extends Component {
    state = {
       categoryName: ''
    }

    handleCategory = (text) => {
       this.setState({ categoryName: text })
    }

    addCategory = (categoryName) => {
        var URL = "http://localhost:8080/add-category"
        var data = {category_name : categoryName}

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .catch(error => console.error("Error: ", error))
        .then(response => console.log("Success: ", response ));
    }

    render() {

        return (
            <View>
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Category Name"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleCategory}
                />

                <TouchableOpacity onPress = { () => this.addCategory(this.state.categoryName) }>

                    <Text> Submit </Text>

                </TouchableOpacity>
            </View>
        )
    }
}


export { AddCategory }