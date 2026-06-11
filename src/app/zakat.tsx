import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ZakatScreen() {
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [cash, setCash] = useState('');
  const [zakatGold, setZakatGold] = useState(0);
  const [zakatSilver, setZakatSilver] = useState(0);
  const [zakatCash, setZakatCash] = useState(0);
  const [totalZakat, setTotalZakat] = useState(0);

  const calculateZakat = () => {
    const goldAmount = parseFloat(gold) || 0;
    const silverAmount = parseFloat(silver) || 0;
    const cashAmount = parseFloat(cash) || 0;

    // Zakat is 2.5%
    const zakatG = goldAmount * 0.025;
    const zakatS = silverAmount * 0.025;
    const zakatC = cashAmount * 0.025;

    setZakatGold(zakatG);
    setZakatSilver(zakatS);
    setZakatCash(zakatC);
    setTotalZakat(zakatG + zakatS + zakatC);

    if (goldAmount === 0 && silverAmount === 0 && cashAmount === 0) {
      Alert.alert('Enter some value', 'Please enter gold, silver or cash amount.');
    }
  };

  const resetFields = () => {
    setGold('');
    setSilver('');
    setCash('');
    setZakatGold(0);
    setZakatSilver(0);
    setZakatCash(0);
    setTotalZakat(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>💰 Zakat Calculator</Text>

        {/* Gold */}
        <Text style={styles.label}>Gold (grams)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter gold amount"
          placeholderTextColor="#aaa"
          value={gold}
          onChangeText={setGold}
        />

        {/* Silver */}
        <Text style={styles.label}>Silver (grams)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter silver amount"
          placeholderTextColor="#aaa"
          value={silver}
          onChangeText={setSilver}
        />

        {/* Cash */}
        <Text style={styles.label}>Cash / Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter cash amount"
          placeholderTextColor="#aaa"
          value={cash}
          onChangeText={setCash}
        />

        {/* Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
          <TouchableOpacity style={styles.button} onPress={calculateZakat}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#EF4444' }]} onPress={resetFields}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Zakat on Gold: {zakatGold.toFixed(2)}</Text>
          <Text style={styles.resultText}>Zakat on Silver: {zakatSilver.toFixed(2)}</Text>
          <Text style={styles.resultText}>Zakat on Cash: {zakatCash.toFixed(2)}</Text>
          <Text style={[styles.resultText, { fontWeight: 'bold', marginTop: 10 }]}>
            Total Zakat: {totalZakat.toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071320',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#111827',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 5,
    marginLeft: 5,
    marginRight:5,
  },
  button: {
    flex: 0.48,
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
});