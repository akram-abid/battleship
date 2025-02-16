export function Ship(name, lenght, hits, sunk){
    return {
        name,
        lenght,
        hits,
        sunk,
        hit : function (){
            this.hits ++
        },
        isSunk: function (){
            return this.lenght == this.hits
        },
        sunked: function() {
            this.sunk = !this.sunk
        }
    }
}

