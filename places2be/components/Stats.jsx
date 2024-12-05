import React from "react";
import {Text, View, StyleSheet} from 'react-native';

const S = ({catergory, number}) => {
    return(
        <View style={styles.container}>
            <Text style={{textAlign: 'center', fontWeight:'bold', fontSize: 15}}>{catergory}</Text>
            <Text style={{textAlign: 'center',top:10, fontSize: 20}}>{number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,
    }


});

export default S;