import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInputProps,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window'); // Get screen width for responsive sizing

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error = false,
  errorMessage,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);
  const animatedLabel = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const borderColor = error ? 'red' : isFocused ? '#2da07b' : '#ccc';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, {borderColor}]}>
        <Animated.Text
          style={[
            styles.label,
            {
              top: animatedLabel.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 6],
              }),
              fontSize: animatedLabel.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              color: error ? 'red' : isFocused ? '#2da07b' : '#999',
            },
          ]}>
          {label}
        </Animated.Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!passwordVisible && secureTextEntry}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}>
            <MaterialIcons
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  container: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16,
    backgroundColor: '#fafafa',
    width: width * 0.9,
    alignSelf: 'center',
  },
  label: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 4,
  },
  input: {
    height: 45,
    fontSize: 16,
    color: '#333',
    paddingTop: 16,
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
