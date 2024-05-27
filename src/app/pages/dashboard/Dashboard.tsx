import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ChartUtils from '@/utils/ChartUtils';

const Crypto = dynamic(() => import('../crypto/Crypto'), { ssr: false });

const init = () =>{
  ChartUtils.initCharts();
}

init();


export default function Dashboard () {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <Crypto />
    </div>
  );
};

