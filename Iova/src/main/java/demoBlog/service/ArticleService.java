package demoBlog.service;

import demoBlog.bindingModel.ArticleBindingModel;
import demoBlog.entity.Article;
import demoBlog.entity.Category;
import demoBlog.entity.User;

public interface ArticleService {
    Article createArticle(ArticleBindingModel articleBindingModel, User authror, Category category);
}
