// const express = require('express');
// const app = express();

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

// app.listen(3000, ()=> {
//     console.log('listening on port 3000');
// })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o módulo cors

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors para todas as rotas

const users = [];


app.get('/check-email/:email', (req, res) => {
  const { email } = req.params;
  const userExists = users.some(user => user.email === email);
  res.json({ exists: userExists });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  // Registre o usuário (salve em algum lugar)
  users.push({ email, password });
//   console.log(users)
  res.json({ message: 'Cadastro realizado com sucesso' });

});

app.get('/get-users', (req, res) => {
    res.json(users);
  });


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
