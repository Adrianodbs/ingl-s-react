import './style.css'
import { useState, useEffect, useCallback } from 'react'
import { FaTrash } from 'react-icons/fa'
import { GoSignOut } from 'react-icons/go'
import '../../components/modal/modal.css'

import soldado from '../../img/soldado.png'
import cabo from '../../img/cabo.jpg'
import sargento from '../../img/sargento.jpg'
import capitao from '../../img/Capitao.png'
import coronel from '../../img/Coronel.png'
import marechal from '../../img/Marechal.gif'

import { FiX } from 'react-icons/fi'

import { auth, db } from '../../firebase/firebaseConnection'
import { signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc
} from 'firebase/firestore'

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
  // useEffect(() => {
  //   localStorage.setItem('bancoDePalavras', JSON.stringify(palavrasTreinamento))
  // }, [palavrasTreinamento])

  useEffect(() => {
    async function loadPalavras() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail)

        const palavraRef = collection(db, 'palavras')

        const q = query(palavraRef, where('userUid', '==', data?.uid))

        const unsub = onSnapshot(q, snapshot => {
          let lista = []

          snapshot.forEach(doc => {
            lista.push({
              id: doc.id,
              palavra: doc.data().Palavra,
              uso: doc.data().Uso,
              traducao: doc.data().Traducao,
              userUid: doc.data().userUid
            })
          })
          setPalavrasTreinamento(lista)
        })
      }
    }

    loadPalavras()
  }, [])

  async function enviarPalavra(e) {
    e.preventDefault()

    if (palavra !== '' || traducao !== '' || uso !== '') {
      await addDoc(collection(db, 'palavras'), {
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
    } else {
      return
    }
  }

  const openModal = () => {
    setShowPostModal(!showPostModal)
  }

  async function handleDelete(id) {
    const docRef = doc(db, 'palavras', id)

    await deleteDoc(docRef)
  }

  async function deslogar() {
    await signOut(auth)
  }

  return (
    <div className="tabela-content">
      <div className="title">
        <GoSignOut
          onClick={deslogar}
          className="icon-logout"
          size={25}
          color="rebeccapurple"
        />
        <h2>Registre uma palavra</h2>
        <span>Nível do usuário:</span>
        {palavrasTreinamento.length === 0 && (
          <div className="patente">
            <p>Soldado</p>
            <img src={soldado} alt="Soldado" />
          </div>
        )}
        {palavrasTreinamento.length > 0 && palavrasTreinamento.length < 10 && (
          <div className="patente">
            <p>Cabo</p>
            <img src={cabo} alt="Soldado" />
          </div>
        )}
        {palavrasTreinamento.length >= 10 &&
          palavrasTreinamento.length < 30 && (
            <div className="patente">
              <p>Sargento</p>
              <img src={sargento} alt="Soldado" />
            </div>
          )}
        {palavrasTreinamento.length >= 30 &&
          palavrasTreinamento.length < 50 && (
            <div className="patente">
              <p>Capitão</p>
              <img src={capitao} alt="Soldado" />
            </div>
          )}
        {palavrasTreinamento.length >= 50 &&
          palavrasTreinamento.length < 100 && (
            <div className="patente">
              <p>Coronel</p>
              <img src={coronel} alt="Soldado" />
            </div>
          )}
        {palavrasTreinamento.length >= 100 && (
          <div className="patente">
            <p>Marechal</p>
            <img src={marechal} alt="Soldado" />
          </div>
        )}
      </div>

      <form className="formulario" onSubmit={enviarPalavra}>
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
            <tr className="tr__pai" key={p.id}>
              <td>{p.palavra}</td>
              <td>{p.traducao}</td>
              <div className="tr__btn">
                <span>
                  <button onClick={() => handleDelete(p.id)}>
                    <FaTrash className="lixo" size={14} />
                  </button>
                </span>

                <span
                  onClick={() => {
                    openModal()
                    setSelecionada(p.uso)
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
