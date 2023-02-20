const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
lazyLoading: true
});
/**
* verify OTP
* @param {*} reg
* @param {* } res
* @param {*} next
*/
const verifyoTP = async (req, res, next) => {
    const { countryCode, phoneNumber, otp } = req.body;
    try{
    const verifiedResponse = await client.verify
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({
    to:
    `+${countryCode}${phoneNumber}`, code: otp,
    });
    res.status(200).send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}` );
    }
    catch(error) {

    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
}
/**
* send OTP
* @param {*} req
* @param {*} res
* @param {* } next
*/
const sendoTP = async (req, res, next) => {
    const { countryCode, phoneNumber } = req.body;
    try{
    const otpResponse = await client.verify
    .services(TWILIO_SERVICE_SID)
    .verifications.create({ to:
    `+${countryCode}${phoneNumber}`,channel: "sms"
    });
    res.status(200).send(`OTP send successfully!: ${JSON.stringify (otpResponse)}`);
}
catch(error) {

    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
}
module.exports ={verifyoTP,sendoTP}