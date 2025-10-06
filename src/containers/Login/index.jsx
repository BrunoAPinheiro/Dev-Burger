import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from './styles';
import Logo from '../../assets/logo-login.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

export function Login() {
  const schema = yup
    .object({
      email: yup.string().email('Digite um e-mail válido!').required('Campo obrigatório!'),
      password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres!').required('Campo obrigatório!'),
    })
    .required()

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


  const onSubmit = async (data) => {
    const response = await toast.promise(
      api.post('/sessions', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Fazendo login...',
        success: 'Login realizado com sucesso!',
        error: 'Erro ao realizar login!',
      }
    )

    return
    console.log(response)
  };




  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo DevBurger" />
      </LeftContainer>

      <RightContainer>

        <Title>
          Olá, seja bem vindo ao <span> Dev Burguer! </span>
          <br />
          Acesse com seu <span> Login e senha. </span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>E-mail</label>
            <input type="email" placeholder="Login" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" placeholder="Senha" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>Não possui conta? <Link to="/cadastro">Clique aqui.</Link></p>
      </RightContainer>
    </Container>
  )
}