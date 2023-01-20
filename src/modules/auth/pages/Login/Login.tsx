import { FC, FormEvent, useState } from 'react'
import logo from '@/assets/logo.png'
import logoPrimary from '@/assets/logo-primary.png'
import { Text } from '@/components/Text'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import PageContainer from '@/styles/Layout/PageContainer'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

type UserCredentials = {
  email: string
  password: string
}

const Login: FC = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserCredentials>(
    {} as UserCredentials
  )
  const { login, loading } = useLogin()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userData?.email || !userData?.password) {
      alert('Preencha todas as informacoes')
      return
    }

    await login(
      {
        data: {
          email: userData?.email,
          password: userData?.password
        }
      },
      () => {
        navigate('/')
      }
    )
  }

  return (
    <PageContainer fullHeight>
      <div className="grid md:grid-cols-2 flex-1">
        <div className="bg-primary-700 p-12 hidden md:flex items-center justify-center ">
          <img
            src={logo}
            alt="LOGO_SABRINA"
            className="max-w-xs md:max-w-lg w-full h-auto"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <img
            src={logoPrimary}
            alt="LOGO_SABRINA"
            className="block md:hidden max-w-xs md:max-w-lg w-full h-auto"
          />

          <Text renderAs="h1">Acesso</Text>

          <form
            className="w-8/12 md:w-6/12 flex flex-col gap-4 min-w-[300px]"
            onSubmit={onSubmit}
          >
            <Input
              label="E-mail"
              onChange={(event) =>
                setUserData((prevState) => ({
                  ...prevState,
                  email: event.target.value
                }))
              }
            />
            <Input
              label="Senha"
              type="password"
              onChange={(event) =>
                setUserData((prevState) => ({
                  ...prevState,
                  password: event.target.value
                }))
              }
            />

            <Button className="mt-4" type="submit" busy={loading}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  )
}

export default Login
