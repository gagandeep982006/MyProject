package ChunkMaker.DeCompression;

import java.io.IOException;

/**
 * interface to make the decompression for the file
 */
public interface DecompressionStrategy{
    public void deCompressFile(String filename) throws Exception,IOException;
}