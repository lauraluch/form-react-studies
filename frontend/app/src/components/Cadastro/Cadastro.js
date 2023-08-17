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

        await getList();
    
        const registerData = await registerResponse.json();
        console.log(registerData.message);
    };


    const handleEditar = async (e, email) => {
        e.preventDefault();

        const user = await fetch(`http://localhost:3001/get-user-by-email?email=${email}`)
        const userData = await user.json();

        setUser({
          name: userData.name,
          email: email,
          password: userData.password,
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

    const saveEdit = async (e, email, name) => {
        e.preventDefault()
        await fetch('http://localhost:3001/edit-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, name: name }),
        });
        await getList();
        closeModal();
    }

    const handleDeletar = async (e, userEmail) => {
        e.preventDefault();
    
        await fetch('http://localhost:3001/delete-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });
    
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
                className={"modal-edit"}
            >
                <h2>Editar Usuário</h2>
                <form className="modal-form">
                <div className="title-input">
                    <label>Nome:</label>
                    <input
                    className="input"
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleInputChange}
                    />
                </div>
                {/* <div className="title-input">
                    <label>Email:</label>
                    <input
                    className="input"
                    type='email'
                    name='email'
                    value={user.email}
                    readOnly
                    />
                </div>
                <div className="title-input">
                    <label>Senha:</label>
                    <input
                    className="input"
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleInputChange}
                    />
                </div> */}
                <div className="container-btns">
                    <button className="btn" type='submit' onClick={(e) => saveEdit(e, user.email, user.name)}>Salvar</button>
                    <button className="btn" onClick={closeModal}>Fechar</button>
                </div>
                </form>
            </Modal>
        </div>
    </div>
      
      )
}


export default Cadastro