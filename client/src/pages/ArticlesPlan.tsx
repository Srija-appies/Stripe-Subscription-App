import { useEffect, useState } from "react";
import standard from "../assets/standard.svg";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { isTemplateExpression } from "typescript";




const StyledCard = styled.div`
  background-color: #00000012;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  margin: 0 10px;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;
const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([])
  const [plan, setPlan]=useState("")

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data: response } = await axios.get("http://localhost:8080/subs/prices")
      console.log(response)
      setPrices(response.data);
      setPlan("Standard");
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const createSession = async (priceId: string) => {
    try {
      const { data: response } = await axios.post("http://localhost:8080/subs/session", {
        priceId,
      });
      window.location.href = response.url;
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {prices.map((item) => (
          // Check if the nickname is not null before rendering the Card
          item.nickname !== null && (
            <Col key={item.id} xs={12} md={4} className="mb-4">
              <Card className="text-center">
                <Card.Img variant="top" src={standard} alt={item.title} />
                <Card.Body>
                  <Card.Text className="text-slate-500">
                    Unlock a world of exclusive benefits with our subscription plans. Choose the one that suits you best!
                  </Card.Text>
                  <Card.Title className="text-center font-bold mt-3">
                    ₹{item.unit_amount / 100} INR
                  </Card.Title>
                  <Card.Title className="text-center font-bold mt-3">{item.nickname}</Card.Title>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => createSession(item.id)}
                  >
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
}  

export default ArticlesPlan;
