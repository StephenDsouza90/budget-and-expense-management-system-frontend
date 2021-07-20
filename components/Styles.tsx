import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create ({
    titleName: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Avenir'
    },
    details: {
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
        fontSize: 15,
        fontFamily: 'Avenir'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        placeholderTextColor: '#0000ff',
        underlineColorAndroid: 'transparent'
      },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'blue',
        letterSpacing: 2,
        fontFamily: 'Avenir'
    },
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#add8e6',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export { styles }