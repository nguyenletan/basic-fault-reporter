import { ThemedView } from '@/components/themed-view';
import { Stack, router } from 'expo-router';
import React from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, List, Text } from 'react-native-paper';

// Mock user data - would come from auth context or API in real app
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Senior Technician',
  department: 'Facilities Maintenance',
  employeeId: 'EMP-12345',
  joinDate: 'January 2023',
  avatar:
    'https://www.infoworld.com/wp-content/uploads/2025/10/2002-0-10153100-1759867342-screen-shot-2017-10-02-at-10.44.49-am-100796432-orig.png?w=109',
};

export default function ProfileScreen() {
  // Platform-agnostic alert helper
  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      window.alert(message ? `${title}\n\n${message}` : title);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSignOut = () => {
    if (Platform.OS === 'web') {
      // Use browser confirm dialog for web
      const confirmed = window.confirm('Are you sure you want to sign out?');
      if (confirmed) {
        // TODO: Clear auth state/tokens
        // Navigate to login screen
        router.replace('/login');
      }
    } else {
      // Use native Alert for mobile platforms
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: () => {
              // TODO: Clear auth state/tokens
              // Navigate to login screen
              router.replace('/login');
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Header */}
          <Card mode="elevated" style={styles.profileCard}>
            <Card.Content style={styles.profileHeader}>
              <Avatar.Image size={80} source={{ uri: mockUser.avatar }} />
              <View style={styles.profileInfo}>
                <Text variant="headlineSmall" style={styles.userName}>
                  {mockUser.name}
                </Text>
                <Text variant="bodyMedium" style={styles.userRole}>
                  {mockUser.role}
                </Text>
                <Text variant="bodySmall" style={styles.userDepartment}>
                  {mockUser.department}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* User Information */}
          <Card mode="outlined" style={styles.infoCard}>
            <Card.Title title="Personal Information" titleVariant="titleMedium" />
            <Card.Content>
              <List.Item
                title="Email"
                description={mockUser.email}
                left={(props) => <List.Icon {...props} icon="email" />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Employee ID"
                description={mockUser.employeeId}
                left={(props) => <List.Icon {...props} icon="badge-account" />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Department"
                description={mockUser.department}
                left={(props) => <List.Icon {...props} icon="office-building" />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Join Date"
                description={mockUser.joinDate}
                left={(props) => <List.Icon {...props} icon="calendar" />}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>

          {/* Role & Permissions */}
          <Card mode="outlined" style={styles.infoCard}>
            <Card.Title title="Role & Access" titleVariant="titleMedium" />
            <Card.Content>
              <List.Item
                title="Current Role"
                description={mockUser.role}
                left={(props) => <List.Icon {...props} icon="shield-account" />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Permissions"
                description="View and manage work orders, Create inspection reports"
                left={(props) => <List.Icon {...props} icon="key" />}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>

          {/* Account Actions */}
          <Card mode="outlined" style={styles.actionsCard}>
            <Card.Content style={styles.actionsContent}>
              <Button
                mode="outlined"
                icon="account-edit"
                onPress={() => {
                  showAlert('Edit Profile', 'Edit profile feature coming soon!');
                }}
                style={styles.actionButton}
              >
                Edit Profile
              </Button>
              <Button
                mode="outlined"
                icon="cog"
                onPress={() => {
                  showAlert('Settings', 'Settings feature coming soon!');
                }}
                style={styles.actionButton}
              >
                Settings
              </Button>
              <Button
                mode="contained"
                icon="logout"
                onPress={handleSignOut}
                style={styles.signOutButton}
                buttonColor="#d32f2f"
              >
                Sign Out
              </Button>
            </Card.Content>
          </Card>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text variant="bodySmall" style={styles.versionText}>
              Fault Reporter v1.0.0
            </Text>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginTop: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontWeight: '600',
  },
  userRole: {
    opacity: 0.8,
  },
  userDepartment: {
    opacity: 0.6,
  },
  infoCard: {
    marginTop: 8,
  },
  listItem: {
    paddingLeft: 0,
  },
  actionsCard: {
    marginTop: 8,
  },
  actionsContent: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  signOutButton: {
    marginTop: 8,
    marginVertical: 4,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 16,
  },
  versionText: {
    opacity: 0.5,
  },
});
