class Base {
  constructor() {}

  index = async (req, res, next) => {
    const resources = await this.model.find({})
    return res.status(200).json(this.apiSend(resources))
  }

  get = async (req, res, next) => {
    const resource = await this.model.findById(req.params.id)
      .orFail(new NotFoundError());
    return res.status(200).json(this.apiSend(resource))
  }

  create = async (req, res) => {
    const { ...body } = req.body
    const resource = await this.model.create(body)
    return res.status(200).json(this.apiSend(resource))
  }

  apiSend = (json) => {
    return {
      data: json
    }
  }
}

module.exports = Base;