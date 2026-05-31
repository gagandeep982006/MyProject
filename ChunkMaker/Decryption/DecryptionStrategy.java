package ChunkMaker.Decryption;

import java.io.IOException;

/**
 * interface for the decryption of the file
 */
public interface DecryptionStrategy {
    public void decryptFile(String filename,String key) throws Exception,IOException;
}
