class NotFound extends Error {
    constructor(message){
        super(message);
        this.name = "Dam not found";
    }
}

module.exports = NotFound;
