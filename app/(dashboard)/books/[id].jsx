// app/(dashboard)/books/[id].jsx
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { databases, DATABASE_ID, COLLECTION_ID } from "../../../lib/appwrite";

export default function BookDetail() {
  const { id } = useLocalSearchParams(); // get dynamic ID
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        setBook(res);
      } catch (err) {
        console.log("Error loading book:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadBook();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading book details...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Book not found 😭</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.id}>ID: {book.$id}</Text>
      <Text style={styles.time}>
        Created: {new Date(book.$createdAt).toLocaleString()}
      </Text>
      <Text style={styles.time}>
        Updated: {new Date(book.$updatedAt).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  author: {
    fontSize: 18,
    marginBottom: 8,
  },
  id: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 20,
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.6,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
