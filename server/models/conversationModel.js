const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    members: [{type:mongoose.Types.ObjectId, ref: 'user'}],
    title: String,
    group: {type:mongoose.Types.ObjectId, ref: 'group'},
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
})

module.exports = mongoose.model('conversation', conversationSchema)