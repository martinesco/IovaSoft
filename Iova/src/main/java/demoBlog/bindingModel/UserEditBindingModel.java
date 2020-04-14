package demoBlog.bindingModel;

import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

public class UserEditBindingModel extends UserBindingModel {
    private List<Integer> roles;
    private MultipartFile picture;

    public UserEditBindingModel(){this.roles = new ArrayList<>();}

    public MultipartFile getPicture() {
        return picture;
    }

    public void setPicture(MultipartFile picture) {
        this.picture = picture;
    }

    public List<Integer> getRoles() { return roles; }

    public void setRoles(List<Integer> roles){this.roles = roles;}
}
