package demoBlog.controller.admin;

import demoBlog.bindingModel.UserEditBindingModel;
import demoBlog.entity.Article;
import demoBlog.entity.Role;
import demoBlog.entity.User;
import demoBlog.repository.ArticleRepository;
import demoBlog.repository.RoleRepository;
import demoBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin/users")
public class AdminUserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/")
    public String listUsers(Model model){
        List<User> users = this.userRepository.findAll();

        model.addAttribute("users", users);
        model.addAttribute("view", "admin/user/list");
        return "base-layout";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Integer id, Model model){
        if (!this.userRepository.exists(id)){
            return "redirect:/admin/users/";
        }

        User user = this.userRepository.findOne(id);
        List<Role> roles = this.roleRepository.findAll();

        String picture = Base64.getEncoder().encodeToString(user.getPicture());

        model.addAttribute("user", user);
        model.addAttribute("roles", roles);
        model.addAttribute("picture", picture);
        model.addAttribute("view", "admin/user/edit");
        return "base-layout";
    }

    @PostMapping("/edit/{id}")
    public String edinProcess(@PathVariable Integer id, UserEditBindingModel userEditBindingModel) throws IOException {
        if (!this.userRepository.exists(id)){
            return "redirect:/admin/users/";
        }
        User user = this.userRepository.findOne(id);

        if (!StringUtils.isEmpty(userEditBindingModel.getPassword())
                && !StringUtils.isEmpty(userEditBindingModel.getConfirmPassword())){
            if (userEditBindingModel.getPassword().equals(userEditBindingModel.getConfirmPassword())){
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

                user.setPassword(bCryptPasswordEncoder.encode(userEditBindingModel.getPassword()));
            }
        }
        user.setFullName(userEditBindingModel.getFullName());
        user.setEmail(userEditBindingModel.getEmail());

        Set<Role> roles = new HashSet<>();
        for (Integer roleId : userEditBindingModel.getRoles()){
            roles.add(this.roleRepository.findOne(roleId));
        }
        user.setRoles(roles);

        byte[] picture = userEditBindingModel.getPicture().getBytes();
        user.setPicture(picture);
        this.userRepository.saveAndFlush(user);
        return "redirect:/admin/users/";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Integer id, Model model){
        if (!this.userRepository.exists(id)){
            return "reditect:/admin/users/";
        }
        User user = this.userRepository.findOne(id);
        model.addAttribute("user", user);
        model.addAttribute("view", "admin/user/delete");
        return "base-layout";
    }

    @PostMapping("/delete/{id}")
    public String deleteProcess(@PathVariable Integer id){
        if (!this.userRepository.exists(id)){
            return "redirect:/admin/users/";
        }
        User user = this.userRepository.findOne(id);

        for (Article article : user.getArticles()){
            this.articleRepository.delete(article);
        }
        this.userRepository.delete(user);
        return "redirect:/admin/users";
    }


}
