const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
} = require('./controllers/productController');

const {
    getSellers,
    getSeller,
    createSeller,
    deleteSeller,
    updateSeller,
    getSellerProduct
} = require('./controllers/sellerController')

const server = http.createServer((req, res) => {
  if (req.url === '/api/getProducts' && req.method === 'GET') {
    getProducts(req, res);
  }
  else if (req.url.match(/\/api\/getProducts\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  }
  else if (req.url === '/api/createProducts' && req.method === 'POST') {
    createProduct(req, res);
  }
  else if (req.url.match(/\/api\/deleteProducts\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id);
  }
  else if (req.url.match(/\/api\/updateProducts\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  }
  else if (req.url === '/api/getSellers' && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getSellers(req, res);
  }
  else if(req.url.match(/\/api\/getSeller\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getSeller(req, res, id)
  }
  else if(req.url === '/api/registerSeller' && req.method==='POST') {
    createSeller(req, res);
  }
  else if(req.url.match(/\/api\/deleteSeller\/\w+/) && req.method==='DELETE') {
    const id = req.url.split('/')[3];
    deleteSeller(req, res, id);
  }
  else if (req.url.match(/\/api\/updateSeller\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateSeller(req, res, id);
  }
  else if(req.url.match(/\/api\/getSellerProduct\/\w+/) && req.method==='GET') {
    const id = req.url.split('/')[3];
    getSellerProduct(req, res, id)
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;