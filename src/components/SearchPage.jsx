import { useState, useEffect } from 'react';

function SearchPage () {
    const [cep, setCep] = useState('');
    const [responseData, setResponseData] = useState(null);

    const formatCep = (value) => {
        const onlyNumbers = value.replace(/[^\d]/g, '');
        if (onlyNumbers.length <= 5) {
            return onlyNumbers;
        } else {
            return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5, 8)}`;
        }
    };

    const handleCepChange = (e) => {
        const formattedCep = formatCep(e.target.value);
        setCep(formattedCep);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setResponseData(data);
    };

    useEffect(() => {
        if (responseData) {
            // Você pode renderizar os dados da API conforme necessário.
            console.log(responseData);
        }
    }, [responseData]);

    return(
        <>
            <div className="container">
                {/* Inicio - Logo */}
                <div className="flex justify-center items-center">
                    <img src="src\assets\address.svg" alt="Icon" className="logo"/>
                    <h1 className="text-white font-bold text-xl">Consulta de CEP</h1>
                </div>
                {/* Fim - Logo */}

                {/* Inicio - Form */}
                <form className="form-group" onSubmit={handleSubmit}>
                    <label htmlFor="CEP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digite o CEP</label>
                    <div className="flex">
                        <input type="text" id="CEP" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-3/5 125 p-2.5 mr-3 sm:w-full md:w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Digite o CEP" 
                        value={cep}
                        onChange={handleCepChange}
                        required></input>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisa</button>
                    </div>
                </form>
                {/* Fim - Form */}

                {/* Início Card-Resposta */}
                <div className="card">
                    <div className="card__content">
                    {/* Renderize os dados da API aqui */}
                        {responseData && (
                            <div className="retorno">
                                <p>
                                    <span>CEP: {responseData.cep}</span>
                                </p>
                                <p>
                                    <span>Logradouro: {responseData.logradouro}</span>
                                </p>
                                <p>
                                    <span>Bairro: {responseData.bairro}</span>
                                </p>
                                <p>
                                    <span>Cidade: {responseData.localidade}</span>
                                </p>
                                <p>
                                    <span>Estado: {responseData.uf}</span>
                                </p>
                                <p>
                                    <span>DDD: 0{responseData.ddd}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Fim Card-Resposta */}
            </div>
        </>
    )
}

export default SearchPage;