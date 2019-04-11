/**
 * @swagger
 *
 *  parameters:
 *      beforeId:
 *          name: beforeId
 *          description: ID of an item. Only items older than it will be returned.
 *          in: query
 *          required: false
 *          type: number
 *      limit:
 *          name: limit
 *          description: Max. amount of items to return.
 *          in: query
 *          required: false
 *          type: number
 *          default: 20
 *          minimum: 0
 *          maximum: 100
 */
