import { authService } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  MD3Colors,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateForm = () => {
    if (!fullName.trim()) {
      showMessage('Please enter your full name', 'error');
      return false;
    }

    if (!email.trim()) {
      showMessage('Please enter your email', 'error');
      return false;
    }

    if (!password) {
      showMessage('Please enter a password', 'error');
      return false;
    }

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters', 'error');
      return false;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match', 'error');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const fullEmail = email.includes('@') ? email : `${email}@gmail.com`;
      const userCredential = await authService.signUp(fullEmail, password);

      // Send verification email
      await authService.sendVerificationEmail(userCredential.user);

      // Navigate to verification screen
      router.replace({
        pathname: '/verify-email',
        params: { email: fullEmail },
      });
    } catch (error: any) {
      let errorMessage = 'Failed to create account';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Sign up is not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
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

            {/* Sign Up Card */}
            <Card style={styles.card}>
              <Card.Content>
                {/* Sign Up Header */}
                <Text
                  variant="titleLarge"
                  style={[styles.signUpTitle, { color: MD3Colors.primary20 }]}
                >
                  Sign Up
                </Text>
                <Text
                  variant="bodyMedium"
                  style={[styles.signUpSubtitle, { color: MD3Colors.primary20 }]}
                >
                  Create your account to get started.
                </Text>

                {/* Full Name Input */}
                <TextInput
                  label="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  mode="outlined"
                  autoCapitalize="words"
                  autoComplete="name"
                  left={<TextInput.Icon icon="account" />}
                  style={styles.input}
                  disabled={loading}
                />

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
                  autoComplete="password-new"
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

                {/* Confirm Password Input */}
                <TextInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  mode="outlined"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  left={<TextInput.Icon icon="lock-check" />}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                  style={styles.input}
                  disabled={loading}
                />

                {/* Sign Up Button */}
                <Button
                  mode="contained"
                  onPress={handleSignUp}
                  loading={loading}
                  disabled={loading}
                  style={styles.signUpButton}
                  contentStyle={styles.signUpButtonContent}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>

                {/* Sign In Link */}
                <View style={styles.signInContainer}>
                  <Text style={[styles.signInText, { color: MD3Colors.primary20 }]}>
                    Already have an account?{' '}
                  </Text>
                  <Button
                    mode="text"
                    onPress={() => router.back()}
                    textColor={MD3Colors.primary20}
                    compact
                    disabled={loading}
                  >
                    Sign In
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
          duration={5000}
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
  signUpTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  signUpSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
  },
  signUpButton: {
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  signUpButtonContent: {
    paddingVertical: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signInText: {
    fontSize: 14,
  },
});
