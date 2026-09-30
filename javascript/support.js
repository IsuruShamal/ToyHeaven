var supportForm = document.getElementById("supportForm");

supportForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var supportRequest = {
        fullname: fullname,
        email: email,
        subject: subject,
        message: message
    };

    var supportRequests =
        JSON.parse(localStorage.getItem("toyHavenSupport")) || [];

    supportRequests.push(supportRequest);

    localStorage.setItem(
        "toyHavenSupport",
        JSON.stringify(supportRequests)
    );

    showToast(
        "success",
        "Request Sent",
        "Your support request was sent successfully."
    );

    supportForm.reset();
});