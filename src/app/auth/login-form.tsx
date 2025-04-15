'use client';
import { lusitana } from '@/global/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn}  from './auth';
import { z } from 'zod';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (form: FormData) => {
    const data = {
      username: form.get('username'),
      password: form.get('password'),
    }
    const parsedCredentials = z
    .object({ username: z.string(), password: z.string() })
    .safeParse(data);
    if (parsedCredentials.error) {
      setErrorMessage('Invalid credentials format.');
      return;
    }
    setIsLoading(true);
    try {
        // console.log(form.get('password'));
        const resp = await signIn(parsedCredentials.data.username, parsedCredentials.data.password);
        if (!resp) {
          setErrorMessage('Invalid credentials.');
          return;
        }
        localStorage.setItem('session', resp);
        router.push('/admin');
    } catch {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form action={onSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-neutral-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-white`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium bg-neutral-900 text-white"
              htmlFor="text"
            >
              username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="hint: admin"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:bg-neutral-500" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium bg-neutral-900 text-white"
              htmlFor="password"
            >
              password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="hint: admin"
                required
                minLength={5}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:bg-neutral-500" />
            </div>
          </div>
        </div>
        <Button className="mt-8 w-full" aria-disabled={isLoading}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}