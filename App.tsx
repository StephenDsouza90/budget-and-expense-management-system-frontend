import React from 'react';
import { View } from 'react-native';

import { CurrentMonthExpense } from './components/CurrentMonthExpense'
import { CurrentMonthExpenseDetails } from './components/CurrentMonthExpenseDetails'
import { CurrentBankBalance } from './components/CurrentBalance'
import { AddCategory } from './components/AddCategory'
import { AddExpense } from './components/AddExpense'
import { AddBankDeposit } from './components/AddBankDeposit'

export default function App() {

  return (
    <View>

      <CurrentBankBalance />

      <CurrentMonthExpense />

      <CurrentMonthExpenseDetails />

      <AddExpense />

      <AddCategory />

      <AddBankDeposit />

    </View>
  );
};