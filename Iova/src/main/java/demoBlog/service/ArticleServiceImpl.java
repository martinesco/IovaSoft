package demoBlog.service;

import demoBlog.bindingModel.ArticleBindingModel;
import demoBlog.entity.Article;
import demoBlog.entity.Category;
import demoBlog.entity.Tag;
import demoBlog.entity.User;
import demoBlog.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class ArticleServiceImpl implements ArticleService{
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public Article createArticle(ArticleBindingModel articleBindingModel, User authror, Category category) {
        Article articleEntity = new Article(
                articleBindingModel.getTitle(),
                articleBindingModel.getContent(),
                authror,
                category,
                null
        );
        return this.articleRepository.saveAndFlush(articleEntity);
    }
}
