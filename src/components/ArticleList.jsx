import React, { useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import ArticleCard from "../components/ArticleCard";
import Ad from "./Ad";
import mercedesImg from "../images/mercedesAd.jpg";
import lagavulinImg from "../images/lagavulinAd.jpg";
import "../css/article.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticleList } from '../modules/fetchArticles'

const ArticleList = (props) => {
  const articleList = useSelector((state) => state.articles.articleList);
  const location = useSelector((state) => state.location.country);
  const dispatch = useDispatch()
  const category = props.match.params.category || "";

  useEffect(() => {
    fetchArticleList({dispatch, location});
  }, []);

  const filteredArticles = () => {
    switch (category) {
      case "":
        return articleList;
      case "local":
        return articleList.filter((article) => article.location === location);
      case "current":
        return articleList.filter((article) => {
          return Date.now() - Date.parse(article.published_at) < 86400000;
        });
      default:
        return articleList.filter((article) => article.category === category);
    }
  };

  const buildArticleCards = () => {
    const articleCards = [];
    const filtered = filteredArticles();
    let i = 0;
    while (i < filtered.length) {
      articleCards.push(
        <Grid.Row style={{ padding: 0, margin: 1 }}>
          <Grid.Column
            stretched
            style={{ padding: 0, margin: 0, width: "fit-content" }}
          >
            <Grid.Row>
              <ArticleCard articleProp={filtered[i]} size={1} margin={2} />
            </Grid.Row>
            <Grid.Row>
              <ArticleCard articleProp={filtered[i + 1]} size={1} margin={2} />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 5, width: "fit-content" }}
          >
            <ArticleCard articleProp={filtered[i + 2]} size={2 / 3} margin={1} />
            <ArticleCard articleProp={filtered[i + 3]} size={2 / 3} margin={1} />
            <ArticleCard articleProp={filtered[i + 4]} size={2 / 3} margin={1} />
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 5, width: "fit-content" }}
          >
            <ArticleCard articleProp={filtered[i + 5]} size={2 / 3} margin={1} />
            <ArticleCard articleProp={filtered[i + 6]} size={2 / 3} margin={1} />
            <ArticleCard articleProp={filtered[i + 7]} size={2 / 3} margin={1} />
          </Grid.Column>
        </Grid.Row>
      );
      i += 6;
    }
    return articleCards.reverse();
  };

  let locationMessage =
    category == "local" &&
    (location ? (
      <p id="location" style={{ color: "black", fontSize: 20 }}>
        Showing news from <strong>{location}</strong>
      </p>
    ) : (
      <p id="no-location" style={{ color: "black", fontSize: 20 }}>
        Unable to get your location, showing international news instead
      </p>
    ));

  return (
    <Container align="center" style={{ width: "100%" }}>
      <Container align="center" style={{ width: "100%", paddingTop: "10px" }}>
        <Ad
          link={"https://www.mercedes-benz.com/en/"}
          id={"ad-1"}
          img={mercedesImg}
          alt={"mercedes"}
        />
      </Container>
      <Grid
        id="article-cards"
        centered
        fluid
        stackable
        style={{ marginTop: "50px", maxWidth: "80%", minWidth: "1100px" }}
      >
        {buildArticleCards().reverse()}
      </Grid>
      <Ad
        link={"https://www.malts.com/en-gb/visit-our-distilleries/lagavulin/"}
        id={"ad-2"}
        img={lagavulinImg}
        alt={"lagavulin"}
      />
    </Container>
  );
};

export default ArticleList;
