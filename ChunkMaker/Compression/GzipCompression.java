package ChunkMaker.Compression;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

/**
 * This help you to compress the file
 * @author Gagandeep Yadav
 * @since 2026
 * @version 0.0.1
 */
public class GzipCompression implements CompressionStrategy {
    /**
     * This method compress the give file using the java GZIP compressor
     * @param filename take a file which u want to compress
     * @throws Exception,IOException throws an Exception,IOException if fail to compress the file
     */
    @Override
    @SuppressWarnings("ConvertToTryWithResources")
    public void compressFile(String filename) throws Exception,IOException {
        //checking if someone gives wrong filename
        String[] filepart = filename.split("\\.");
        File file = new File(filename);
        if(!file.exists() || filepart.length < 2){
            throw new IOException("Please enter a correct file name");
        }

        // code to compress the file
        String outputfile = filename+".gz";
        FileInputStream fis = new FileInputStream(filename);
        GZIPOutputStream gzip = new GZIPOutputStream(new FileOutputStream(outputfile));
        byte[] buffer = new byte[4096];
        int bytereader;

        while((bytereader = fis.read(buffer)) != -1){
            gzip.write(buffer,0,bytereader);
        }
        gzip.close();
        fis.close();
    }
}
