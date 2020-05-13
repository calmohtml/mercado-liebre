const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic
		res.render('index', { products, toThousand })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let productDetail = products.find(product => product.id == req.params.productId)
		res.render('detail', { productDetail, toThousand  })
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let productToStore = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: 'default-image.png'
		}
		let newDB = [...products, productToStore]
		fs.writeFileSync(productsFilePath, JSON.stringify(newDB, null, ' '))
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productFound = products.find(product => product.id == req.params.productId)
		res.render('product-edit-form', { productFound, toThousand  })
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		/*let idProduct = req.params.productId;
		let dbToModify = []
		products.forEach(product => {
			if (product.id == idProduct) {
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
				product.image = 'default-image.png'
				dbToModify.push(product)
			} else {
				dbToModify.push(product)
			}
		});
		//let dbToModifyJSON = 
		fs.writeFileSync(productsFilePath, JSON.stringify(dbToModify, null, ' '))
		res.send(req.body)*/
			let idProduct = req.params.productId
			let dbToModify = []
	
			products.forEach(product => {
			if(product.id == idProduct){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
				product.image = "default-image.png"
				dbToModify.push(product)
			} else {
				dbToModify.push(product)
			}
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(dbToModify, null, ' '))
		res.redirect('/')
		
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		let idProduct = req.params.productId
		let productNoArticle = products.filter(product => product.id != idProduct)
		let productNoArticleJS = JSON.stringify(productNoArticle)
		fs.writeFileSync(productsFilePath, productNoArticleJS)
		res.redirect('/')
	}
};

module.exports = controller;

// Spread operator