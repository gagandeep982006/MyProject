package ChunkMaker.Encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * This help you to compress the file
 * @author Gagandeep Yadav
 * @since 2026
 * @version 0.0.1
 */

public class AESEncryption implements EncryptionStrategy{
    @SuppressWarnings("ConvertToTryWithResources")
    @Override
    /**
     * This method encrypt the file using the java AES encryption
     * @param filename take a file which u want to encrypt
     * @param key take a 16 Bytes key to encrypt the data
     * @throws Exception,IOException throws an Exception,IOException if fail to encrypt the file
     */
    public void encryptFile(String filename,String key) throws IOException,Exception{
        // checking if that file exist or not
        File file = new File(filename);
        if(!file.exists()) throw new IOException("PLease give the valid filename");
        if(key.getBytes().length != 16) throw new IOException("Please enter a 16 Byte length key only");

        //now writin the code to encrypt the file into a new file
        
        //now making our secret key
        SecretKey secretkey = new SecretKeySpec(key.getBytes(),"AES");

        //AEC cipher 
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretkey);

        //start encryption  
        String outputfile = filename+".en";

        FileInputStream readfile = new FileInputStream(filename); 
        FileOutputStream writefile = new FileOutputStream(outputfile);
        
        byte[] buffer = new byte[4096];
        int bytesRead;

        while((bytesRead = readfile.read(buffer)) != -1){
            byte[] encrptedbyte = cipher.update(buffer, 0, bytesRead);
            writefile.write(encrptedbyte);
        }
        byte[] finalBytes = cipher.doFinal();
        writefile.write(finalBytes);
        readfile.close();
        writefile.close();
    }
}
