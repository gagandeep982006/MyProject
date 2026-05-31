package ChunkMaker.DeCompression;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;

// package ChunkMaker.DeCompression;
/**
 * This help you to decompress the file
 * @author Gagandeep Yadav
 * @since 2026
 * @version 0.0.1
 */
public class GzipDecompression implements DecompressionStrategy {
    @Override
    @SuppressWarnings("ConvertToTryWithResources")
    /**
     * This method decompress the compress file using the java GZIP decompressor
     * @param filename take a file which u want to decompress with extension
     * @throws Exception,IOException throws an Exception,IOException if fail to decompress the file
     */
    public void deCompressFile(String filename) throws Exception,IOException{
        // checking if the given file is correct or not
        String[] filepart = filename.split("\\.");
        File file = new File(filename);
        if(!file.exists() || filepart.length < 2){
            throw new IOException("Please enter a valid filename");
        }

        // code to decompress the file
        String outputfile = filename.substring(0,filename.lastIndexOf("."));
        FileInputStream fis = new FileInputStream(filename);
        GZIPInputStream gzip = new GZIPInputStream(fis);
        FileOutputStream fos = new FileOutputStream(outputfile);
        
        byte[] buffer = new byte[4096];

        int bytesRead;

        while((bytesRead = gzip.read(buffer)) != -1){

            fos.write(buffer, 0, bytesRead);
        }

        gzip.close();
        fos.close();
    }
}
