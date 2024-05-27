"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ChartUtils from '@/utils/ChartUtils';
import normDimens from '@/resources/dimen/normDimens';
import imageFile from '@/resources/images/imageFile';

const Crypto = dynamic(() => import('../crypto/Crypto'), { ssr: false });

const init = () =>{
  ChartUtils.initCharts();
}

init();

export default function Dashboard () : any {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={styles.container1}>
        <h1>GreeX : Sign In</h1>
        <button style={styles.button1} onClick={() => signIn('google')}>
        <img style={styles.icon1} src={imageFile.ic_google}/>
        <span>Google Sign In</span>
      </button>
      </div>
    );
  }

  return (
    <div style={styles.container2}>
      <div style={styles.container3}>
      <h1>Welcome, {session?.user?.name}</h1>
    <div style={styles.button2} onClick={() => signOut()}>Sign out</div>
      </div>
    
    <Crypto />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container1: {
      flexDirection: 'column',
      display: 'flex',
      backgroundColor:'black',
      width:'100%',
      height: normDimens.SCREEN_HEIGHT,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  button1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
   
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#0f0f0f',
    color: '#fff',
    cursor: 'pointer',
    marginTop: normDimens.DIMEN_60
  },
  icon1: {
    marginRight: '10px',
    width: normDimens.DIMEN_32,
    height: normDimens.DIMEN_32  },

    container2: {
      flexDirection: 'column',
      display: 'flex',
      backgroundColor:'black',
      width:'100%',
      height: normDimens.SCREEN_HEIGHT,
      flex:1,
   
  },

  container3: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor:'#00000080',
    width:'100%',
    minHeight: normDimens.DIMEN_160,
    height: normDimens.SCREEN_HEIGHT,
    flex:1,
    justifyContent:'space-between',
    paddingRight: normDimens.DIMEN_40,
    paddingLeft: normDimens.DIMEN_40,
    alignItems:'center'
},

  button2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#0f0f0f',
    color: '#fff',
    cursor: 'pointer',
    width:normDimens.DIMEN_120*3,
 
    alignSelf:'center'
  },

}
