import * as Yup from 'yup';

import Todo from '../models/Todo';

class TodoController {
  async index(req, res) {
    const todos = await Todo.findAll({ where: { user_id: req.userId } });
    return res.json(todos);
  }

  async show(req, res) {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    if (todo.userId !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para visualizar essa tarefa' });
    }

    return res.json(todo);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required().min(5),
      description: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Tarefa não validada' });
    }

    const todo = await Todo.create({
      ...req.body,
      userId: req.userId,
    });

    return res.json(todo);
  }

  async update(req, res) {
    const { title, description } = req.body;

    // Validate title and description if sent
    if (title || description) {
      const schema = Yup.object().shape({
        title: Yup.string().required().min(5),
        description: Yup.string().required().min(5),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Tarefa não validada' });
      }
    }

    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    if (todo.userId !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para atualizar essa tarefa' });
    }
    await todo.update(req.body);

    return res.json(todo);
  }

  async delete(req, res) {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    if (todo.userId !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para excluir essa tarefa' });
    }

    await todo.destroy();
    return res.json({ message: 'Tarefa excluída' });
  }
}

export default new TodoController();
