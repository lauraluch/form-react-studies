import React, { useState, useEffect } from 'react';

function Listar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/get-users'); // Endpoint para obter a lista de usuários
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className='user-list'>
      <h3>Lista de Usuários Cadastrados</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listar;