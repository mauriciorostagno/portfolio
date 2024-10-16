<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Recipient email
    $to = "mrostagno8@gmail.com"; 
    
    // Email subject
    $email_subject = "New Message from: $name"; 
    
    // Email body
    $email_body = "You have received a new message from the contact form.\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Subject: $subject\n".
                  "Message: $message\n";

    // Headers
    $headers = "From: $email\n"; 
    $headers .= "Reply-To: $email"; 
    
    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
