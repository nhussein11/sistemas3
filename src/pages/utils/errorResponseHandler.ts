import { NextApiResponse } from 'next'

const errorHandler = (res: NextApiResponse, error: Error | any) => {
  switch (error.code) {
    case 'P2003':
      return res.status(401).send({
        error,
        messageError:
          'You cannot delete this register because referential integrity'
      })
    case 'P2025':
      return res.status(402).send({
        error,
        messageError: 'Id not provided'
      })
    default:
      return res.status(500).send({
        error,
        messageError: error.message
      })
  }
}
export { errorHandler }
