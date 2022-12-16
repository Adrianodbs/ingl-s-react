import { Link } from 'react-router-dom'
import { useState } from 'react'
import './style.css'

export default function Home() {
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="home">
      <h1>Inglês React</h1>
      <h3>Faça seu login</h3>

      <form>
        <input type="text" placeholder="Digite o seu e-mail" />
        <input type="password" placeholder="Digite a sua senha" />
        <button className="btn-home">LOGIN</button>
        <Link to="/register">Não tem conta? Registre-se</Link>
      </form>
    </div>
  )
}
