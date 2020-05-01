const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = "34wert678upoikjdgfchvbkj.bjhmfzdnvxcm.";

sgMail.setApiKey(sendgridAPIKey);

const SendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "Chinedu@Stripe.com",
        subject: "Thanks for signing up.",
        text: `Hello ${name}. We're delighted to have you on our service. Help us know how to make sure you get the best service.`
    });
};

const SendEmailOnCancelation = (email, name) => {
    sgMail.send({
        to: email,
        from: "Chinedu@Stripe.com",
        subject: "We can't appreciate you more",
        text: `Hello ${name}. We appreciate you for having tried out our service. It's a tad sad you're leaving; please do let us know what to do to have you back.`
    });
};

module.exports = {
    SendWelcomeEmail,
    SendEmailOnCancelation
};