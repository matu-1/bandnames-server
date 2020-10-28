
class BandsModel {
  constructor(){
    this.bands = [];
  }

  addBand( band = new BandsModel()){
    this.bands.push(band);
  }

  getBands = () => this.bands;

  deleteBand( id = ''){
    this.bands = this.bands.filter(band => band.id != id);
  }

  voteBand( id = '' ){
    this.bands = this.bands.map(band => {
      if(band.id == id) band.votes++;
      return band;
    });
  } 

}

module.exports = BandsModel;