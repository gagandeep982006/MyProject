package ChunkMaker.ChunkCompressEncrypt;

import ChunkMaker.Chunk.ConvertChunk;
import ChunkMaker.Chunk.InvalidNoOfChunks;
import ChunkMaker.Chunk.WrongFileName;
import ChunkMaker.Compression.GzipCompression;
import ChunkMaker.Encryption.AESEncryption;
import java.io.File;
import java.io.IOException;

class MyThread extends Thread{

    @SuppressWarnings("FieldMayBeFinal")
    private String chunkfilename;
    @SuppressWarnings("FieldMayBeFinal")
    private String key;

    public MyThread(String chunkfilename,String key){
        this.chunkfilename = chunkfilename;
        this.key = key;
    }

    @Override 
    @SuppressWarnings("CallToPrintStackTrace")
    public void run(){
        GzipCompression mycompress = new GzipCompression();
        AESEncryption myencryption = new AESEncryption();
        try {
            //compressing the file
            mycompress.compressFile(chunkfilename);
            File chunkfile = new File(chunkfilename);
            chunkfile.delete();

            //now encrypting the files
            String inputchunkfile = chunkfilename+".gz";
            myencryption.encryptFile(inputchunkfile,key);
            File compressfile = new File(inputchunkfile);
            compressfile.delete();

        } 
        catch (IOException e) {
            e.printStackTrace();
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

/**
 * This class help you to conver the file into chunks then each chunks get compress and then encrypted with a key
 * @author Gagandeep Yadav
 * @since 2026
 * @version 0.0.1
 */
public class Utility {
    //all the private variable are here
    @SuppressWarnings("unused")
    private String filename;
    @SuppressWarnings("unused")
    private String key;
    @SuppressWarnings("unused")
    private int numberofchunk;
    /**
     * the constructor divide the file into the chunks and each chunks get equal amount of the data
     * @param filename enter the filename which u want to convert into compress encrypted chunks
     * @param key enter a 16 Byte key which encrypt the chunks
     * @param numberofchunk enter the numberofchunks you want
     * @throws InvalidNoOfChunks it throws an exception when you give the numberofchunks less then or equal to 0
     * @throws WrongFileName it throws an exception when it dont find the given file
     * @throws IOException it throw an exception when the given key Byte is not equal to 16
     */
    public Utility(String filename,String key,int numberofchunk) throws InvalidNoOfChunks, WrongFileName,IOException{
        if(key.getBytes().length != 16) throw new IOException("Please enter the 16 Byte key only");
        ConvertChunk cc = new ConvertChunk(filename, numberofchunk);
        cc.makeChunks();
        this.filename = filename;
        this.key = key;
        this.numberofchunk = numberofchunk;
    }
    
    /**
     * This method help you to conver the given file into chunks and then this chunks are compress and encrypted
     */
    public void getFinalChunks(){
        for(int i =0;i<numberofchunk;i++){
            String inputchunkfile = "MyChunks/"+filename+".chunk"+(i+1);
            MyThread mythread = new MyThread(inputchunkfile,key);
            mythread.start();
        }
    }

}
