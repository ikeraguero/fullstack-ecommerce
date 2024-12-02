package com.shoppingsystem.shopping_system.util;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;

import java.io.InputStream;

public class MultipartInputStreamResource extends ByteArrayResource {
    private final String filename;

    public MultipartInputStreamResource(byte[] byteArray, String filename) {
        super(byteArray);
        this.filename = filename;
    }

    @Override
    public String getFilename() {
        return filename;
    }
}
