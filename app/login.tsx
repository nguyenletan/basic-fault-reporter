import { authService } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  MD3Colors,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'error' | 'success'>('error');
  const theme = useTheme();
  const router = useRouter();

  const showMessage = (message: string, type: 'error' | 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const fullEmail = email.includes('@') ? email : `${email}@gmail.com`;
      await authService.signIn(fullEmail, password);
      showMessage('Logged in successfully!', 'success');
      setTimeout(() => router.replace('/(tabs)'), 500);
    } catch (error: any) {
      let errorMessage = 'Failed to sign in';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
      }

      showMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Text style={[styles.logoTitle, { color: MD3Colors.primary20 }]}>Centasa</Text>
              <Text style={[styles.logoSubtitle, { color: MD3Colors.primary20 }]}>
                Fault Reporter
              </Text>
            </View>

            {/* Sign In Card */}
            <Card style={styles.card}>
              <Card.Content>
                {/* Sign In Header */}
                <Text
                  variant="titleLarge"
                  style={[styles.signInTitle, { color: MD3Colors.primary20 }]}
                >
                  Sign In
                </Text>
                <Text
                  variant="bodyMedium"
                  style={[styles.signInSubtitle, { color: MD3Colors.primary20 }]}
                >
                  Sign in to continue.
                </Text>

                {/* Email Input */}
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  left={<TextInput.Icon icon="email" />}
                  right={<TextInput.Affix text="@gmail.com" />}
                  style={styles.input}
                  disabled={loading}
                />

                {/* Password Input */}
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                  disabled={loading}
                />

                {/* Keep Signed In & Forgot Password */}
                <View style={styles.optionsRow}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox.Android
                      status={keepSignedIn ? 'checked' : 'unchecked'}
                      onPress={() => setKeepSignedIn(!keepSignedIn)}
                      color={MD3Colors.primary20}
                      disabled={loading}
                    />
                    <Text style={[styles.checkboxLabel, { color: MD3Colors.primary20 }]}>
                      Keep me signed in
                    </Text>
                  </View>

                  <Button
                    mode="text"
                    onPress={() => {}}
                    textColor={MD3Colors.primary20}
                    style={styles.forgotButton}
                    disabled={loading}
                  >
                    Forgot Password?
                  </Button>
                </View>

                {/* Sign In Button */}
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={loading}
                  disabled={loading}
                  style={styles.signInButton}
                  contentStyle={styles.signInButtonContent}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                  <Text style={[styles.signUpText, { color: MD3Colors.primary20 }]}>
                    Don't have an account?{' '}
                  </Text>
                  <Button
                    mode="text"
                    onPress={() => {}}
                    textColor={MD3Colors.primary20}
                    compact
                    disabled={loading}
                  >
                    Sign Up
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>

        {/* Snackbar for messages */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{
            backgroundColor: snackbarType === 'error' ? MD3Colors.error40 : MD3Colors.primary30,
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </KeyboardAvoidingView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  logoTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
  },
  logoSubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  card: {},
  signInTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  signInSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  forgotButton: {
    marginRight: -8,
  },
  signInButton: {
    borderRadius: 8,
    marginBottom: 16,
  },
  signInButtonContent: {
    paddingVertical: 8,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpText: {
    fontSize: 14,
  },
});
