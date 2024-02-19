'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ModalCore from './modalCore';
import { ModalType } from './modal/modalType';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [session, setSession] = useState<any>()
  const supabase = createClientComponentClient()
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.log(error);
    }

    setSession(session)

    const code = searchParams.get("code");
    if (code != null) {
      try {
        await supabase.auth.exchangeCodeForSession(code!!)
      } catch (error) {

      }

      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.log(error);
        return
      }

      setSession(session)

      router.push('/profile')
    } else {
      if (session == null && pathname?.includes('/profile')) {
        router.push('/');
      }
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <nav className="hidden md:flex space-x-4">
          <div>
            <Link className="text-gray-600 hover:text-blue-600" href="/">
              Home
            </Link>
          </div>
          {session ? (
            <div>
              <Link
                className="text-gray-600 hover:text-blue-600"
                href="/profile"
              >
                Profile
              </Link>
            </div>
          ) : (
            <>
              <div>
                <ModalCore modalType={ModalType.SignIn}></ModalCore>
              </div>
              <div>
                <ModalCore modalType={ModalType.SignUp}></ModalCore>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navigation
