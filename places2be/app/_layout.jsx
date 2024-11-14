import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Auth screens */}
      <Stack.Screen name="(auth)/index" options={{ title: "Welcome", headerShown: false }} />
      <Stack.Screen name="(auth)/Page" options={{ title: "Sign In or Sign Up", headerShown: false }} />
      <Stack.Screen name="(auth)/CreateProfile" options={{ title: "Create Profile", headerShown: false }} />

      {/* Main app screens */}
      <Stack.Screen name="(main)/Index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="(main)/Bookmarks" options={{ title: "Bookmarks", headerShown: false }} />
      <Stack.Screen name="(main)/Profile" options={{ title: "Profile", headerShown: false }} />
      <Stack.Screen name="(main)/UserProfile" options={{ title: "User Profile", headerShown: false }} />
      <Stack.Screen name="(main)/Place" options={{ title: "Place", headerShown: false }} />
      <Stack.Screen name="(main)/Place/[placeName]" options={{ title: "Place", headerShown: false }} />
    </Stack>
  );
}
