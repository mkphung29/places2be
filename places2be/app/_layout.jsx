import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Auth screens */}
<<<<<<< HEAD
      <Stack.Screen name="(auth)/index" options={{ title: "Welcome" }} />
      <Stack.Screen name="(auth)/Page" options={{ title: "Sign In or Sign Up" }} />
      <Stack.Screen name="(auth)/CreateProfile" options={{ title: "Create Profile" }} />

      {/* Main app screens */}
      <Stack.Screen name="(main)/Index" options={{ title: "Home" }} />
      <Stack.Screen name="(main)/Bookmarks" options={{ title: "Bookmarks" }} />
      <Stack.Screen name="(main)/Profile" options={{ title: "Profile" }} />
      <Stack.Screen name="(main)/UserProfile" options={{ title: "User Profile" }} />
      <Stack.Screen name="(main)/Place" options={{ title: "Place" }} />
      <Stack.Screen name="(main)/Place/:locationName" options={{ title: "Place" }} />
=======
      <Stack.Screen name="(auth)/index" options={{ title: "Welcome", headerShown: false }} />
      <Stack.Screen name="(auth)/Page" options={{ title: "Sign In or Sign Up", headerShown: false }} />
      <Stack.Screen name="(auth)/CreateProfile" options={{ title: "Create Profile", headerShown: false }} />

      {/* Main app screens */}
      <Stack.Screen name="(main)/Index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="(main)/Bookmarks" options={{ title: "Bookmarks", headerShown: false }} />
      <Stack.Screen name="(main)/Profile" options={{ title: "Profile", headerShown: false }} />
      <Stack.Screen name="(main)/UserProfile" options={{ title: "User Profile", headerShown: false }} />
      <Stack.Screen name="(main)/Place" options={{ title: "Place", headerShown: false }} />
      <Stack.Screen name="(main)/Place/[objectId]" options={{ title: "Place", headerShown: false }} />
>>>>>>> chase
    </Stack>
  );
}
