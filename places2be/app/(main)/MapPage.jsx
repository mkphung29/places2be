import { StyleSheet, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../../components/Header.jsx';
import NavBar from '../../components/NavBar.jsx'
import ColorBlock from '../../components/ColorBlock.jsx'

const initRegion={
    latitude: 40.7291,
    longitude: -73.9965,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,

  };

const MapPage = () => {
    return(
        <View style={styles.container}> 
            <ColorBlock height={60} />
            <Header text={'Map'} includeSave={false} includeBack={false}/>
            <View style={styles.container}>
            <MapView
                style={styles.map}
                styleUrl={`https://api.maptiler.com/maps/streets-v2-dark/style.json?key=Qr3kbzWfBOmee8MB9sfO`}
                initialRegion={initRegion}
                zoomEnabled={true}
                scrollEnabled={true}
                showsScale={true}
                tintColor={'#D1C4E9'}
                />
            </View>
            <NavBar />
        </View>
    );
   
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flexDirection: 'column',
    },
    map:{
        width:'100%',
        height:'100%'
    },
    mapContainer:{
         flex:1,
     },



})

  export default MapPage;