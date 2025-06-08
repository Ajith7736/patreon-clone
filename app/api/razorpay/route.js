import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connnectdb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body)
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    let user = await User.findOne({ name: p.to_user })
    const razorsecret = user.razorsecret
    if (!p) {
        return NextResponse.error("Order Id not found")
    }

    let xx = validatePaymentVerification(
        {
            "order_id": body.razorpay_order_id,
            "payment_id": body.razorpay_payment_id,
        },
        body.razorpay_signature,
        razorsecret// ✅ just a string
    )

    if (xx) {
        const updatepayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatepayment.to_user}?paymentdone=true`)
    }
    else {
        return NextResponse.error("Payment verification failed")
    }
}