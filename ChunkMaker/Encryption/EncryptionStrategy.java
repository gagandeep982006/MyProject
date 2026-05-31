package ChunkMaker.Encryption;

import java.io.IOException;

/**
 * interface for the encryption of the file
 */
public interface EncryptionStrategy {
    public void encryptFile(String filename,String key) throws IOException,Exception;
}
