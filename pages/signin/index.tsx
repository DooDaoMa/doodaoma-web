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
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loginState, currentUser } = useAppSelector(userSelector)
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
    } else if (loginState.status === 'error') {
      toast.error('Authentication fail')
    }
  }

  const onSignedIn = () => {
    if (currentUser !== null) {
      router.push('/')
    }
  }

  if (currentUser !== null) {
    router.push('/')
  }

  useEffect(onPerformSignIn, [loginState])
  useEffect(onSignedIn, [currentUser])

  return (
    <Section className="flex flex-col gap-y-8 md:flex-row md:gap-x-8">
      <>
        <div className="flex grow-[2] md:block">
          <Image src="/people.svg" height={400} width={600} alt="people" />
        </div>
        <div className="flex grow-[1] flex-col gap-y-8">
          <h1 className="text-4xl font-bold">Sign In</h1>
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
