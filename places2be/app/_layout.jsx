import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Auth screens */}
      <Stack.Screen name="(auth)/Page" options={{ title: "Sign In or Sign Up" }} />

      {/* Main app screens */}
      <Stack.Screen name="(main)/Index" options={{ title: "Home" }} />
      <Stack.Screen name="(main)/Bookmarks" options={{ title: "Bookmarks" }} />
      <Stack.Screen name="(main)/Profile" options={{ title: "Profile" }} />
      <Stack.Screen name="(main)/UserProfile" options={{ title: "User Profile" }} />
      <Stack.Screen name="(main)/Place" options={{ title: "Place" }} />
    </Stack>
  );
}
