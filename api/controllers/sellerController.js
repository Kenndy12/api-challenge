const Seller = require('../models/sellerModel')
const { getPostData } = require('../utils')
const { getProduct } = require('./productController')
const { findById } = require('../models/productModel')

// @desc    Gets All Products
// @route   GET /api/products
async function getSellers(req, res) {
    try {
        const seller = await Seller.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(seller))
    } catch (error) {
        console.log(error)
    }
}

async function getSeller(req, res, id) {
    try {
        const seller = await Seller.findById(id)

        if(!seller) {
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: `Seller with id ${id} not found`}))
        } else {
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(seller));
        }
    } catch (error) {
        console.log(error);
    }
}

async function createSeller(req, res) {
    try {
        const body = await getPostData(req);

        const { sellerId, name, address, merchandise } = JSON.parse(body)
        
        const sellerInfo = {
            sellerId,
            name, 
            address,
            merchandise
        }

        const newSeller = await Seller.create(sellerInfo)
        res.end(JSON.stringify(`Seller has been created`))
    } catch (error) {
        console.log(error);
    }
}

async function deleteSeller(res,res,id) {
    try {
        const seller = await Seller.findById(id);

        if(!seller) {
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: `Seller with id ${id} not found`}))
        } else {
            await Seller.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Seller with ${id} removed` }))
        }
    } catch (error) {
        console.log(error);
    }
}
async function updateSeller(req, res, id) {
    try {
        const seller = await Seller.findById(id)

        if(!seller) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Seller Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, address, merchandise } = JSON.parse(body)

            const sellerData = {
                name: name || seller.name,
                address: address || seller.address,
                merchandise: merchandise || seller.merchandise,
            }

            const updSeller = await Seller.update(id, sellerData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updSeller)) 
        }
    } catch (error) {
        console.log(error)
    }
}

async function getSellerProduct(req, res, id) {
    try {
        const merchandise = await Seller.getMerchId(id)
        if(!merchandise) {
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: `merchandise with id ${id} not found`}))
        } else {
            res.writeHead(200, {'Content-Type':'application/json'})
            for(const element of merchandise) {
                res.write(JSON.stringify(await findById(element.toString())))
            }
            res.end()
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getSellers,
    getSeller,
    createSeller,
    deleteSeller,
    updateSeller,
    getSellerProduct
}