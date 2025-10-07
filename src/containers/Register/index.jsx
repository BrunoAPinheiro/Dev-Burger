import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link, } from './styles';
import Logo from '../../assets/logo-login.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
 
export function Register() {
  const navigate = useNavigate( );

  const schema = yup
    .object({
      name: yup
        .string()
        .required('Campo obrigatório!'),
      email: yup
        .string()
        .email('Digite um e-mail válido!')
        .required('Campo obrigatório!'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres!')
        .required('Campo obrigatório!'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
        .required('Campo obrigatório!'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);


const onSubmit = async (data) => {
  try {
    const { status } = await api.post(
      '/users',
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        validateStatus: () => true,
      }
    );

    if (status === 200  || status === 201) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      toast.success('Conta criada com sucesso!');
    } else if (status === 409) {
      toast.error('E-mail já cadastrado!');
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error('Erro ao criar conta! Tente novamente mais tarde.');
  }
};





return (
  <Container>
    <LeftContainer>
      <img src={Logo} alt="Logo DevBurger" />
    </LeftContainer>

    <RightContainer>

      <Title> Criar Conta </Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <label>Nome</label>
          <input type="text" placeholder="Nome" {...register("name")} />
          <p>{errors?.name?.message}</p>
        </InputContainer>

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

        <InputContainer>
          <label>Confirmar Senha</label>
          <input type="password" placeholder="Confirmar Senha" {...register("confirmPassword")} />
          <p>{errors?.confirmPassword?.message}</p>
        </InputContainer>

        <Button type="submit">Criar Conta</Button>
      </Form>
      <p>Já possui conta? <Link to="/login">Clique aqui.</Link></p>
    </RightContainer>
  </Container>
)
}