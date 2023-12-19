const fs = require("fs")
const crypto = require('crypto')

class EventsManager{
    static #perGain = 0.3
    static totalGain = 0
    init(){
        const exist = fs.existsSync(this.path)
        console.log(exist)
        if(!exist){
            const path = this.path
            const data = JSON.stringify([])
            fs.writeFileSync(path, data)
        }
    }
    constructor(path){
        this.path = path
        this.init()
    }

    async createEvent (data){
        try{
            const event = {
                id: crypto.randomBytes(12).toString('hex'),
                name: data.name,
                price: data.price,
                capacity: data.capacity || 50,
                date:date.date || new Date(),
            }
            const eventsFile = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            eventsFile.push(event)
            const eventJson = JSON.stringify(eventsFile, null, 2)
            await fs.promises.writeFile(this.path, eventJson)
            console.log(eventJson.id)
            return eventJson.id
        }catch(error){
            return error.message
        }
    }
}


module.exports = EventsManager