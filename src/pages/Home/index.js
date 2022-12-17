import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './style.css'

import { auth } from '../../firebase/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    if (email !== '' || senha !== '') {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          //navegar para a página principal
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
      <h1>Inglês React</h1>
      <h3>Faça seu login</h3>

      <form onSubmit={handleLogin}>
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
          LOGIN
        </button>
        <Link to="/register">Não tem conta? Registre-se</Link>
      </form>
    </div>
  )
}
