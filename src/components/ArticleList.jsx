import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Button } from "semantic-ui-react";
import ArticleCard from "../components/ArticleCard";
import Ad from "./Ad";
import mercedesImg from "../images/mercedesAd.jpg";
import lagavulinImg from "../images/lagavulinAd.jpg";
import "../css/article.css";
import { useSelector } from "react-redux";
import ScrollArrow from "./ScrollArrow";
import { useTranslation } from "react-i18next";

const ArticleList = (props) => {
  const [articleList, setArticleList] = useState([]);
  const { t } = useTranslation();
  const category = useSelector(state => state.articles.category);
  const [nextPage, setNextPage] = useState(1);
  const location = useSelector((state) => state.location.country);
  const [trigger, setTrigger] = useState(true)
  
  const paramText = (
    <>
      <p>Page: {nextPage}</p>
      <p>Category: {category}</p>
      <p>Location: {location}</p>
      <p>ArticleListLength {articleList.length}</p>
    </>
  )

  useEffect(() => {
    setNextPage(1)
    setArticleList([])
    setTrigger(!trigger)
    console.log("You have switched to " + category)
  },[category])

  useEffect(() => {
    fetchBatch()
  },[trigger])

  const fetchBatch = async () => {
    const locationParam = location && { location: location }
    const categoryParam = category && { category: category }
    const params = {
      page: nextPage,
      ...locationParam,
      ...categoryParam
    }
    try {
      const response = await axios.get("/articles", { params: params } );
      setNextPage(response.data.next_page)
      setArticleList(articleList.concat(response.data.articles));
    } catch (error) {
      console.log(error);
    }
  };

  let articleCards = articleList.map((article) => {
    return <ArticleCard article={article} size={1} />;
  });

  let locationMessage =
    category == "local" &&
    (location ? (
      <p id="location" style={{ color: "black", fontSize: 20 }}>
        {t("Showing news from")} <strong>{location}</strong>
      </p>
    ) : (
      <p id="no-location" style={{ color: "black", fontSize: 20 }}>
        {t("Unable to get your location, showing international news instead")}
      </p>
    ));

  let loadMoreButton = nextPage && (
    <>
      <Button onClick={() => fetchBatch()}>Load more</Button>
    </>
  )

  return (
    <>
      <div>
        <Grid id="articleCards" fluid columns={3} divided centered>
          <br />
          {paramText}
          <Ad
            link={"https://www.mercedes-benz.com/en/"}
            id={"ad-1"}
            img={mercedesImg}
            alt={"mercedes"}
          />
          {locationMessage}
          {articleCards}
          {loadMoreButton}
          <Ad
            link={
              "https://www.malts.com/en-gb/visit-our-distilleries/lagavulin/"
            }
            id={"ad-2"}
            img={lagavulinImg}
            alt={"lagavulin"}
          />
        </Grid>
      </div>
      <div>
        <ScrollArrow />
      </div>
    </>
  );
};

export default ArticleList;
