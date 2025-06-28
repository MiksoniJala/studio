
import { loginAction } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';

export default function AdminLoginPage() {
  return <LoginForm loginAction={loginAction} />;
}
