import { useEffect, useState } from "react";
import standard from "../assets/standard.svg";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { isTemplateExpression } from "typescript";



const StyledCard = styled(Card)`
  background-color: #1a1a1a;  // Set dark background color
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(255, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  margin: 0 10px;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledCardImg = styled(Card.Img)`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const StyledCardBody = styled(Card.Body)`
  color: #eee;  // Set text color to light gray
`;

const StyledCardText = styled(Card.Text)`
  color: #888;  // Set text color to a slightly lighter gray
`;

const StyledCardTitle = styled(Card.Title)`
  color: #fff;  // Set text color to white
`;

const StyledButton = styled(Button)`
background-color: #ff0000;  // Set red background color
border: none;  // Remove button border
margin-top: auto;  // Align button to the bottom of the card
display: block;  // Make the button a block element
margin-left: auto;  // Center the button horizontally
margin-right: auto;  // Center the button horizontally

&:hover {
  background-color: #cc0000;  // Darker red on hover
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
          // Check if the nickname is not null before rendering the StyledCard
          item.nickname !== null && (
            <Col key={item.id} xs={12} md={4} className="mb-4">
              <StyledCard>
                <StyledCardImg variant="top" src={standard} alt={item.title} />
                <StyledCardBody>
                  <StyledCardText className="text-slate-500">
                    Unlock a world of exclusive benefits with our subscription plans. Choose the one that suits you best!
                  </StyledCardText>
                  <StyledCardTitle className="text-center font-bold mt-3">
                    ₹{item.unit_amount / 100} INR
                  </StyledCardTitle>
                  <StyledCardTitle className="text-center font-bold mt-3">{item.nickname}</StyledCardTitle>
                  <StyledButton
                    variant="primary"
                    onClick={() => createSession(item.id)}
                  >
                    Buy Now
                  </StyledButton>
                </StyledCardBody>
              </StyledCard>
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
}  

export default ArticlesPlan;
