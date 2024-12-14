package com.shoppingsystem.shopping_system.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class MultipartFileDeserializer extends JsonDeserializer<MultipartFile> {
    @Override
    public MultipartFile deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        throw new UnsupportedOperationException("Deserialization of MultipartFile is not supported");
    }
}