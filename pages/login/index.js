import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { getCsrfToken } from "next-auth/react"
import React, { useContext, useState } from 'react';
import AppConfig from '../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Head from 'next/head';
import { Message } from 'primereact/message';

const LoginPage = ({ csrfToken, query }) => {
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    return (
        <>
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                            <span className="text-600 font-medium">Inicia Sesión para continuar</span>
                        </div>
                        {query.error?<div className='m-3'>
                            <center><Message severity="error" text="Credenciales incorrectas" /></center>
                        </div>: <></>}
                        <div>
                            <form method="post" action="/api/auth/callback/credentials">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                    Correo Electronico
                                </label>
                                <InputText inputid="email1" type="text" placeholder="Correo Electronico" name="username" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                    Contraseña
                                </label>
                                <Password inputid="password1" feedback={false} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                    
                                </div>
                                <Button label="Iniciar Sesión" className="w-full p-3 text-xl" type="submit"></Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const query = context.query;
    return {
      props: {
        csrfToken: await getCsrfToken(context),
        query
      },
    }
  }

export default LoginPage;