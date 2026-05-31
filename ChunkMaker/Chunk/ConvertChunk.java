package ChunkMaker.Chunk;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
/**
 * It help you to conver the big files into the parts
 * @author Gagandeep Yadav
 * @since 2026
 * @version 0.0.1
 */

public class ConvertChunk{
    // keeping all the private variable here
    private String filename;
    private int chunknumber;
    private long chunksize;
    private long _filesize;
    @SuppressWarnings("unused")
    private String extension;

    // make the constructor to take the filename and the number of chunks
    /**
     * Constructor set the number of the chunk, chunks size, filename, extension of the file
     * @since 2026
     * @param filename Give a valid filename with extension
     * @param chunknumber Chunk NUmber to divide the file into that parts
     * @throws WrongFileName Throws an error if the file not found in the given director or current folder
     * @throws InvalidNoOfChunks Throws an error if u give the number of chunks less than or equal to 0
     */
    public ConvertChunk(String filename,int chunknumber) throws WrongFileName, InvalidNoOfChunks{
        String[] checkfile = filename.split("\\.");
        File file = new File(filename);
        if(!file.exists() || checkfile.length < 2){
            throw new WrongFileName();
        }

        if(chunknumber <= 0){
            throw new InvalidNoOfChunks();
        }

        this.filename = filename;
        this.chunknumber = chunknumber;
        this._filesize = file.length();
        this.extension = checkfile[1];
        this.chunksize = _filesize/chunknumber + 1;
    } 

    // function to make the chunks from it
    /**
     * makes the chunks file into the MyChunks folder and write the data into the chunks files
     * @return it return true is chunks makes properly else it return false
     */
    @SuppressWarnings({"UseSpecificCatch", "CallToPrintStackTrace", "ConvertToTryWithResources"})
    public boolean makeChunks(){
        // making the chunk file
        File folder = new File("MyChunks");
        folder.mkdir();
        for(int i =0; i< chunknumber;i++){
            try {
                File newfile = new File("MyChunks\\"+filename + ".chunk" + (i+1));
                newfile.createNewFile();
            } 
            catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }

        //storing the data into the chunks files

        try {
            BufferedInputStream readfile = new BufferedInputStream(new FileInputStream(filename)); 
            for(int i = 0; i < chunknumber;i++){
                BufferedOutputStream writechunk = new BufferedOutputStream(new FileOutputStream("MyChunks\\"+filename+".chunk"+(i+1)));
                long written =0;
        
                while(written <= chunksize ){
                    int data = readfile.read();
                    if(data == -1) break;
                    writechunk.write(data);
                    written++;
                }

                writechunk.close();
            }
            readfile.close();
        }

        catch(FileNotFoundException e){
            e.printStackTrace();
            return false;
        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}