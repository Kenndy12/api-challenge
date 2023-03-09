let products = require('../data/data.json')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return products.find(p => p.id === id)
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {...product}
        products.push(newProduct)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/data.json', products);
        }
        resolve(newProduct)
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/data.json', products);
        }
        resolve()
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/data.json', products);
        }
        resolve(products[index])
    })
}

module.exports = {
    findAll,
    findById,
    create,
    remove,
    update
}