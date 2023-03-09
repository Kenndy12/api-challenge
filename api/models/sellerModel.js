let sellers = require('../data/seller.json')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(sellers)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const seller = sellers.find((p) => p.sellerId === id)
        resolve(seller)
    })
}

function create(sellerInfo) {
    return new Promise((resolve, reject) => {
        const newSeller = {...sellerInfo}
        sellers.push(newSeller)
        if(process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/seller.json', sellers)
        }
        resolve(newSeller)
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        sellers = sellers.filter((data) => data.sellerId!==id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/seller.json', sellers);
        }
        resolve()
    })
}

function update(id, sellerData) {
    return new Promise((resolve, reject) => {
        const index = sellers.findIndex((p) => p.sellerId === id)
        let sellerId = id;
        sellers[index] = {sellerId, ...sellerData}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/seller.json', sellers);
        }
        resolve(sellers[index])
    })
}

function getMerchId(id) {
    return new Promise((resolve, reject) => {
        const seller = sellers.find((p) => p.sellerId === id)
        resolve(seller.merchandise)
    })
}

module.exports = {
    findAll,
    findById,
    create,
    remove,
    update,
    getMerchId
}