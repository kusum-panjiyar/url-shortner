const Url = require('../models/url')

module.exports.list = (req,res) => {
    Url.find()
        .then((urls)=>{
            res.json(urls)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body
    const url = new Url(body)
    url.save()
        .then(()=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Url.findById(id)
        .then((url)=>{
            if(url) {
                res.json(url)
            }
            else {
                res.json({})
            }
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id,body,{ new: true, runValidators: true })
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Url.findByIdAndDelete(id)
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.redirect=(req,res)=>{
    const hash=req.params.hash
    const data=req.useragent
    const click={
        ipAddress:req.ip,
        browser:data.browser,
        platform:data.platform,
        device:data.device?'Mobile':'Desktop'
    }
    Url.findOneAndUpdate({hashedUrl:hash},{$push:{clicks:click}},{new:true,runValidators:true})
        .then((url)=>{
            res.redirect(url.originalUrl)
            console.log(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}