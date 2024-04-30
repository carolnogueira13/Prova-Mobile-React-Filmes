import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EntradaValores = ({ genero, setGenero, buscarGeneroApi }) => {
  return (
    <View>
      <Text style={styles.titulo}>Buscar de filmes por gênero</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe aqui o genero do filme"
        value={genero}
        onChangeText={text => setGenero(text)}
        keyboardType="default"
      />
      <Button
        title="Buscar filme"
        onPress={buscarGeneroApi}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    marginBottom: 15, 
    textAlign: 'center'
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  }
});

export default EntradaValores;
