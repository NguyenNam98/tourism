import { RightCircleOutlined } from "@ant-design/icons";
import { Avatar, Card, Carousel, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { avatarSrc } from "~/utils/constants";

const { Meta } = Card;

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <MainContent>
        <HeaderContent>
          <Typography.Title level={4}>Hello Booker 👋</Typography.Title>
          <Avatar size={48} src={avatarSrc} />
        </HeaderContent>
        <Typography.Text>
          Your Journey, Your Table, Your Adventure
        </Typography.Text>

        <CarouselContainer>
          <StyledCarousel autoplay autoplaySpeed={2000}>
            <img
              src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?cs=srgb&dl=pexels-te-lensfix-380994-1371360.jpg&fm=jpg"
              alt="Slide 1"
              height={300}
            />
            <img
              src="https://static.toiimg.com/photo/103974251.cms"
              alt="Slide 2"
              height={300}
            />
            <img
              src="https://www.servest.co.za/wp-content/uploads/2019/10/Tourism-FM-Article.jpg"
              alt="Slide 3"
              height={300}
            />
            <img
              src="https://www.talaviation.com/Talaviation/UploadFiles/pgallery/201612711253290.jpg"
              alt="Slide 4"
              height={300}
            />
          </StyledCarousel>
        </CarouselContainer>

        <BookingIntro>
          <Typography.Title level={3}>Let's start booking</Typography.Title>
          <Typography.Text>
            Find the best restaurants, reserve your spot, and book your next
            tour, all in one place.
          </Typography.Text>
        </BookingIntro>

        <StyledCard
          cover={
            <img
              alt="Online Menu"
              src="https://assets.hongkiat.com/uploads/beautifully-designed-food-menus/13.jpg"
            />
          }
          actions={[
            <RightCircleOutlined
              key="menu"
              onClick={() => {
                navigate("/online-menu");
              }}
            />,
          ]}>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Online Menu"
            description="Browse our menu"
          />
        </StyledCard>

        <StyledCard
          cover={
            <img
              alt="Tour Booking"
              src="https://media.licdn.com/dms/image/D4D12AQGfaSf-Ax9M9g/article-cover_image-shrink_720_1280/0/1703589587805?e=2147483647&v=beta&t=eob17UKTl-I4mXw9cHTw3Gq9r5m4frB2H_gnof3UlZc"
            />
          }
          actions={[
            <RightCircleOutlined
              key="tour"
              onClick={() => {
                navigate("/tour-booking");
              }}
            />,
          ]}>
          <Meta
            avatar={
              <Avatar src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-600nw-542759665.jpg" />
            }
            title="Tour Booking"
            description="Book your adventure"
          />
        </StyledCard>

        <StyledCard
          cover={
            <img
              alt="Table Reservation"
              src="https://cdn3.tablecheck.com/menu_items/659776278e537901f16bf32a/images/xl/4d339b06.jpg?1704435524"
            />
          }
          actions={[
            <RightCircleOutlined
              key="reservation"
              onClick={() => {
                navigate("/table-reservation");
              }}
            />,
          ]}>
          <Meta
            avatar={
              <Avatar src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" />
            }
            title="Table Reservation"
            description="Reserve your table"
          />
        </StyledCard>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MainContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BookingIntro = styled.div`
  margin: 0.5rem 0;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-block: 1rem;
`;

const StyledCarousel = styled(Carousel)`
  width: 360px;
  height: 300px;
  margin-inline: -1rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
`;
