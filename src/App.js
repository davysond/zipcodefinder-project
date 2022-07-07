import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {
  const[input, setInput] = useState('');
  const[cep, setCEP] = useState({});

  async function handleSearch(){
    if (input == ''){
      alert("Preencha algum CEP...")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    }
    catch{
      alert("Ops, erro ao buscar. Digite um CEP válido!")
      setInput("")
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador - CEP</h1>
      <div className="container-input">
      <input type='text' placeholder='Digite o seu CEP...' value={input} onChange={(e) => setInput(e.target.value)}/>
      <button className="button-search" onClick={handleSearch}>
        <FiSearch size={25} color='#FFF'/>
      </button>
      </div>
      {Object.keys(cep).length > 0 &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade}, {cep.uf}</span>
      </main>
      )}
    </div>
  );
}

export default App;
