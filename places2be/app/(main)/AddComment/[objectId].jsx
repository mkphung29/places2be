import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AddComment from '../AddComment';

const AddCommentPage = () => {
    const router = useRouter();
    const { objectId } = useLocalSearchParams(); // Get the dynamic objectId from the route
  return <AddComment objectId={objectId} />;
};

export default AddCommentPage;
