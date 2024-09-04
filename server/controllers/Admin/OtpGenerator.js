var nodemailer = require("nodemailer");
module.exports={

   async sendOtp(token,EmailTo,EmailFrom,text){
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EmailFrom,
          pass: "ksyedtsumlanroiq",
        },
      });
      console.log("EMAIL TO"+EmailTo);

      var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: EmailTo,
        subject: "OTP ",
        text: text,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("OTP sent: " + info.response);
        }
      });

   },
   async sendMail(EmailTo,EmailFrom,text){
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EmailFrom,
          pass: "ksyedtsumlanroiq",
        },
      });
      console.log("EMAIL TO"+EmailTo);

      var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: EmailTo,
        subject: "Succesfull Registration ",
        text: text,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("OTP sent: " + info.response);
        }
      });

   }
}