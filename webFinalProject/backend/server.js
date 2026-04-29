const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {
  const server = Hapi.server({ port: 5000, host: 'localhost', routes: { cors: true } });

  // In-memory DB (replace with a real DB later)
  let transactions = [];

  server.route([
    // CREATE
    {
      method: 'POST',
      path: '/transactions',
      options: {
        validate: {
          payload: Joi.object({
            amount: Joi.number().positive().required(),
            type: Joi.string().valid('income', 'expense').required(),
            category: Joi.string().required(),
            date: Joi.date().iso().required(),
            description: Joi.string().allow('').max(255)
          })
        }
      },
      handler: (request, h) => {
        const transaction = { id: Date.now().toString(), ...request.payload };
        transactions.push(transaction);
        return h.response(transaction).code(201);
      }
    },
    // READ (ALL)
    {
      method: 'GET',
      path: '/transactions',
      handler: () => transactions
    },
    // UPDATE
    {
      method: 'PUT',
      path: '/transactions/{id}',
      options: {
        validate: {
          params: Joi.object({ id: Joi.string().required() }),
          payload: Joi.object({
            amount: Joi.number().positive(),
            type: Joi.string().valid('income', 'expense'),
            category: Joi.string(),
            date: Joi.date().iso(),
            description: Joi.string().allow('')
          })
        }
      },
      handler: (request, h) => {
        const index = transactions.findIndex(t => t.id === request.params.id);
        if (index === -1) return h.response({ message: 'Not Found' }).code(404);
        transactions[index] = { ...transactions[index], ...request.payload };
        return transactions[index];
      }
    },
    // DELETE
    {
      method: 'DELETE',
      path: '/transactions/{id}',
      handler: (request, h) => {
        const initialLength = transactions.length;
        transactions = transactions.filter(t => t.id !== request.params.id);
        return transactions.length < initialLength ? h.response().code(204) : h.response({ message: 'Not Found' }).code(404);
      }
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};