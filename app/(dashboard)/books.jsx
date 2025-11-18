// app/(dashboard)/books.jsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { router } from "expo-router";

export default function BooksScreen() {
  const { books, loadingBooks, booksError, createBook, deleteBook } =
    useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleCreate = async () => {
    if (!title || !author) return;
    await createBook(title, author);
    setTitle("");
    setAuthor("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books</Text>

      {booksError ? <Text style={styles.error}>{booksError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Create Book" onPress={handleCreate} />

      {loadingBooks ? (
        <Text style={{ marginTop: 20 }}>Loading...</Text>
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={books}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/(dashboard)/books/${item.$id}`)
              }
              style={styles.bookItem}
            >
              <View>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text>{item.author}</Text>
              </View>
              <Button
                title="Delete"
                onPress={() => deleteBook(item.$id)}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: { color: "red", marginBottom: 8 },
  bookItem: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookTitle: { fontWeight: "bold" },
});