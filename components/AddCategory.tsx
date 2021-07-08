
import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { styles } from './Styles'


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
                <Text style = {styles.titleName}>Add Category</Text>

                <TextInput
                    style = {styles.input}
                    autoCapitalize = "none"
                    placeholder = "Category Name"
                    onChangeText = {this.handleCategory}
                />

                <Button title="Submit" onPress = { () => this.addCategory(this.state.categoryName) }/>

            </View>
        )
    }
}


export { AddCategory }