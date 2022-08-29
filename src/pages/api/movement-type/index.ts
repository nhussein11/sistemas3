import { NextApiRequest, NextApiResponse } from 'next'

export default async function movementType(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const movementsTypes = await getMovementsTypes()
        return res.status(200).send({ movementsTypes })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { movementType, movementName, cause } = body
        const movementTypeCreated = await createMovementType(
          movementType,
          movementName,
          cause
        )
        return res.status(201).send({ movementTypeCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
