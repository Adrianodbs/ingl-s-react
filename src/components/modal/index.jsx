import './modal.css'

import {FiX} from 'react-icons/fi'

function Modal({conteudo, close}) {
  return (
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={close}>
          <FiX size={23} color='#fff' />
          Voltar
        </button>

        <div>
          <h2>Aplicação em frase</h2>
          <span>{conteudo}</span>
        </div>
      </div>
    </div>
  )
}

export default Modal