package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import com.stripe.Stripe;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.*;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

import static com.fasterxml.jackson.databind.type.LogicalType.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    private static void disableSSLCertificateChecking() {
        try {
            TrustManager[] trustAllCerts = new TrustManager[] {
                    new X509TrustManager() {
                        public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
                        public void checkClientTrusted(X509Certificate[] certs, String authType) { }
                        public void checkServerTrusted(X509Certificate[] certs, String authType) { }
                    }
            };

            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            HostnameVerifier allHostsValid = new HostnameVerifier() {
                public boolean verify(String hostname, SSLSession session) { return true; }
            };
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
            System.out.println("Validação de certificado SSL desabilitada.");
        } catch (Exception e) {
            System.err.println("Erro ao desabilitar a validação do certificado SSL:");
            e.printStackTrace();
        }
    }

    @Override
    public PaymentResponse createPaymentLink(Order order) throws StripeException {
        disableSSLCertificateChecking();
        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/failure")
                .addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("USD")
                                .setUnitAmount((long) order.getTotalPrice()*100)
                                .setProductData(SessionCreateParams.LineItem.PriceData
                                        .ProductData.builder().setName("sneaker")
                                        .build())
                                .build()
                        )
                        .build()
                )
                .build();

        Session session = Session.create(params);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
