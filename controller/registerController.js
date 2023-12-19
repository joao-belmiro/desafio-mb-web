const fs = require('fs').promises; // Utilizamos a versão Promise do módulo fs
const path = require('path');
const validation = require('../public/utils/validation');
const { validateStepZero, validateStepOne, validateStepTwo } = validation
module.exports = {
  async loadRegisterForm(req, res) {
    try {
      const parentDir = path.resolve(__dirname, '..');
      const filePath = path.join(parentDir, 'views', 'form', 'index.html');
      const htmlContent = await fs.readFile(filePath, "utf8");

      res.writeHead(200, { 'Content-Type': 'text/html' });

      res.end(htmlContent);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro interno do servidor');
    }
  },
  async doRegister (req, res) {
    try {
      const data  = req.body
      let errors = []
      console.log(errors)
      const stepZeroValidate = validateStepZero(data.email);
      const stepOneValidate = validateStepOne(data.typeRegister, data.name, data.cpfCnpj, data.date, data.phone);
      const stepTwoValidate = validateStepTwo(data.password);

      if (Array.isArray(stepZeroValidate)) errors = errors.concat(stepZeroValidate);
      if (Array.isArray(stepOneValidate)) errors = errors.concat(stepOneValidate);
      if (Array.isArray(stepTwoValidate)) errors = errors.concat(stepTwoValidate);

      if (errors.length > 0)  {
        return res.status(400).json(errors)
      } else {
        await fs.writeFile('registers.json', JSON.stringify(data, null, 2));
        res.json({message: 'Resgistro salvo com sucesso'})
      }
    } catch (error) {
        res.status(500).json(error);
    }
  }
};
