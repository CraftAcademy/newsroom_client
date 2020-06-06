import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Ad from "./Ad";
import mercedesImg from "../images/mercedesAd.jpg";
import PremiumBlocker from "./PremiumBlocker";
import ArticleCard from './ArticleCard'
import "../css/article.css";

const SingleArticle = (props) => {
  const { t } = useTranslation();
  const article = useSelector( state => state.articles.activeArticle );
  const articleList = useSelector( state => state.articles.articleList );

  const smallArticles = () => {
    const randomArticles = []
    for (let i = 0; i < 10; i++) {
      const randomArticle = articleList[Math.floor(Math.random() * articleList.length)]
      randomArticles.push(<ArticleCard articleProp={randomArticle} size={0.5} margin={1}/>)
    }
    return randomArticles
  }

  return (
    <Container align="center" style={{ paddingTop: "45px", width: "75%" }}>
      <Grid>
        <Grid.Column width={12}>
          <Grid.Row>
            <ArticleCard articleProp={article} size={2}/>
          </Grid.Row>
        <Grid.Row centered>
          <p
            key={article.id}
            id={"article-" + article.id + "-date"}
            className="published-at"
          >
            {t("Published at")} {article.published_at}
          </p>
        </Grid.Row>
        <Grid.Row centered>
          <p
            key={article.id}
            id={"article-" + article.id + "-body"}
            style={{ textAlign: "left" }}
            className="article-body"
          >
            {article.body}
            {article.premium && !props.authenticated && <PremiumBlocker />}
          </p>
        </Grid.Row>
        <Grid.Row centered>
          <Ad
            link={"https://www.mercedes-benz.com/en/"}
            id={"ad-1"}
            img={mercedesImg}
            alt={"mercedes"}
          />
        </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          {smallArticles()}
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default SingleArticle;
