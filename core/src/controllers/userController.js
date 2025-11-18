const User = require('../database/models/UserModels')


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        return res.status(200).json(allUsers)
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuários' })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
}

const postUser = async (req, res) => {
    try {
        const { name, email, password, status, admin } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
            status,
            admin
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
            where:{
                id: userId
            }
        })

        if (userDeleted == null){
            return res.status(404).json({ message: "Registro não encontrado" });
        }

        return res.status(200).json({message: 'Registro deletado com sucesso!'})
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o registro' });
    }
}

module.exports = {
    getUser,
    getAllUsers,
    postUser,
    putUser,
    deleteUser
}