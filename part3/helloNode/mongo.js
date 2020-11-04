const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jgonofre:${password}@fopen.mbj1i.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// to add notes:
// const note = new Note({
//     content: 'Mongoose make use of mongo easy',
//     date: new Date(),
//     important: true
// })
// note.save().then(result => {
//     console.log('note saved')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

