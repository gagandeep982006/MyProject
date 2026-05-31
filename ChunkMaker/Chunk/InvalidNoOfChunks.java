package ChunkMaker.Chunk;

/**
 * custum exception class
 */
public class InvalidNoOfChunks extends Exception{
    @Override
    public String toString(){
        return "please give the valid no of chunks";
    }

    @Override
    public String getMessage(){
        return "please give the valid no of chunks";
    }
}