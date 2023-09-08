const bcrypt=require("bcrypt");

const _=require("lodash");

const axios=require("axios");

const otpGenerator=require("otp-generator");

const {User}=require('../Model/UserModel');

const {Otp}=require('../Model/otpModel');

const { response } = require("../app");










//two functions were created one for getting number and sending otp and another for getting optp and verification

function generateNumericOTP(length) {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}



module.exports.signUp=async(req,res)=>{
   
    const user=await User.findOne({
      number:req.body.number
       
    });
    if(user) 
    return res.status(400).send({
        message: "user already registred"
       
    });
      //generate the otp
      const OTP = generateNumericOTP(6);
       //send otp
       const number=req.body.number;
       console.log(OTP);


    //    here external library will come        

      

       
       const otp=new Otp({number:number,otp:OTP});
       const salt=await bcrypt.genSalt(10)
       otp.otp=await bcrypt.hash(otp.otp,salt);
       const result=await otp.save();
       return res.status(200).send({
        message: "OTP sent successfully!",
        otp: OTP // Include the OTP in the response
    });


}

module.exports.verifyOtp=async(req,res)=>{
console.log("num",req.body.number);
console.log("otp",req.body.otp);
 const otpHolder=await Otp.find({
    number:req.body.number
 });

 //if no otp in the database
 if(otpHolder.length===0)return res.status(400).send("You are Using Expired OTP!");
  //one user can request more time to send otp
    //but first i have to find first time generate otp
   const rightOtpFind=otpHolder[otpHolder.length-1];//it catch first object from an array
   const validUser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);

   //check number or valid user

   if(rightOtpFind.number===req.body.number && validUser ){
    const user=new User(_.pick(req.body,["number"]));
    const token=user.generateJWT();
    const result=await user.save();
    const OTPDelete=await Otp.deleteMany({
        number:rightOtpFind.number
    });
    return res.status(200).send({
        message:"User Registration Successfull",
        token:token,
        data:result
    });
   }else{
     return res.status(400).send("Your OTP was wrong!");
   }
 }

 module.exports.deleteUser= async (req, res) => {
  const id =req.params.id;
  console.log("userid",req.params.id);
  try {
  const user = await User.findOneAndDelete({ _id: id });

    return res.status(200).send("user deleted");
  } catch (error) {
    return res.status(500).send("error in user delete deleted");
  }
};
