const { date } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    image : {
        url:String,
        filename: String,
        // type : String,
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1706362723628-60e8f1929ffe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    location : {
        type : String,
        required : true,
    }, 
    country : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        default : "trending",
    },
    date : {
        type : Date,
        default : Date.now,
    },
    tax : {
        type : Number,
        default : 9,
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    likes : {
        type : Number,
        default : 0,
    },
});

listingSchema.pre('save', function(next) {
    if(this.price > 10000) {
        this.tax = 18;
    } 
    next();
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

