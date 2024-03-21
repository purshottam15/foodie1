const mongoose=require('mongoose')

const addressSchema=mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    name:{
        type:String,
        
        
    },
    street:{
        type:String,
        require:true
    },
    zipcode:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    email:{
        type:String,
        
    }
   
})

const address=mongoose.model('address',addressSchema)

module.exports =address;