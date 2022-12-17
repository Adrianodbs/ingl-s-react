import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../Home/style.css'

import { auth } from '../../firebase/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    if (email !== '' || senha !== '') {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigate('/dicionario', { replace: true })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      alert('Preencha todos os campos!')
    }
  }
  return (
    <div className="home">
      <h1>Cadastre-se</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite a sua senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button type="submit" className="btn-home">
          CADASTRAR
        </button>
        <Link to="/">Já tem uma conta? Faça o login</Link>
      </form>
    </div>
  )
}
