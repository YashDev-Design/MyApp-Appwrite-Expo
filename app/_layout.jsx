// app/_layout.jsx
import { Stack } from "expo-router";
//import { UserProvider } from "../contexts/UserContext";
//import { BooksProvider } from "../contexts/BooksContext";

export default function RootLayout() {
  return (
    //<UserProvider>
      //<BooksProvider>
        <Stack screenOptions={{ headerShown: false }} />
      //</BooksProvider>
    //</UserProvider>
  );
}
