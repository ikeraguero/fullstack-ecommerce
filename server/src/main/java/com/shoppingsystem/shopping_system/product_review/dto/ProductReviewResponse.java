package com.shoppingsystem.shopping_system.product_review.dto;


import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
        }
        if (minutesAgo < 60) {
            return formatTime(minutesAgo, "minute");
        }
        if (hoursAgo < 24) {
            return formatTime(hoursAgo, "hour");
        }
        if (daysAgo <= 31) {
            return formatTime(daysAgo, "day");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }

    private String formatTime(long amount, String unit) {
        return amount + " " + unit + (amount > 1 ? "s" : "") + " ago";
    }

}
