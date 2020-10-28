const { io } = require('../index');
const BandModel = require('../models/bandModel');
const BandsModel = require('../models/bandsModel');
const bands = new BandsModel();

bands.addBand(new BandModel('Queen'));
bands.addBand(new BandModel('Likin park'));
bands.addBand(new BandModel('Metalica'));
bands.addBand(new BandModel('Cinamon'));
console.log(bands.getBands());

// mensajes de socket
io.on('connection', client => {
  console.log('cliente conectado');

  client.emit('active-bands', bands.getBands());
   
  client.on('disconnect', () => { 
    console.log('cliente desconectado');
  });
  client.on('mensaje', payload => {
    console.log('Mensaje', payload);
    io.emit('mensaje', {admin: 'nuevo mensaje'});
  });
  client.on('nuevo-mensaje', payload => {
    console.log('Mensaje', payload);
    client.broadcast.emit('nuevo-mensaje', payload);
  });
  client.on('vote-band', payload => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });
  client.on('add-band', payload => {
    bands.addBand(new BandModel(payload.name));
    io.emit('active-bands', bands.getBands());
  });
  client.on('delete-band', payload => {
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });

});
