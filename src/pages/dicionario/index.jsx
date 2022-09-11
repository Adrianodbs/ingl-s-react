import './style.css'
import {dicionario} from '../../texto'
import { useState } from 'react'

import Modal from '../../components/modal'

function DicionarioPage() {

  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()
  
  function togglePostModal (item){
    setShowPostModal(!showPostModal)
    setDetail(item)
  }
  return (
    <div className="tabela-content">
      <form className='formulario'>
        <h2>Registre uma palavra</h2>
        <div className='campo-input'>
          <label htmlFor="palavra">Palavra</label>
          <input id='palavra' type="text" />
        </div>
        <div className='campo-input'>
          <label htmlFor="traducao">Tradução</label>
          <input id='traducao' type="text" />
        </div>
        <div className='campo-input'>
          <label htmlFor="aplicacao">Aplicação em frase</label>
          <input id='aplicacao' type="text" />
        </div>

        <button>Cadastrar palavra</button>
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
            {dicionario.map(item=>{
              return(
                <tr>
                  <td>{item.Palavra}</td>
                  <td>{item.Traducao}</td>
                  <button onClick={(()=> togglePostModal(item))}>Aplicação em frase</button>
                </tr>
              )
            })}
          </tbody>
        </table>
        {showPostModal && (
          <Modal conteudo={detail} close={togglePostModal} />
        )}
    </div>
     
  )
}

export default DicionarioPage