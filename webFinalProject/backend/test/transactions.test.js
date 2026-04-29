const { expect } = require('chai');
const supertest = require('supertest');
const request = supertest('http://localhost:5000'); 

describe('Transactions API', () => {
    // Test for GET 
    it('should return all transactions', async () => {
        const res = await request.get('/transactions');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // Test for DELETE 
    it('should delete an existing transaction', async () => {
        // Create transaction to delete
        const newTx = await request.post('/transactions').send({
            amount: 20,
            type: 'expense',
            category: 'entertainment',
            date: '2026-04-29',
            description: 'Movie ticket'
        });

        const transactionId = newTx.body._id;

        // Delete transaction
        const deleteRes = await request.delete(`/transactions/${transactionId}`);
    
        // Assertions
        expect(deleteRes.status).to.equal(204); 

        // make sure it's actually gone
        const verifyRes = await request.get('/transactions');
        const ids = verifyRes.body.map(t => t._id);
        expect(ids).to.not.include(transactionId);
    });

    // Test DELETE with non-existent ID
    it('should return 404 when deleting an ID that doesn’t exist', async () => {
        const fakeId = '65f1234567890abcdef12345'; 
        const res = await request.delete(`/transactions/${fakeId}`);
        expect(res.status).to.equal(404);
    });


    // Test POST 
    it('should create a new transaction', async () => {
        const payload = {
            amount: 50,
            type: 'expense',
            category: 'food',
            date: '2026-04-29',
            description: 'Lunch'
        };
        const res = await request.post('/transactions').send(payload);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
    });
});