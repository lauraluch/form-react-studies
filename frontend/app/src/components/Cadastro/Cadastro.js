import { useState } from "react"
import './styles.css';
      
function Cadastro() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState([]);


    // const handleCadastro = async (e) => {
    //     e.preventDefault();
    //     console.log('teste')
    // }

    // const handleCadastro = async (e) => {
    //     e.preventDefault();
      
    //     const registerResponse = await fetch('/register', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email, password }),
    //     });
      
    //     const registerData = await registerResponse.json();
    //     console.log(registerData.message);

    //     const userListResponse = await fetch('/get-users');
    //     const userListData = await userListResponse.json();
    //     setUserList(userListData);
    //   };

    const handleCadastro = async (e) => {
        e.preventDefault();
    
        const registerResponse = await fetch('http://localhost:3001/register', { // Atualize a URL aqui
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        const registerData = await registerResponse.json();
        console.log(registerData.message);
    
        const userListResponse = await fetch('http://localhost:3001/get-users');
        const userListData = await userListResponse.json();
        setUserList(userListData);
        console.log("aaaaa", userListData)
    };
    
    
    
    
    


return (
    <div className="container">
        <div className='login-form'>
            <form className='login-form-wrap'>
            <h3>Cadastre-se</h3>
            <div className="title-input">
                <h4 className='subtitulo'>Insira seu e-mail: </h4>
                <input className="input" type='email' placeholder='email@email.com' 
                    value={email} // Adicione esta linha
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="title-input">
                <h4 className='subtitulo'>Insira sua senha: </h4>
                <input type='password' className="input" placeholder='********'
                    value={password} // Adicione esta linha
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type='submit' className='btn-login' onClick={(e) => handleCadastro(e)}>Cadastre-se</button>
            </form>
        </div>

        <div className='login-form'>
            <h3>Lista de usuários</h3>
            <ul>
                {userList.map((user, index) => (
                <li key={index}>{user.email}</li>
                ))}
            </ul>
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
      
      )
}


export default Cadastro