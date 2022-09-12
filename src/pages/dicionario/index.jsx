import './style.css'
import { useState } from 'react'
import Modal from '../../components/modal'
import '../../components/modal'

import {FiX} from 'react-icons/fi'


function DicionarioPage() {

  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()

  const [palavra, setPalavra] =useState('')
  const [traducao, setTraducao] =useState('')
  const [uso, setUso] =useState('')

  const [palavrasTreinamento, setPalavrasTreinamento] = useState([])

  
  function togglePostModal (item){
    setShowPostModal(!showPostModal)
    setPalavrasTreinamento(item)
  }

  function enviarPalavra (e){
    e.preventDefault()
     const data = {
      Palavra: palavra,
      Traducao: traducao,
      Uso: uso
     }

     setPalavrasTreinamento([...palavrasTreinamento, data])


    setPalavra('')
    setTraducao('')
    setUso('')
  }

  return (
    <div className="tabela-content">
      <form className='formulario' onSubmit={enviarPalavra}>
        <h2>Registre uma palavra</h2>
        <div className='campo-input'>
          <label htmlFor="palavra">Palavra</label>
          <input id='palavra' type="text" value={palavra} onChange={e => setPalavra(e.target.value)} />
        </div>
        <div className='campo-input'>
          <label htmlFor="traducao">Tradução</label>
          <input id='traducao' type="text" value={traducao} onChange={e => setTraducao(e.target.value)} />
        </div>
        <div className='campo-input'>
          <label htmlFor="aplicacao">Aplicação em frase</label>
          <input id='aplicacao' type="text" value={uso} onChange={e => setUso(e.target.value)} />
        </div>

        <button type='submit'>Cadastrar palavra</button>
      </form> 
        <table className="tabela">
          <thead>
            <tr>
              <th scope="col">Inglês</th>
              <th scope="col">Português</th>
              {/* <th scope="col">Aplicação</th> */}
            </tr>
          </thead>
          <tbody className="tabela-dicionario">
            {palavrasTreinamento.map((p)=>(
              <tr className='tr__pai'>
                  <td>{p.Palavra}</td>
                  <td>{p.Traducao}</td>
                  <span className='td__modal'><p>Aplicação em uma frase:</p> {p.Uso}</span>
                </tr>
                
            ))}
                
           {/* {showPostModal && (
            <Modal conteudo={palavrasTreinamento} close={togglePostModal} />
            )} */}
          </tbody>
        </table>
        
    </div>
     
  )
}

export default DicionarioPage