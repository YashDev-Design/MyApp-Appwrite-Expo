import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/useBooksContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <BooksProvider>
    <Stack screenOptions={{ headerShown: false }}></Stack>
    </BooksProvider>
    </UserProvider>
  );
}
