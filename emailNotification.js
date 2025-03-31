function sendEmailNotification(e) {
  var responses = e.response.getItemResponses();
  var message = "New Harvest Vehicle Booking:\n\n";
  var email = "";

  for (var i = 0; i < responses.length; i++) {
    var question = responses[i].getItem().getTitle();
    var answer = responses[i].getResponse();

    if (question === "Email") { // Adjust the question title if needed
      email = answer;
    }

    message += question + ": " + answer + "\n";
  }

  // Send email to admin
  MailApp.sendEmail({
    to: "vigneshwaranethicalhacker@gmail.com",  // Replace with your email
    subject: "New Harvest Vehicle Booking",
    body: message
  });

  // Send confirmation email to user
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: "Harvest Vehicle Booking Confirmed",
      body: "Thank you for booking a Harvest Vehicle. We have received your details and payment screenshot. We will contact you soon."
    });
  }
}

// Create a trigger to run on form submission
function createTrigger() {
  var form = FormApp.openById("1WhrezkGFcFQEHP8NP3bJKfVv3jgyNl1WKW8d2Y0HjBo"); // Replace with your Form ID
  ScriptApp.newTrigger("sendEmailNotification")
    .forForm(form)
    .onFormSubmit()
    .create();
}
