package com.shoppingsystem.shopping_system.product_review.dto;


import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductReviewResponse {
    private Long productId;
    private int rating;
    private String comment;
    private String userFullName;
    private String formattedDate;

    public ProductReviewResponse(Long productId, int rating, String comment, String firstName, String lastName, LocalDateTime date) {
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
        this.userFullName = firstName + " " + lastName;
        this.formattedDate = formatReviewDate(date);
    }

    private String formatReviewDate(LocalDateTime date) {
        LocalDateTime now = LocalDateTime.now();

        long minutesAgo = ChronoUnit.MINUTES.between(date, now);
        long hoursAgo = ChronoUnit.HOURS.between(date, now);
        long daysAgo = ChronoUnit.DAYS.between(date, now);

        if (minutesAgo < 1) {
            return "Just now";
        } else if (minutesAgo < 60) {
            return minutesAgo + " minute" + (minutesAgo > 1 ? "s" : "") + " ago";
        } else if (hoursAgo < 24) {
            return hoursAgo + " hour" + (hoursAgo > 1 ? "s" : "") + " ago";
        } else if (daysAgo <= 31) {
            return daysAgo + " day" + (daysAgo > 1 ? "s" : "") + " ago";
        } else {
            // Return formatted date for older reviews
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return date.format(formatter);
        }
    }
}
