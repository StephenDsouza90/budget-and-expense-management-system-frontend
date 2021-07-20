
import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { styles } from './Styles'


class AddBankDeposit extends Component {
    state = {
       description: '',
       deposit: 0
    }

    handleDescription = (text) => {
       this.setState({ description: text })
    }

    handleDeposit = (number) => {
        this.setState({ deposit: number })
    }

    addCategory = (description, deposit) => {
        var URL = "http://localhost:8080/add-deposit"
        var data = {description : description, deposit: deposit}

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
                <Text style = {styles.titleName}>Add a deposit to your bank</Text>

                <TextInput
                    style = {styles.input}
                    autoCapitalize = "none"
                    placeholder = "Description"
                    onChangeText = {this.handleDescription}
                />

                <TextInput
                    style = {styles.input}
                    placeholder = "Amount"
                    autoCapitalize = "none"
                    keyboardType='numeric'
                    onChangeText = {this.handleDeposit}
                />

                <Button title="Submit" onPress = { () => this.addCategory(this.state.description, this.state.deposit) }/>

            </View>
        )
    }
}


export { AddBankDeposit }