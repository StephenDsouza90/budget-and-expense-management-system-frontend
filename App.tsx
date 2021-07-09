import React from 'react';
import { View } from 'react-native';

import { CurrentMonthExpense } from './components/CurrentMonthExpense'
import { CurrentMonthExpenseDetails } from './components/CurrentMonthExpenseDetails'
import { AddCategory } from './components/AddCategory'
import { AddExpense } from './components/AddExpense'


export default function App() {

  return (
    <View>
      <CurrentMonthExpense />

      <CurrentMonthExpenseDetails />

      <AddCategory />

      <AddExpense />

    </View>
  );
};