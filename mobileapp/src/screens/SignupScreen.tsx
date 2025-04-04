import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomTextInput from '../component/CustomTextInput';
import {apiRequest} from '../services/apiRequest';
import {showMessage} from 'react-native-flash-message';

const SignupScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const isValidEmail = (email: string) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleSignup = async () => {
    let valid = true;
    let newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

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
        endpoint: '/auth/signup',
        method: 'POST',
        body: {
          email: email,
          name: name,
          password: password,
        },
      });
      setLoading(false);
      const {success, message, error} = data;

      if (success) {
        showMessage({
          message: 'Signup successful!',
          description: 'You can now log in.',
          type: 'success',
          icon: 'success',
        });
        setTimeout(() => navigation.replace('Login'), 3000);
      } else {
        showMessage({
          message: 'Signup Error!',
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Create Account</Text>

      <CustomTextInput
        label="Full Name"
        value={name}
        onChangeText={(text: string) => {
          setName(text);
          if (errors.name) setErrors(prev => ({...prev, name: undefined}));
        }}
        error={!!errors.name}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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
        onChangeText={(text: string) => {
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
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2da07b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontSize: 18, fontWeight: '600'},
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#2da07b',
    fontWeight: '500',
  },
  errorText: {color: 'red', fontSize: 12, marginBottom: 8, marginLeft: 4},
});
