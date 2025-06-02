import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LikearPost from './LikearPosts';
import { FontAwesome6 } from '@expo/vector-icons'

export default function Post({ data, id, onDelete }) {
  return (
    <View style={styles.post}>
      <Text style={styles.owner}> <FontAwesome6 name="user" size={24} color="#8B939C" />{"     "}{data.owner}</Text>
      <Text style={styles.text}>{data.text}</Text>

      <LikearPost data={data} id={id} />

      {onDelete &&
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(id)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  owner: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    fontSize: 14,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0035',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  }
});
