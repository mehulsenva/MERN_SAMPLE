import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomTextInput from '../component/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiRequest} from '../services/apiRequest';
import {showMessage} from 'react-native-flash-message';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const isValidEmail = (email: string) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleLogin = async () => {
    let valid = true;
    let newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);
    try {
      const data = await apiRequest({
        endpoint: '/auth/login',
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      });
      setLoading(false);
      const {success, message, error} = data;

      if (success) {
        await AsyncStorage.setItem('userToken', data.jwtToken);
        await AsyncStorage.setItem('userName', data.name);

        showMessage({
          message: 'Login successful!',
          description: 'You are logged in!',
          type: 'success',
          icon: 'success',
        });
        setTimeout(() => navigation.replace('Main'), 1000);
      } else {
        showMessage({
          message: 'Login Error!',
          description: message,
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (err) {
      showMessage({
        message: 'API Error!',
        description: 'Something went wrong. Please try again',
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (!text.trim()) {
              setErrors(prev => ({...prev, email: 'Email is required'}));
            } else if (!/^\S+@\S+\.\S+$/.test(text)) {
              setErrors(prev => ({
                ...prev,
                email: 'Enter a valid email address',
              }));
            } else {
              setErrors(prev => ({...prev, email: undefined}));
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (errors.password)
              setErrors(prev => ({...prev, password: undefined}));
          }}
          secureTextEntry
          error={!!errors.password}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2da07b',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#2da07b',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 18,
    color: '#333',
    fontSize: 14,
  },
  link: {
    color: '#2da07b',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 2,
  },
});
