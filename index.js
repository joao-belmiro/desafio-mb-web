const express = require('express');
const path = require('path');
const  registerController = require('./controller/registerController')
const { loadRegisterForm, doRegister } = registerController
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/registration', loadRegisterForm);
app.post('/registration', doRegister);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
