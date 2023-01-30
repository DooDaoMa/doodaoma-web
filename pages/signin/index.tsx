import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input, Section } from '../../components'
import { login, userSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ISignInFormValue } from '../../types'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loginState } = useAppSelector(userSelector)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const onSignIn: SubmitHandler<ISignInFormValue> = (data) => {
    dispatch(login({ username: data.username, password: data.password }))
  }

  const onPerformSignIn = () => {
    if (loginState.status === 'success') {
      toast.success('Sign In success')
      router.push('/')
    } else if (loginState.status === 'error') {
      toast.error('Authentication fail')
    }
  }
  useEffect(onPerformSignIn, [loginState, router])
  return (
    <Section className="flex gap-x-8">
      <>
        <div className="">
          <Image src="/people.svg" height={400} width={600} alt="people" />
        </div>
        <div className="flex grow-[1] flex-col gap-y-8">
          <h1 className="text-4xl font-bold">SignIn</h1>
          <form
            onSubmit={handleSubmit(onSignIn)}
            className="flex flex-col gap-y-3">
            <Input label="username" {...register('username')} />
            <Input label="password" type="password" {...register('password')} />
            <Button type="submit">submit</Button>
          </form>
          <p className="text-gray-500">
            Don&rsquo;t have an account?&nbsp;
            <Link href={'/signup'} className="font-bold text-black underline">
              Sign-up
            </Link>
          </p>
        </div>
      </>
    </Section>
  )
}
