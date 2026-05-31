package ChunkMaker.ChunkDeCompressDecrypt;

import ChunkMaker.DeCompression.GzipDecompression;
import ChunkMaker.Decryption.AESDecryption;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

class MyThread extends Thread{
    @SuppressWarnings("FieldMayBeFinal")
    private String chunkfilename;
    @SuppressWarnings("FieldMayBeFinal")
    private String key;

    public MyThread(String chunkfilename,String key) {
        this.chunkfilename = chunkfilename;
        this.key = key;
    }

    @Override
    public void run(){
        AESDecryption mydecryption = new AESDecryption();
        GzipDecompression mydecompress = new GzipDecompression();
        try{
            // removing the encryption from the file
            String inputencryptedfile = chunkfilename + ".gz.en";
            mydecryption.decryptFile(inputencryptedfile, key);
            File encryptedfile = new File(inputencryptedfile);
            encryptedfile.delete();

            //decompress the file
            String inputcompressfile = chunkfilename + ".gz";
            mydecompress.deCompressFile(inputcompressfile);
            File compressfile = new File(inputcompressfile);
            compressfile.delete();
        }

        catch (Exception ex) {
            System.getLogger(MyThread.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
    }  
}

/**
 * This help us to get the file back decrept the each chunks then decompress them and them combine them into one file
 */
public class GetUtility {
    // here we keep all the private variables
    @SuppressWarnings("FieldMayBeFinal")
    private String filename;
    @SuppressWarnings("FieldMayBeFinal")
    private String key;
    @SuppressWarnings("FieldMayBeFinal")
    private int numberofchunks;
    /**
     * constructor set the filename, key, numberofchunks
     * @param filename give the filename which u convert into the chunks already
     * @param key give the key to decrept the file
     * @param numberofchunks no of chunks you have in the MyChunks folder/
     */
    public GetUtility(String filename,String key,int numberofchunks){
        this.filename = filename;
        this.key = key;
        this.numberofchunks = numberofchunks;
    }

    /**
     * this helps us to decrept ,decompress the chunks
     * @throws InterruptedException thorows an exception
     */
    public void getChunkBack() throws InterruptedException{
        MyThread[] mythreads = new MyThread[numberofchunks];

        for(int i =0;i<numberofchunks;i++){
            String inputchunkfile = "MyChunks/"+filename+".chunk"+(i+1);
            mythreads[i] = new MyThread(inputchunkfile,key);
            mythreads[i].start();
        }

        for(int i =0 ;i<numberofchunks;i++){
            mythreads[i].join();
        }
    }
    /**
     * after running the getChunkBack this methdo help us to combine the file back into one file
     * @throws Exception throws an Exception
     */
    @SuppressWarnings({"CallToPrintStackTrace", "ConvertToTryWithResources"})
    public void combineChunk() throws Exception{
        File myfile = new File("MyChunks/" + filename);
        try {
            myfile.createNewFile();
        } 
        catch (IOException e) {
            e.printStackTrace();
        }

        FileOutputStream writedata = new FileOutputStream(myfile);
        for(int i = 0;i<numberofchunks;i++){
            FileInputStream readchunk = new FileInputStream("MyChunks/" + filename + ".chunk" + (i+1));
            byte[] buffer = new byte[4096];

            int bytereaded;
            while((bytereaded = readchunk.read(buffer)) != -1){
                writedata.write(buffer,0,bytereaded);
            }
            readchunk.close();

            File chunkfile = new File("MyChunks/" + filename + ".chunk" + (i+1));
            chunkfile.delete();
        }
        writedata.close();
    }
}
