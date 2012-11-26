

var express = require('express');
var app = express();
app.set('title', 'Meu Site');

app.use(express.compress());
app.get('/', function(req, res){
  res.json({ user: 'tobi' });
});

app.get('/cardapios.json', function(req, res){
  res.json([
    {
      url: '#cardapio/hamburguer',
      description: 'Hamburguer'
    },
    {
      url: '#',
      description: 'Filé de Lombo'
    },
    {
      url: '#',
      description: 'Filé de Frango'
    },
    {
      url: '#',
      description: 'Super Burguer'
    },
    {
      url: '#',
      description: 'Filé Mignon'
    },
    {
      url: '#',
      description: 'Lanches Especiais'
    },
    {
      url: '#',
      description: 'Ingredientes Adicionais'
    },
    {
      url: '#',
      description: 'Mini Porções'
    },
    {
      url: '#',
      description: 'Bebidas'
    },
    {
      url: '#',
      description: 'Pratos'
    }
  ]);
});

app.get('/teste', function(req, res){
  res.format({
    text: function(){
      res.send('hey');
    },
    
    html: function(){
      res.send('hey');
    },
    
    json: function(){
      res.send({ message: 'hey' });
    }
  });
});

app.use('/static', express.static(__dirname + '/'));
app.use('/public', express.static(__dirname + '/'));


app.listen(8081);
