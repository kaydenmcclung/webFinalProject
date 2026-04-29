const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const init = async () => {
    const localUri = 'mongodb://127.0.0.1:27017/expense_tracker';

    await mongoose.connect(localUri)
        .then(() => console.log('✅ Connected to Local MongoDB'))
        .catch(err => {
            console.error('❌ Local connection error:', err);
            process.exit(1);
        });

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: { cors: true }
    });

    console.log('Building CRUD routes...');

    // 1. READ ALL (GET)
    server.route({
        method: 'GET',
        path: '/transactions',
        handler: async (request, h) => {
            return await Transaction.find().sort({ date: -1 });
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
        handler: async (request, h) => {
            const newTransaction = new Transaction(request.payload);
            const saved = await newTransaction.save();
            return h.response(saved).code(201);
        }
    });

    // DELETE (DELETE)
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
         handler: async (request, h) => {
                const result = await Transaction.findByIdAndDelete(request.params.id);
                return result ? h.response().code(204) : h.response({ message: 'Not Found' }).code(404);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();