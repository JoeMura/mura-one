import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(
        'https://ab88bcda-cff9-40fc-a7cc-0a273fa9de56-00-21sopem4kcwf.riker.replit.dev/api/auth/google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        toast({
          title: 'Login successful',
          description: 'Welcome to your house hunting dashboard!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: data.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Unable to connect to the server',
        variant: 'destructive',
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: 'Login failed',
      description: 'Google sign-in was unsuccessful',
      variant: 'destructive',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue to your house hunting journey
          </p>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
