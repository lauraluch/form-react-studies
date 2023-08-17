const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o módulo cors

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors para todas as rotas

const users = [];

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  // Registre o usuário (salve em algum lugar)
  users.push({ email, name, password });
//   console.log(users)
  res.json({ message: 'Cadastro realizado com sucesso' });

});

app.post('/delete-user', (req, res) => {
  const { email } = req.body;
  const userExists = users.some(user => user.email === email);

  if (!userExists) {
    return res.status(400).json({ error: 'Email não cadastrado' });
  }

  users.forEach(user => {
    if (user.email === email){
      users.splice(users.indexOf(user), 1)
    }
  });

  res.json({message: 'Usuário removido'})
})

app.post('/edit-user', (req, res) =>{
  const { email, name } = req.body;
  console.log("email:", email)
  console.log("nome:", name)

  const userExists = users.some(user => user.email === email);

  if (!userExists) {
    return res.status(400).json({ error: 'Email não cadastrado' });
  }

  users.forEach(user => {
    if (user.email === email){
      user.name = name;
    }

    res.json({message: "Usuário editado"})
  });


})

app.get('/check-email/:email', (req, res) => {
  const { email } = req.params;
  const userExists = users.some(user => user.email === email);
  res.json({ exists: userExists });
});

app.get('/get-users', (req, res) => {
    res.json(users);
  });

app.get('/get-user-by-email', (req, res) => {
  const userEmail = req.query.email; // Pega o email da query da URL

  if (!userEmail) {
    return res.status(400).json({ error: 'O email do usuário é necessário na consulta.' });
  }

  const user = users.find(user => user.email === userEmail);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  res.json(user);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
