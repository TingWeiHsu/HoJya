describe('create', function () {
  it('should create correct element', function () {
    let testDiv = createE("div","test",null,"id","test");
    chai.expect(testDiv.className).to.equal("test");
    chai.expect(testDiv.id).to.equal("test");
  });
});


describe('get data', function () {
  it('should get data from firebase', function (done) {
    let en = "beef_noodles";
    function callback (ek){
      chai.expect(ek[0].name).to.be.a('string');
        done();
    }
    getData(en,callback);
  });
});