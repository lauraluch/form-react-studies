import { useState } from "react"
import './styles.css';
import Modal from 'react-modal';
import PopUpEdicao from "../PopUpEdicao/PopUpEdicao.js";
      
function Cadastro() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState([]);
    
    Modal.setAppElement('#root');

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
      });
      
      const [modalIsOpen, setModalIsOpen] = useState(false);

    const getList = async () => {
        const userListResponse = await fetch('http://localhost:3001/get-users');
        const userListData = await userListResponse.json();
        setUserList(userListData);
    }

    // getList();

    const handleCadastro = async (e) => {
        e.preventDefault();
    
        const checkUserResponse = await fetch(`http://localhost:3001/check-email/${email}`);
        const checkUserResponseData = await checkUserResponse.json();
        // console.log('RESPOSTA: ', checkUserResponseData);

        if (checkUserResponseData.exists){
            console.log(`Esse usuário já existe`)
            return
        }


        const registerResponse = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, password }),
        });

        getList();
    
        const registerData = await registerResponse.json();
        // console.log(registerData.message);

        

        // console.log("aaaaa", userListData)
    };
    
    // const handleEditar = async (e, userEmail) => {
    //     e.preventDefault();
        
    //     const user = await fetch(`http://localhost:3001/get-user-by-email?email=${userEmail}`)
    //     const userData = await user.json();

    //     console.log("USUARIO: ", userData)
    // };

    const handleEditar = (e, email) => {
        e.preventDefault();
        // Aqui você pode implementar a lógica para buscar o usuário com o email fornecido
        // e definir os dados no estado 'user'
        // Exemplo fictício:
        setUser({
          name: 'Nome do Usuário',
          email: email,
          password: 'Senha do Usuário',
        });
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };

    const handleDeletar = async (e, userEmail) => {
        e.preventDefault();
    
        await fetch('http://localhost:3001/delete-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }), // Usar userEmail aqui
        });
    
        // Atualizar a lista de usuários após a exclusão
        await getList();
    }

return (
    <div>
        <div className="container">
            <div className='login-form'>
                <form className='login-form-wrap'>
                <h3>Cadastre-se</h3>
                <div className="title-input">
                    <h4 className='subtitulo'>Insira seu e-mail: </h4>
                    <input className="input" type='email' placeholder='email@email.com' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="name-input">
                    <h4>Insira seu nome:</h4>
                    <input className="input" type='text' placeholder='nome' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="title-input">
                    <h4 className='subtitulo'>Insira sua senha: </h4>
                    <input type='password' className="input" placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type='submit' className='btn-login' onClick={(e) => handleCadastro(e)}>Cadastre-se</button>
                </form>
            </div>

            <div className='login-form'>
                {/* <div className="list-container"> */}
                <h3>Lista de usuários</h3>
                <div className="list-titles">
                    <div className="title-group">
                        <p>E-mail</p>
                        <p>Nome</p>
                    </div>
                    <p>Ações</p>
                </div>
                <div className="user-list">
                    {userList.map((user, index) => (
                        <div className="list-item">
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                            <div className="container-btns">
                                <button className='btn' onClick={(e) => handleEditar(e, user.email)}>
                                    <li key={index}>Editar</li>
                                </button>
                                {/* <PopUpEdicao user={user}/> */}
                                {/* <button className='btn' onClick={(e) => handleEdicao(e, user.email)}>
                                    <li key={index}>Editar</li>
                                </button> */}
                                <button className='btn' onClick={(e) => handleDeletar(e, user.email)}>
                                    <li key={index}>Deletar</li>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Editar Usuário'
            >
                <h2>Editar Usuário</h2>
                <form>
                <div>
                    <label>Nome:</label>
                    <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                    type='email'
                    name='email'
                    value={user.email}
                    readOnly
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleInputChange}
                    />
                </div>
                <button onClick={closeModal}>Fechar</button>
                <button type='submit'>Salvar</button>
                </form>
            </Modal>

            {/* <div className='login-form'>
                <form className='login-form-wrap'>
                <h3>Editar usuários</h3>
                <div className="title-input">
                    <h4 className='subtitulo'>Insira seu e-mail: </h4>
                    <input className="input" type='email' placeholder='email@email.com'/>
                </div>
                <div className="title-input">
                    <h4 className='subtitulo'>Insira sua senha: </h4>
                    <input type='password' className="input" placeholder='********'/>
                </div>

                <button type='submit' className='btn-login' onClick={(e) => handleCadastro(e)}>Cadastre-se</button>
                </form>
            </div> */}
        </div>
    </div>
      
      )
}


export default Cadastro