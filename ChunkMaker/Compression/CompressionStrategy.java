package ChunkMaker.Compression;
import java.io.IOException;
/**
 * Interface to make the compression for the file
 */
public interface CompressionStrategy {
    public void compressFile(String filename) throws Exception,IOException;
}
