const mongoose = require('mongoose')
const validator=require('validator')
const shorthash=require('shorthash')

const Schema = mongoose.Schema

const urlSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        validate:{
            validator:function(value){
                return validator.isURL(value)
            },
            message : function(){
                return 'Given URL is not proper'
            }
        },
        required: true
    },
    hashedUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks:[{
        clickDateTime:Date,
        ipAddress:String,
        browser:String,
        platform:String,
        device:String
    }]
})

urlSchema.pre('save',function(next){
    const hash=shorthash.unique(this.originalUrl)
        this.hashedUrl=hash
        next()
    
})


const Url = mongoose.model('Url',urlSchema)

module.exports = Url