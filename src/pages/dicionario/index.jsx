import './style.css'
import { useState, useEffect, useCallback } from 'react'
import {FaTrash} from 'react-icons/fa'


import Modal from '../../components/modal'

export default function DicionarioPage(){
  const [showPostModal, setShowPostModal] = useState(false)
  
  const [palavra, setPalavra] =useState('')
  const [traducao, setTraducao] =useState('')
  const [uso, setUso] =useState('')

  const [palavrasTreinamento, setPalavrasTreinamento] = useState([])

  function togglePostModal (item){
    setShowPostModal(!showPostModal)
    // setPalavrasTreinamento(item)
  }

  function enviarPalavra (e){
    e.preventDefault()

    if(palavra !== '' || traducao !== '' || uso !== ''){
      const data = {
      Palavra: palavra,
      Traducao: traducao,
      Uso: uso
     }

     setPalavrasTreinamento([...palavrasTreinamento, data])

     console.log(palavrasTreinamento)
    }

    setPalavra('')
    setTraducao('')
    setUso('')
  }
 return(
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

        
        {palavrasTreinamento.map((p)=>(
          <div className='map_tabela'>
            <div className='map_palavra' key={p.Palavra}>
              <p>{p.Palavra}</p>
            </div>
            <div className='map_traducao' key={p.Traducao}>
              <p>{p.Traducao}</p>
            </div>
            <div className='map_uso' key={p.Uso}>
              <button onClick={togglePostModal}>Aplicação em frase</button>
              {/* {togglePostModal && <Modal conteudo={p} close={togglePostModal} />} */}
            </div>
            {/* <Modal conteudo={p} close={togglePostModal} /> */}
          </div>
        ))}
        
        
      
  </div>
 )
}