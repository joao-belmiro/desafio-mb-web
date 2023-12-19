const isNotBlank = (value) => {
    return typeof value === 'string' && value.trim() !== '';
}
module.exports = {   
    validateStepZero: (email) => {
        const emailvalidate = isNotBlank(email) && email !== null ? true : ['o campo de e-mail é obrigatório']
        return emailvalidate 
    },

    validateStepOne: (typeRegister, name, cpfCnpj, date, phone) => {
        const errors = [] 
        const nameValidate = isNotBlank(name) ? true : `O campo ${typeRegister == 'PF'? 'nome': 'razão social'} é obrigatório`
        const cpfCnpjValidate = isNotBlank(cpfCnpj) ? true : `O campo ${typeRegister == 'PF'? 'CPF': 'CNPJ'} é obrigatório`
        const dateValidate = isNotBlank(date) && date ? true : `O campo ${typeRegister == 'PF'? 'data de nascimento': 'data de abertura'} é obrigatório`
        const phoneValidate = isNotBlank(phone) ? true : 'o campo de telefone é obrigatório'

        if (nameValidate !== true) errors.push(nameValidate)
        if (cpfCnpjValidate !== true) errors.push(cpfCnpjValidate)
        if (dateValidate !== true ) errors.push(dateValidate)
        if (phoneValidate !== true ) errors.push(phoneValidate)

        return errors.length == 0 ? true : errors
    },

    validateStepTwo: (password) => {
        const validatePass = isNotBlank(password) && password ? true : ['O campo de senha é obrigatório']
        return validatePass
    }
}