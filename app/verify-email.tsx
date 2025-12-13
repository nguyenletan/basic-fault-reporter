import { authService } from '@/services/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, MD3Colors, Snackbar, Surface, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RESEND_COOLDOWN = 60; // 60 seconds cooldown

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams();
  const email = params.email as string;
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const theme = useTheme();
  const router = useRouter();

  // Start cooldown timer when screen loads (email was just sent)
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResendEmail = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      setSnackbarMessage('Session expired. Please sign up again.');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      await authService.sendVerificationEmail(user);
      setSnackbarMessage('Verification email sent! Please check your inbox.');
      setSnackbarVisible(true);
      // Restart cooldown timer
      setCooldown(RESEND_COOLDOWN);
    } catch (error: any) {
      let errorMessage = 'Failed to send verification email';

      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many email requests. Please wait a few minutes and try again.';
      }

      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.replace('/login');
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="email-check-outline"
            size={120}
            color={MD3Colors.primary40}
          />
        </View>

        {/* Success Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={[styles.title, { color: MD3Colors.primary20 }]}>
              Account Created!
            </Text>

            <Text variant="bodyLarge" style={[styles.subtitle, { color: MD3Colors.primary20 }]}>
              We've sent a verification email to:
            </Text>

            <Text variant="bodyLarge" style={[styles.email, { color: MD3Colors.primary30 }]}>
              {email}
            </Text>

            <View style={styles.instructionsContainer}>
              <Text
                variant="bodyMedium"
                style={[styles.instructions, { color: MD3Colors.primary20 }]}
              >
                Please check your inbox and click the verification link to activate your account.
              </Text>

              <Text
                variant="bodyMedium"
                style={[styles.instructions, { color: MD3Colors.primary20 }]}
              >
                After verifying your email, you can sign in to your account.
              </Text>
            </View>

            {/* Buttons */}
            <Button
              mode="contained"
              onPress={handleGoToLogin}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
            >
              Go to Sign In
            </Button>

            <Button
              mode="outlined"
              onPress={handleResendEmail}
              loading={loading}
              disabled={loading || cooldown > 0}
              style={styles.resendButton}
              contentStyle={styles.buttonContent}
              textColor={MD3Colors.primary30}
            >
              {loading
                ? 'Sending...'
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : 'Resend Verification Email'}
            </Button>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <MaterialCommunityIcons
                name="information-outline"
                size={16}
                color={MD3Colors.primary40}
              />
              <Text variant="bodySmall" style={[styles.helpText, { color: MD3Colors.primary40 }]}>
                {cooldown > 0
                  ? 'For security, you can resend the email after the cooldown timer expires.'
                  : "Didn't receive the email? Check your spam folder or click resend."}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Snackbar for messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={{
          backgroundColor: MD3Colors.primary30,
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 24,
    fontSize: 16,
  },
  instructionsContainer: {
    backgroundColor: MD3Colors.primary95,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    gap: 12,
  },
  instructions: {
    lineHeight: 22,
  },
  loginButton: {
    borderRadius: 8,
    marginBottom: 12,
  },
  resendButton: {
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 8,
  },
  helpText: {
    flex: 1,
    lineHeight: 18,
  },
});
