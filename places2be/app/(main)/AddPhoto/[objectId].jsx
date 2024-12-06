import React from "react";
import { useRouter, useLocalSearchParams } from 'expo-router';
import AddPhoto from "../AddPhoto";

const AddPhotoPage = () => {
    const router = useRouter();
    const { objectId } = useLocalSearchParams(); // Get the dynamic objectId from the route

  return <AddPhoto objectId={objectId} />;
};

export default AddPhotoPage;
