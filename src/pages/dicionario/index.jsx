import './style.css'
import { useState, useEffect, useCallback } from 'react'
import {FaTrash} from 'react-icons/fa'





function DicionarioPage() {

  const [showPostModal, setShowPostModal] = useState(false)


  const [palavra, setPalavra] =useState('')
  const [traducao, setTraducao] =useState('')
  const [uso, setUso] =useState('')

  const [palavrasTreinamento, setPalavrasTreinamento] = useState([])

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

  
  function togglePostModal (item){
    setShowPostModal(!showPostModal)
    setPalavrasTreinamento(item)
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
    }

    setPalavra('')
    setTraducao('')
    setUso('')
  }

  const handleDelete = useCallback(
    repo => {
      // Ele vai filtrar todos os repositórios e só vai devolver para essa constante todos os repositorios que forem diferentes desse que ele tá mandando
      const find = palavrasTreinamento.filter(r => r.Palavra !== repo)

      setPalavrasTreinamento(find)
    },
    [palavrasTreinamento]
  )

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
              <tr className='tr__pai' key={p.Palavra}>
                  <td>{p.Palavra}</td>
                  <td>{p.Traducao}</td>
 
                  <span className='td__modal'><p><button onClick={() => handleDelete(p.Palavra)}><FaTrash className='lixo' size={14}/></button> Aplicação em uma frase:</p> {p.Uso}</span>
                </tr>
                
                
            ))}

          </tbody>
        </table>
        
    </div>
     
  )
}

export default DicionarioPage