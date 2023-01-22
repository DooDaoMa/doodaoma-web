import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, Section } from '../../components'
import { login } from '../../store/features/user'
import { useAppDispatch } from '../../store/hooks'
import { ISignInFormValue } from '../../types'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const onSignIn: SubmitHandler<ISignInFormValue> = (data) => {
    dispatch(login({ username: data.username, password: data.password }))
  }
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
