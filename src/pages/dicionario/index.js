import './style.css'
import { useState, useEffect, useCallback } from 'react'
import { FaTrash } from 'react-icons/fa'
import '../../components/modal/modal.css'

import { FiX } from 'react-icons/fi'

import { auth, db } from '../../firebase/firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

function DicionarioPage() {
  const [showPostModal, setShowPostModal] = useState(false)
  const [selecionada, setSelecionada] = useState(false)

  const [palavra, setPalavra] = useState('')
  const [traducao, setTraducao] = useState('')
  const [uso, setUso] = useState('')

  const [palavrasTreinamento, setPalavrasTreinamento] = useState([])

  const [user, setUser] = useState({})

  //Buscar
  useEffect(() => {
    const palavrasStorage = localStorage.getItem('bancoDePalavras')

    if (palavrasStorage) {
      setPalavrasTreinamento(JSON.parse(palavrasStorage))
    }
  }, [])

  //Salvar Alterações
  useEffect(() => {
    localStorage.setItem('bancoDePalavras', JSON.stringify(palavrasTreinamento))
  }, [palavrasTreinamento])

  useEffect(() => {
    async function loadPalavras() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))
    }

    loadPalavras()
  }, [])

  async function enviarPalavra(e) {
    e.preventDefault()

    if (palavra !== '' || traducao !== '' || uso !== '') {
      await addDoc(collection(db, 'tarefas'), {
        Palavra: palavra,
        Traducao: traducao,
        Uso: uso,
        userUid: user?.uid
      })
        .then(() => {
          setPalavra('')
          setTraducao('')
          setUso('')
        })
        .catch(err => console.log(err))

      // const data = {}

      // setPalavrasTreinamento([...palavrasTreinamento, data])
    } else {
      alert('Preencha todos os campos')
      return
    }
  }

  const openModal = () => {
    setShowPostModal(!showPostModal)
  }

  const handleDelete = useCallback(
    repo => {
      // Ele vai filtrar todos os repositórios e só vai devolver para essa constante todos os repositorios que forem diferentes desse que ele tá mandando
      const find = palavrasTreinamento.filter(r => r.Palavra !== repo)

      setPalavrasTreinamento(find)
    },
    [palavrasTreinamento]
  )

  async function deslogar() {
    await signOut(auth)
  }

  return (
    <div className="tabela-content">
      <form className="formulario" onSubmit={enviarPalavra}>
        <button onClick={deslogar}>Deslogar</button>
        <h2>Registre uma palavra</h2>
        <div className="campo-input">
          <label htmlFor="palavra">Palavra</label>
          <input
            id="palavra"
            type="text"
            value={palavra}
            onChange={e => setPalavra(e.target.value)}
          />
        </div>
        <div className="campo-input">
          <label htmlFor="traducao">Tradução</label>
          <input
            id="traducao"
            type="text"
            value={traducao}
            onChange={e => setTraducao(e.target.value)}
          />
        </div>
        <div className="campo-input">
          <label htmlFor="aplicacao">Aplicação em frase</label>
          <input
            id="aplicacao"
            type="text"
            value={uso}
            onChange={e => setUso(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar palavra</button>
      </form>
      <table className="tabela">
        <thead>
          <tr>
            <th scope="col">Inglês</th>
            <th scope="col">Português</th>
            <th scope="col">Aplicação</th>
          </tr>
        </thead>
        <tbody className="tabela-dicionario">
          {palavrasTreinamento.map(p => (
            <tr className="tr__pai" key={p.Uso}>
              <td>{p.Palavra}</td>
              <td>{p.Traducao}</td>
              <div className="tr__btn">
                <span>
                  <button onClick={() => handleDelete(p.Palavra)}>
                    <FaTrash className="lixo" size={14} />
                  </button>
                </span>

                <span
                  onClick={() => {
                    openModal()
                    setSelecionada(p.Uso)
                  }}
                >
                  <button>Aplicação em uma frase</button>
                </span>
              </div>

              {showPostModal && (
                <div className="modal">
                  <div className="container">
                    <button className="close" onClick={openModal}>
                      <FiX size={23} color="#fff" />
                      Voltar
                    </button>

                    <div>
                      <h2>Aplicação em frase:</h2>
                      <span>{selecionada}</span>
                    </div>
                  </div>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DicionarioPage
