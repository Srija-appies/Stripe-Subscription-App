import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const CardsContainer = styled.div`
  padding: 4rem 0;
  display: flex;
  background-color: black;
`;

const Card = styled.div`
  height: 35rem;
  width: 33%;
  box-shadow: 0.2rem 0.2rem 2rem rgba(255, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 2rem;
  background-color:black;
`;

const Image = styled.img`
  width: 100%;
  height: 20rem;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  color:white;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  background-color:black; 
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
    color: #ff0000;  // Set red text color for the link
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
  color:white
`;

const Content = styled.p`color:white`;

const StyledLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: #ff0000;  // Set red text color for the link

  &:hover {
    text-decoration: underline;  // Underline the link on hover
  }
`;

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data: response } = await axios.get(
      "https://subscription-backend-5gc0.onrender.com/articles"
    );
    setArticles(response);
  };

  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article.id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoArticlesContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
          <StyledLink to="/article-plans">Buy a plan</StyledLink>
        </NoArticlesContainer>
      )}
    </Container>
  );
};

export default Articles;
