describe('Lungo Service', function() {
    it('Defines Service', function() {
        expect(LUNGO.Service).toBeDefined();
    });

    it('Realises GET requests', function() {
        expect(LUNGO.Service.get).toBeDefined();
    });

    it('Realizes POST requests', function() {
        expect(LUNGO.Service.post).toBeDefined();
    });

    it('Realizes PUT requests', function() {
        expect(LUNGO.Service.put).toBeDefined();
    });

    it('Realizes DELETE requests', function() {
        expect(LUNGO.Service.delete).toBeDefined();
    });
});
