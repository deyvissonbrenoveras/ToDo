class UserController {
  async index(req, res) {
    res.send(['Todo1', 'Todo2']);
  }
  //   async show(req, res) {}
  //   async store(req, res) {}
  //   async update(req, res) {}
  //   async delete(req, res) {}
}

export default new UserController();
