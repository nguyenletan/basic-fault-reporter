import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, MD3Colors, Searchbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * App header with profile, search bar, and FAQ button
 * Matches the layout from layout-screen.jpg
 */
export function AppHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Profile Avatar */}
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: 'https://www.infoworld.com/wp-content/uploads/2025/10/2002-0-10153100-1759867342-screen-shot-2017-10-02-at-10.44.49-am-100796432-orig.png?w=109',
              }}
              style={styles.avatarImage}
            />
          </View>
        </TouchableOpacity>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor={MD3Colors.primary20}
          placeholderTextColor={MD3Colors.primary20}
        />

        {/* FAQ Button */}
        <TouchableOpacity style={styles.faqButton}>
          <IconButton
            icon="help-circle"
            size={24}
            style={styles.faqButtonIcon}
            iconColor={MD3Colors.primary20}
          />
          <Text variant="bodyMedium" style={styles.faqButtonText}>
            FAQ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: 'flex',
    height: Platform.OS !== 'android' ? 60 : 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    height: 60,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  searchbar: {
    flex: 1,
    borderRadius: 20,
    height: 40,
  },
  searchInput: {
    fontSize: 14,
    minHeight: 0,
  },
  faqButton: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    paddingVertical: 10,
    color: MD3Colors.primary20,
  },
  faqButtonIcon: {
    margin: 0,
    paddingBottom: 0,
    color: MD3Colors.primary20,
  },
  faqButtonText: {
    color: MD3Colors.primary20,
  },
});
