import React from 'react';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

const Profile = () => {
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const doc = await firestore.collection('users').doc(user.uid).get();
          if (doc.exists) {
            setProfile(doc.data());
          }
        }
      };
  
      fetchProfile();
    }, []);
  
    if (!profile) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View>
        <Text>First Name: {profile.firstName}</Text>
        <Text>Last Name: {profile.lastName}</Text>
        <Text>Bio: {profile.bio}</Text>
      </View>
    );
  };
  