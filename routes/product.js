const express = require('express');
const router = express.Router();
const Products = require('../store/Products');
const Comment = require('../store/Comment');

router.get('/:id', function (req, res) {
    Products.getWhere(req.params.id)
        .then(function (product) {
            Comment.find(null, function(err, comments){
                if (err){
                    throw err;
                }
                res.render('editProduct', { title: 'Editando o produto', rotina: 'Editando Produto', product, comments });
            });             
        });
});

router.delete('/:id', function (req, res) {
    try {
        Products.getWhere(req.params.id)
            .then(function (product) {
                Products.delete(product[0])
                    .then(function () {
                        res.status(200).send('Produto excluido com sucesso');
                    });
            });
    }
    catch (e) {
        res.status(500).send('Produto não localizado para ser excluido');
    }
});

router.post('/', function (req, res) {
    try {
        var produto = JSON.parse(req.body.dataJson);
        Products.insert(produto)
            .then(function (product) {
                res.status(200).send('Produto incluido com sucesso!');
            });
    }
    catch (e) {
        res.status(500).send('Erro ao incluir o produto');
    }
});

router.put('/', function (req, res) {
    try {
        var produto = JSON.parse(req.body.dataJson);
        Products.update(produto)
            .then(function (product) {
                res.status(200).redirect('/');
            });
    }
    catch (e) {
        res.status(500).send('Erro ao alterar o produto');
    }
});

module.exports = router;

