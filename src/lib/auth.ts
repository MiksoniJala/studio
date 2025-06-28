
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/cookies';

export type LoginState = {
  message: string | null;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'admin@primjer.com' && password === 'ryze2025') {
    cookies().set('session', 'true', { httpOnly: true, path: '/' });
    redirect('/admin');
  }

  return { message: 'Nevažeći email ili lozinka.' };
}

export async function logoutAction() {
    cookies().delete('session');
    redirect('/admin/login');
}
