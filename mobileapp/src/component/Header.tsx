
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  leftIconName?: string;
  rightIconName?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  IconComponent?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIconName,
  rightIconName,
  onLeftPress,
  onRightPress,
  IconComponent,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onLeftPress} style={styles.iconWrapper}>
      {IconComponent && leftIconName && <IconComponent name={leftIconName} size={24} color="#fff" />}
    </TouchableOpacity>

    <Text style={styles.title}>{title}</Text>

    <TouchableOpacity onPress={onRightPress} style={styles.iconWrapper}>
      {IconComponent && rightIconName && <IconComponent name={rightIconName} size={24} color="#fff" />}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#2da07b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconWrapper: {
    width: 30,
    alignItems: 'center',
  },
});

export default Header;
