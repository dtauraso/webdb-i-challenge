const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(logger)
// crud

// read all(works)
server.get('/', (req, res) => {

    // res.send(`<h2>Let's write some middleware challenge!</h2>`);
    // db('accounts')
    db.select("*")
    .from("accounts")
    .then(accounts => {
        console.log('here', accounts)
        res.json(accounts)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get accounts' });

    })
})

// read ith record(works)
server.get('/:id', validateId, (req, res) => {

    // const { id } = req.params
    // validate user first
    console.log('got here')
    // res.send(`<h2>Let's write some middleware challenge!</h2>`);
    // db('accounts')
    db.select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
        console.log(account)
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get accounts' });

    })
})

// make new record(works)
server.post('/', (req, res) => {

    const { name, budget} = req.body
    if(!name || !budget) {
        res.status(500).json({ message: 'account info is invalid' });

    } else {
        // console.log({name: name, budget: budget})
        // insert can take an array
        db('accounts')
        .insert({name: name, budget: budget}, "id")
        .then(addedAccount => {
            res.status(200).json(addedAccount)
        })
        .catch(err => {
            // can't add an item w the same name as another item

            res.status(500).json({ message: 'Failed to update account' });

        })
    
    }

})
// update existing record(works)
server.put('/:id', validateId, validateAccount, (req, res) => {
    const { id } = req.params.id
    console.log(req.body)
    const { name, budget } = req.body

    // always filter on update and delete
    // apparently it's searching for records by name so to modify anything the name must match
    // an item in the table
    db("accounts")
        .where('id', '=', req.params.id)
        .update({name: name, budget: budget, id: id})
        .then(count => {
            res.status(200).json({message: `${count} record(s) updated`})
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to modify account' });

        })
})
// erase record(works)
server.delete('/:id', validateId, (req, res) => {
    console.log(req.params.id)
    db('accounts')
        .where({id: req.params.id}) // always filter on update and delete
        .del()
        .then(count => {
            res.status(200).json({message: `${count} record(s) updated`})
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete account' });

        })

})

function logger(req, res, next) {
    const { method, originalUrl } = req
    console.log(`${method} to ${originalUrl}`)
    next()
}

function validateId(req, res, next) {

    let id = req.params.id
    db('accounts')
        .count('name')
        .then(result => {
            // console.log(id, result[0]['count(`name`)'])
            if(id <= result[0]['count(`name`)'])
            {
                // console.log(result)
                next()
            } else {
                res.status(400).json({ message: "invalid id" })
            }
            // console.log(result[0])
        })

}

function validateAccount(req, res, next) {

    const { name, budget } = req.body

    if(!name || !budget) {
        res.status(500).json({ message: 'account info is invalid' });

    } else {
        db.select("*")
        .from("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            next()
        })
        .catch(err => {
            res.status(500).json({ message: 'account info is invalid' });

        })
        
    }
}

module.exports = server;