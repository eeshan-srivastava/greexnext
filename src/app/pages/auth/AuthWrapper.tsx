"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Dashboard from '../dashboard/Dashboard';

interface Props {
  children: React.ReactNode
}

export default function AuthWrapper (props: Props) : any {
  const {children} = props
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    );
  }

  return (
    {children}
  );
};
