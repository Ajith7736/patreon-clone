"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connnectdb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    let user = await User.findOne({name : to_username})
    const razorsecret = user.razorsecret
    const razorid = user.razorid
    var instance = new Razorpay({ key_id: razorid, key_secret: razorsecret })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    await Payment.create({
        oid: x.id,
        name: paymentform.name,
        amount: amount/100,
        to_user: to_username,
        message: paymentform.message,
    })

    return x;
}


export const fetchuser = async (username) => {
    try{await connectDB()
    let u = await User.findOne({ name: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user}
    catch(err){
        return {Error : "There is no user"}
    }
}

export const fetchpayments = async (username) => {
    try {
        await connectDB()
        let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean();
        let payments = p.map((item) => {
            return { ...item, _id: item._id.toString() }
        })
        return payments
    }
    catch (err) {
        console.log("There is no payments")
    }
}

export const updateuser = async (data, oldusername, oldname) => {
    try {
        await connectDB()
        if (oldusername !== data.username) {
            let u = await User.findOne({ username: data.username })
            if (u) {
                return { error: "User already exist" }
            }
        }
        await User.updateOne({ email: data.email }, data)
        if(oldname !== data.name){
            await Payment.updateMany({to_user : oldname},{to_user : data.name})
        }
    } catch (err) {
        console.log(err)
    }
}