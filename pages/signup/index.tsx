import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input, Section } from '../../components'
import { createUser, userSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ISignUpFormValue } from '../../types'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const { loginState } = useAppSelector(userSelector)
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      'confirm password': '',
    },
  })

  const onSignUp: SubmitHandler<ISignUpFormValue> = (data) => {
    console.log(data)
    if (data.password === data['confirm password']) {
      dispatch(createUser({ username: data.username, password: data.password }))
    }
  }
  const onPerformSignUp = () => {
    console.log(loginState.status)
    if (loginState.status === 'success') {
      toast.success('Sign Up success')
      router.push('/')
    } else if (loginState.status === 'error') {
      toast.error('Sign up fail')
    }
  }
  useEffect(onPerformSignUp, [loginState, router])

  return (
    <Section className="flex gap-x-8">
      <>
        <div className="">
          <Image src="/people.svg" height={400} width={600} alt="people" />
        </div>
        <div className="flex grow-[1] flex-col gap-y-8">
          <h1 className="text-4xl font-bold">SignUp</h1>
          <form
            onSubmit={handleSubmit(onSignUp)}
            className="flex flex-col gap-y-3">
            <Input label="username" {...register('username')} />
            <Input label="email" type="email" {...register('email')} />
            <Input label="password" type="password" {...register('password')} />
            <Input
              label="confirm password"
              type="password"
              {...register('confirm password')}
            />
            <Button type="submit">submit</Button>
          </form>
          <p className="text-gray-500">
            Already have an account?&nbsp;
            <Link href={'/signin'} className="font-bold text-black underline">
              Sign-in
            </Link>
          </p>
        </div>
      </>
    </Section>
  )
}
