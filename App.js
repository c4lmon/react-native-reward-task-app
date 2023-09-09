import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados da API:', data);
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar tarefas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Lista de Tarefas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="red" style={styles.loader} />
        ) : (
          <ScrollView style={styles.taskContainer}>
            {Array.isArray(tasks.tarefas) && tasks.tarefas.length > 0 ? (
              tasks.tarefas.map((item) => (
                <View key={item.id} style={styles.taskItem}>
                  <View style={styles.taskRow}>
                    <View style={styles.taskInfo}>
                      <Text style={styles.taskTitle}>Tarefa: {item.nome}</Text>
                      <Text style={styles.taskSubtitle}>Validade: {item.dataValidade}</Text>
                    </View>
                    <Icon name="check-circle" size={24} color="green" />
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.task}>Nenhuma tarefa encontrada.</Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40
  },
  taskContainer: {
    flex: 1
  },
  taskItem: {
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskSubtitle: {
    fontSize: 16
  },
  task: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;