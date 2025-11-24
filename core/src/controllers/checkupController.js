const Check = require('../database/models/checkupModel')


const getAllCheckers = async (req, res) => {
    try {
        const allCheckers = await Check.findAll();
        return res.status(200).json(allCheckers)
    }catch(err){
        return res.status(500).json({message: 'Erro ao buscar os Checkups'})
    }

}

const getCheck = async (req, res) => {
    try {
        const check = await Check.findByPk(req.params.id)
    }catch(err){
        return res.status(500).json({ message: 'erro ao buscar o ckeckup'})
    }
}

const postCheck = async (req, res) => {
    try{
        const {local, problems, component, description} = req.body;

        const newCheck = await Check.create({
            local,
            problems,
            component,
            description
        })

        return res.status(201).json({message: "Usuário cadastrado com sucesso!", user: newCheck})
    }catch(err){
        console.log('Erro ao cadastrar usuário:', err)
        return res.status(500).json({message: "Erro ao cadastrar usuário"})
    }
}

const editCheck = async (req, res) => {
    try{
        const {id} = req.params
        const dataCheck = req.body;

        const [newData] = await Check.update(dataCheck, {
            where: {id: id}
        })

        if (newData === 0){
            return res.status(404).json({message: 'Registro não encontrado'});
        }

        res.status(200).json({message: 'Registro atualizado com sucesso'});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao atualizar o registro'});
    }
}

module.exports = {
    getCheck,
    getAllCheckers,
    postCheck,
    editCheck
}