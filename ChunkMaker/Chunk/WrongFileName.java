package ChunkMaker.Chunk;

/**
 * custum exception class
 */
public class WrongFileName extends Exception{
    @Override
    public String toString(){
        return "please give the right file name with extension";
    }

    @Override
    public String getMessage(){
        return "please give the right file name with extension";
    }
}