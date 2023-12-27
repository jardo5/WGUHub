package com.wguhub.Services;

import com.postmarkapp.postmark.Postmark;
import com.postmarkapp.postmark.client.ApiClient;
import com.postmarkapp.postmark.client.data.model.message.Message;
import com.postmarkapp.postmark.client.data.model.message.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Service
public class EmailService {

    @Value("${POSTMARK_API_KEY}")
    private String APIKey;

    public void sendVerificationEmail(String to, String token) {
        String verificationLink = "http://localhost:5173/verify?token=" + token;

        ApiClient client = Postmark.getApiClient(APIKey);

        Message message = new Message();
            message.setFrom("admin@wguhub.dev");
            message.setTo(to);
            message.setSubject("Review Verification");
            message.setTextBody("Please click on the link to verify your review: " + verificationLink);

        try {
            MessageResponse response = client.deliverMessage(message);
            System.out.println("Email sent successfully. Response: " + response);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}

