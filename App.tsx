import React, { useEffect, useState, Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

class InputAddCategory extends Component {
   state = {
      categoryName: ''
   }

   handleCategory = (text) => {
      this.setState({ categoryName: text })
   }

   addCategory = (categoryName) => {

    var url = "http://localhost:8080/add-category"
    var data = {category_name : categoryName}

     fetch(url, {
       method: "POST",
       body: JSON.stringify(data),
       headers: new Headers({
         "Content-Type": "application/json"
       })
     }).then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(response => console.log("Success: ", response ));
    }

   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Category Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleCategory}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addCategory(this.state.categoryName)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}


class InputAddExpense extends Component {
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

   var url = "http://localhost:8080/add-expense"
   var data = {
    amount : amount,
    description : description,
    category_id :categoryId
  }

  fetch(url, {
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
    .then(response => {
      return response.json();
    }).then(data => {
      initialCategoryList = data.map((categories) => {
        return categories
      });
      this.setState({ categoryList: initialCategoryList });
    });
  }

  render() {
    let categories = this.state.categoryList;
    let optionItems = categories.map((category) =>
      <option key={category.category_id} value={category.key}>{category.category_name}</option>
      );

     return (
        <View style = {styles.container}>
          <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Amount"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              keyboardType='numeric'
              onChangeText = {this.handleAmount}/>

          <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Description"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleDescription}/>

          <select onChange={this.handleCategoryId}>
            {optionItems}
          </select>

           <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                 () => this.addExpense(this.state.amount, this.state.description, this.state.categoryId)
              }>
              <Text style = {styles.submitButtonText}> Submit </Text>
           </TouchableOpacity>
        </View>
     )
  }
}


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/get-total-expense-for-the-current-month')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/get-total-expense-for-the-current-month-for-all-categories')
      .then((response) => response.json())
      .then((json) => setDataTwo(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> :
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>Current Month Expense:</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text>{item.exp}</Text>
            )}
          />

          <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>Details:</Text>
          <Text>Category Amount </Text>
          <FlatList
            data={dataTwo}
            renderItem={({ item }) => (
              <Text>{item.name} {item.amount}</Text>
            )}
          />

        <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>Add a category</Text>

        <InputAddCategory />

        <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>Add an expense</Text>

        <InputAddExpense />

        </View>
      )}
    </View>
  );
};