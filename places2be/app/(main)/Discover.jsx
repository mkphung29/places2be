import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
    {   id: 1,
        name: "Paulson Center",
        image: 'https://heintges.com/wp-content/uploads/2023/07/181-Mercer_15_Edit-scaled.jpg'
    },
    {
        id: 2,
        name: 'Blank Street Coffee',
        image: 'https://res.cloudinary.com/blank-street/image/upload/w_1200,h_900,c_lfill,g_auto/DSC_03799_3dcad96a9f.webp?_a=BAMADKXu0'
    },
    {
        id: 3,
        name: 'Bobst Library',
        image: 'https://lh3.googleusercontent.com/p/AF1QipPp5o5aptOYX_5u774Ro62HYyjgFX2T0AD1ZmOU=s1360-w1360-h1020'
    },
    {
        id: 4,
        name: 'Mille-Feuille Cafe',
        image: 'https://cdn.prod.website-files.com/6202f9a976f5aa6392313a39/621d3c871c2195e31e370c61_Lora_NYC_1019-294-of-117-683x1024.jpeg'
    },

];

const DiscoverScreen = () => {
    const renderItem = ({item}) => (
        <LinearGradient
            colors={['#FF0000','#cb2ecb']}>
            <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        </LinearGradient>
        
    );

    return(
        <View style={styles.container}>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1C4E9',
    },
    list: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 5,
        borderColor: 'pink',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title:{
        padding: 12,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    }

});

export default DiscoverScreen;