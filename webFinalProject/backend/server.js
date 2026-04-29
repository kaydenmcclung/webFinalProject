const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: { cors: true }
    });

    // In-memory data store
    let transactions = [];

    console.log('Building CRUD routes...');

    // 1. READ ALL (GET)
    server.route({
        method: 'GET',
        path: '/transactions',
        handler: (request, h) => {
            return transactions;
        }
    });

    // 2. CREATE (POST)
    server.route({
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
                }),
                failAction: (request, h, err) => { throw err; }
            }
        },
        handler: (request, h) => {
            const transaction = { id: Date.now().toString(), ...request.payload };
            transactions.push(transaction);
            return h.response(transaction).code(201);
        }
    });

    // 3. UPDATE (PUT)
    server.route({
        method: 'PUT',
        path: '/transactions/{id}',
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: Joi.object({
                    amount: Joi.number().positive(),
                    type: Joi.string().valid('income', 'expense'),
                    category: Joi.string(),
                    date: Joi.date().iso(),
                    description: Joi.string().allow('').max(255)
                }),
                failAction: (request, h, err) => { throw err; }
            }
        },
        handler: (request, h) => {
            const index = transactions.findIndex(t => t.id === request.params.id);
            if (index === -1) {
                return h.response({ message: 'Transaction not found' }).code(404);
            }
            // Merge existing transaction with updates
            transactions[index] = { ...transactions[index], ...request.payload };
            return transactions[index];
        }
    });

    // 4. DELETE (DELETE)
    server.route({
        method: 'DELETE',
        path: '/transactions/{id}',
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                failAction: (request, h, err) => { throw err; }
            }
        },
        handler: (request, h) => {
            const initialLength = transactions.length;
            transactions = transactions.filter(t => t.id !== request.params.id);
            
            if (transactions.length === initialLength) {
                return h.response({ message: 'Transaction not found' }).code(404);
            }
            return h.response().code(204); // Success, no content
        }
    });

    try {
        await server.start();
        console.log('✅ Full CRUD API live at:', server.info.uri);
    } catch (err) {
        console.error('❌ Failed to start:', err);
        process.exit(1);
    }
};

init();