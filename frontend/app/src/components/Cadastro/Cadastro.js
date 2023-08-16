import { useState } from "react"
import './styles.css';
      
function Cadastro() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState([]);
    
    const getList = async () => {
        const userListResponse = await fetch('http://localhost:3001/get-users');
        const userListData = await userListResponse.json();
        setUserList(userListData);
    }

    getList();

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
          body: JSON.stringify({ email, password }),
        });
    
        const registerData = await registerResponse.json();
        // console.log(registerData.message);

        

        // console.log("aaaaa", userListData)
    };
    
    const handleEdicao = async (e, userEmail) => {
        e.preventDefault();
        
        const user = await fetch(`http://localhost:3001/get-user-by-email?email=${userEmail}`)
        const userData = await user.json();

        console.log("USUARIO: ", userData)
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
                <ul className="user-list">
                    {userList.map((user, index) => (
                        <div className="list-item">
                        <p>{user.email}</p>
                            <div className="container-btns">
                                <button className='btn' onClick={(e) => handleEdicao(e, user.email)}>
                                    <li key={index}>Editar</li>
                                </button>
                                <button className='btn' onClick={(e) => handleDeletar(e, user.email)}>
                                    <li key={index}>Deletar</li>
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
                {/* </div> */}
            </div>

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