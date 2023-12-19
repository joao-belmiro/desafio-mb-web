import {
  createApp,
  ref,
} from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js';
const isNotBlank = (value) => {
  return typeof value === 'string' && value.trim() !== '';
};
const validateStepZero = (email) => {
  const emailvalidate =
    isNotBlank(email) && email !== null
      ? true
      : ['o campo de e-mail é obrigatório'];
  return emailvalidate;
};

const validateStepOne = (typeRegister, name, cpfCnpj, date, phone) => {
  const errors = [];
  const nameValidate = isNotBlank(name)
    ? true
    : `O campo ${typeRegister == 'PF' ? 'nome' : 'razão social'} é obrigatório`;  
  const cpfCnpjValidate = isNotBlank(cpfCnpj)
    ? true
    : `O campo ${typeRegister == 'PF' ? 'CPF' : 'CNPJ'} é obrigatório`;
  const dateValidate =
    isNotBlank(date) && date
      ? true
      : `O campo ${
          typeRegister == 'PF' ? 'data de nascimento' : 'data de abertura'
        } é obrigatório`;
  const phoneValidate = isNotBlank(phone)
    ? true
    : 'o campo de telefone é obrigatório';

  if (nameValidate !== true) errors.push(nameValidate);
  if (cpfCnpjValidate !== true) errors.push(cpfCnpjValidate);
  if (dateValidate !== true) errors.push(dateValidate);
  if (phoneValidate !== true) errors.push(phoneValidate);

  return errors.length == 0 ? true : errors;
};

const validateStepTwo = (password) => {
  const validatePass =
    isNotBlank(password) && password
      ? true
      : ['O campo de senha é obrigatório'];
  return validatePass;
};
const titles = [
  'Seja bem vindo(a)',
  {
    PF: 'Pessoa Física',
    PJ: 'Pessoa Jurídica',
  },
  'Senha de Acesso',
  'Revise suas informações',
];
createApp({
  setup() {
    const step = ref(0);
    const typeRegister = ref('PF');
    const email = ref('');
    const cpfCnpj = ref('');
    const name = ref('');
    const date = ref('');
    const phone = ref('');
    const password = ref('');

    const getTitle = function (step, typeRegister) {
      return step != 1 ? titles[step] : titles[step][typeRegister];
    };

    const firstStep = function (email) {
      const validate = validateStepZero(email);
      if (validate == true) step.value++;
      if (Array.isArray(validate)) alert(validate.join('\n'));
    };

    const secondStep = function (typeRegister, name, cpfCnpj, date, phone) {
      const validate = validateStepOne(
        typeRegister,
        name,
        cpfCnpj,
        date,
        phone
      );
      if (validate == true) step.value++;
      if (Array.isArray(validate)) alert(validate.join('\n'));
    };

    const thirdStep = function (password) {
      const validate = validateStepTwo(password);
      if (validate == true) step.value++;
      if (Array.isArray(validate)) alert(validate.join('\n'));
    };

    const register = async function (
      email,
      typeRegister,
      name,
      cpfCnpj,
      date,
      phone,
      password
    ) {
      let errors = [];
      const stepZeroValidate = validateStepZero(email);
      const stepOneValidate = validateStepOne(
        typeRegister,
        name,
        cpfCnpj,
        date,
        phone
      );
      const stepTwoValidate = validateStepTwo(password);

      if (Array.isArray(stepZeroValidate)) errors = errors.concat(stepZeroValidate);
      if (Array.isArray(stepOneValidate)) errors = errors.concat(stepOneValidate);
      if (Array.isArray(stepTwoValidate)) errors = errors.concat(stepTwoValidate);

      if (errors.length > 0) {
        alert(errors.join('\n'));
      } else {
        const data = {
          email: email,
          typeRegister: typeRegister,
          name: name,
          cpfCnpj: cpfCnpj,
          date: date,
          phone: phone,
          password: password,
        };
        const response = await fetch('/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.error('Erro:', error);
            console.log('Detalhes do erro:', error.message);
            return error;
          });
          if (response.ok) {
            let data = await response.json()
            alert(data.message)
          }
          if(response.status === 400) {
            let data = await response.json()
            let message = data.join('\n')
            alert(message)
          }
      }
    };

    return {
      typeRegister,
      email,
      cpfCnpj,
      name,
      date,
      phone,
      password,
      step,
      getTitle,
      firstStep,
      secondStep,
      thirdStep,
      register,
    };
  },
}).mount('#app');
