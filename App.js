import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import EntradaValores from './EntradaValores';

const App = () => {
  const [genero, setGenero] = useState('');
  const [resultado, setResultado] = useState(false);
  const [error, setError] = useState('');
  const [filmes, setFilmes] = useState([]);

  const setInformacao = (json, genero) => {
    const lista= [];
    json.forEach((element) => {
      if (element.Genre.includes(genero)){
        lista.push(element.Title)
      }
    });
    setFilmes(lista);
  };

  const buscarGeneroApi = () => {
    axios.get(`http://10.136.63.191:3000/data`)
      .then((resposta) => {
        if (resposta.data && genero) {
          setInformacao(resposta.data, genero);
          setResultado(true);
          setError('');
        } else {
          setResultado(false);
          setError('Insira um gênero para procurar filmes');
        }
      })
      .catch((error) => {
        setResultado(false);
        setError('Erro ao buscar os filmes para o gênero. Verifique sua conexão.');
      });
  };

  return (
    <View style={styles.container}>
      <EntradaValores
        genero={genero}
        setGenero={setGenero}
        buscarGeneroApi={buscarGeneroApi}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {resultado ? (
        filmes && filmes.length > 0 ? (
          <FlatList style={{ marginTop: 15 }}
            data={filmes}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 14 }}>{item}</Text>
            )}
          />
        ) : (
          <Text style={styles.naoEncontrado}>Nenhum filme encontrado para esse gênero</Text>
        )
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 120
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold'
  },
  naoEncontrado: {
    marginTop: 10,
    fontWeight: 'bold'
  }
});

export default App;
