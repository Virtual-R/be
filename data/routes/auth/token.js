describe('API test token', () => {
    let token;

    before((done) => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser1', password: 'testpassword1'})
            .end((err, res) => {
                token = res.body.token;
                done()
            })
        }) 
    })