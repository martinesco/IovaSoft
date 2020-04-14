package demoBlog.entity;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class Picture {

    private String name;
    private byte[] file;

    private System

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getFile() {
        return file;
    }

    @ManyToOne
    @JoinColumn(table = "file_")
    public void setFile(byte[] file) {
        this.file = file;
    }
}
