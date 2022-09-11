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
    <div className="tabela-modal">
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
                  <th>{item.Palavra}</th>
                  <th>{item.Traducao}</th>
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