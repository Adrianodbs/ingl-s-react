import './style.css'
import {dicionario} from '../../texto'
import { useState } from 'react'

import Modal from '../../components/modal'

function DicionarioPage() {

  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()

  const [palavra, setPalavra] =useState('')
  const [traducao, setTraducao] =useState('')
  const [uso, setUso] =useState('')

  
  function togglePostModal (){
    setShowPostModal(!showPostModal)
    setDetail()
  }

  function enviarPalavra (e){
    e.preventDefault()
    console.log(traducao)

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
              <th scope="col">Aplicação</th>
            </tr>
          </thead>
          <tbody className="tabela-dicionario">
                <tr>
                  <td>{palavra}</td>
                  <td>{traducao}</td>
                  <button onClick={(()=> togglePostModal())}>Aplicação em frase</button>
                </tr>
           
          </tbody>
        </table>
        {showPostModal && (
          <Modal conteudo={detail} close={togglePostModal} />
        )}
    </div>
     
  )
}

export default DicionarioPage