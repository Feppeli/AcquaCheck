const User = require('../database/models/UserModels')


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        return res.status(200).json(allUsers)
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuários' })
    }
}

// Função REVISADA para Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            // Mensagem de erro padrão para segurança
            return res.status(401).json({ message: 'Credenciais inválidas.' })
        }
        

        // 🛑 DEBUG: Adicione estes logs temporariamente
       
        // ======================================

        // Validação da Senha encryptada (Lembre-se que o método validPassword deve estar no seu modelo)
        const isMatch = await user.validPassword(password); // Usando a variável 'password'
        console.log('Senha enviada pelo Frontend:', password);
        console.log('Hash da senha no Banco:', user.password);
        console.log('Resultado do validPassword (isMatch):', isMatch);

        
        if (isMatch) {
            const userResponse = user.toJSON();
            delete userResponse.password // Remove o hash da senha

            // 🛑 CORRIGIDO: Retornar o objeto userResponse (limpo)
            return res.status(200).json(userResponse)
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas.' })
        }

    } catch (err) {
        console.error("Erro no login:", err);
        return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
}

const postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
        })

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: newUser })
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário.' })
    }
}


const putUser = async (req, res) => {
    try {
        const userId = req.params.id
        const dataUser = req.body;

        const [newData] = await User.update(dataUser, {
            where: { id: userId }
        })

        if (newData === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        res.status(200).json({ message: 'Registro atualizado com sucesso' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o registro' });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        const userDeleted = await User.destroy({
            where: {
                id: userId
            }
        })

        if (userDeleted == null) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }

        return res.status(200).json({ message: 'Registro deletado com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o registro' });
    }
}

module.exports = {
    loginUser,
    getAllUsers,
    postUser,
    putUser,
    deleteUser
}