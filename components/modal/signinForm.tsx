"use client"
import { Dispatch, SetStateAction } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GoogleButton from "../socialLogin/googleButton";
import FacebookButton from "../socialLogin/facebookButton";
import Link from "next/link";

export default function SignInForm(props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const supabase = createClientComponentClient()

  const handleSocialLogin = async (prov: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: prov,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.log(error);
      return
    }

  }

  return (
    <>
      <form action="/auth/login" method="post" className="space-y-4 mb-10">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="text-right">
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${location.origin}/resetPassword`} onClick={() => showModal(false)}>パスワードを忘れた場合</Link>
        </div>
        <div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            サインイン
          </button>
        </div>
      </form>
      <div>
        <GoogleButton handleClickMethod={handleSocialLogin}></GoogleButton>
      </div>
      <div className="">
        <FacebookButton handleClickMethod={handleSocialLogin}></FacebookButton>
      </div>
    </>
  );
}
