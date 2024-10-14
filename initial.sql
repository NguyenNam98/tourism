-- Create schema for each module
CREATE SCHEMA privacy;
CREATE SCHEMA tour;
CREATE SCHEMA reservation;
CREATE SCHEMA "order";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================
-- User Authentication Schema
-- ===========================
CREATE TABLE privacy.auth (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    user_status INTEGER DEFAULT 0 NOT NULL, -- 0: inactive, 1: active, etc.
    login_type INTEGER DEFAULT 1 NOT NULL, -- 1: standard login, 2: social login
    mail_address VARCHAR(64),
    password VARCHAR(64),
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    role_id UUID, -- foreign key reference to roles table (if any)
    last_access_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    ip_address VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Store tokens for custom authentication (e.g., password reset, API tokens)
CREATE TABLE privacy.custom_token (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT FALSE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE NOT NULL,
    token TEXT NOT NULL,
    auth_id UUID NOT NULL REFERENCES privacy.auth(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Token history for refresh tokens and tracking devices
CREATE TABLE privacy.token_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT FALSE NOT NULL,
    device_id UUID,
    auth_id UUID NOT NULL REFERENCES privacy.auth(id),
    refresh_token VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Restaurant Schema
-- ===========================
CREATE TABLE reservation.restaurant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_range FLOAT NOT NULL, -- Minimum price range
    image VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0,
    type VARCHAR(50) NOT NULL,  -- New field for restaurant type (e.g., "Vietnam", "Western")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Reservation Schema
-- ===========================
CREATE TABLE reservation.reservation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES reservation.restaurant(id),
    note TEXT NULL,
    user_id UUID NOT NULL REFERENCES privacy.auth(id),
    date TIMESTAMP NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    no_persons INT NOT NULL,

    status INT DEFAULT 1 NOT NULL, -- 1: in-progress, 2: finished, 3: canceled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Food and Menu Items Schema
-- ===========================
CREATE TABLE "order".menu_item (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    status INT DEFAULT 1 NOT NULL, -- 1: serve, 2: not serve
    restaurant_id UUID REFERENCES reservation.restaurant(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price FLOAT NOT NULL,
    image VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Order Schema
-- ===========================
CREATE TABLE "order"."order" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    user_id UUID NOT NULL REFERENCES privacy.auth(id),
    name VARCHAR(16) NOT NULL,
    mobile VARCHAR NOT NULL,
    date TIMESTAMP NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    status INT NOT NULL, -- 1: in-progress, 2: paid, 3: canceled
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Order Items Schema
-- ===========================
CREATE TABLE "order".order_item (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR NULL,
    menu_item_id UUID NOT NULL REFERENCES "order".menu_item(id),
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Tour and Booking Schema
-- ===========================
CREATE TABLE tour.tour (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL, -- Price of the tour
    max_participant INT NOT NULL, -- Max participants allowed
    image VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Booking for tours
CREATE TABLE tour.booking_tour (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_valid BOOLEAN DEFAULT TRUE NOT NULL,
    user_id UUID NOT NULL REFERENCES privacy.auth(id),
    tour_id UUID NOT NULL REFERENCES tour.tour(id),
    booked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date TIMESTAMP NOT NULL, -- Assuming format "MM/YYYY"
    status INT DEFAULT 1 NOT NULL, -- 1: in-progress, 2: paid, 3: canceled
    name VARCHAR NOT NULL,
    mobile VARCHAR NOT NULL,
    max_participants INT NOT NULL,
    card_number VARCHAR NOT NULL,
    expiry_date VARCHAR NOT NULL, -- Assuming format "MM/YYYY"
    cvv VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ===========================
-- Data Insertion (sample)
-- ===========================

-- Insert Restaurants
INSERT INTO reservation.restaurant (id, name, location, description, price_range, image, rating, type, is_valid, created_at, updated_at)
VALUES 
(uuid_generate_v4(), 'Pho Paradise', 'Hanoi, Vietnam', 'Serving traditional Vietnamese Pho with a modern twist.', 10.99, 'https://whatsoninwollongong.com.au/wp-content/uploads/2023/10/Steamers-Bar-and-Grill-Wollongong-date-night.jpeg', 4.7, 'Vietnam', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Banh Mi Delight', 'Ho Chi Minh City, Vietnam', 'The best Banh Mi sandwiches, with fresh ingredients and unique sauces.', 5.5, 'https://s1.at.atcdn.net/wp-content/uploads/2021/08/Wolongong-fooddrinkhero.jpg', 4.5, 'Vietnam', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'The Burger Joint', 'New York, USA', 'Classic American burgers made with premium beef and fresh toppings.', 12.99, 'https://images.squarespace-cdn.com/content/v1/5f83d40d5fcfbb2127f78c84/1602478599030-CEIW5MU6QOAS9VV81LHQ/_DSC8075.jpg?format=2500w', 4.8, 'Western', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Steakhouse Deluxe', 'London, UK', 'High-end steakhouse offering the finest cuts of meat with an upscale atmosphere.', 50.0, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/68/00/33/steamers-interior.jpg?w=1200&h=-1&s=1', 4.6, 'Western', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'La Petit Bistro', 'Paris, France', 'A charming French bistro offering traditional French cuisine with a cozy ambiance.', 35.0, 'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg', 4.9, 'French', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Maison de Provence', 'Nice, France', 'A taste of Provence, featuring classic French dishes made with local ingredients.', 45.0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1200px-Restaurant_N%C3%A4sinneula.jpg', 4.7, 'French', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'BBQ Shack', 'Austin, USA', 'Texas-style BBQ with slow-smoked meats and savory sauces.', 18.99, 'https://www.hiddencitysecrets.com.au/wp-content/uploads/2024/05/Norths-Restaurants-Sydney-Restaurant-Cammeray-Top-Date-Night-Spots-Best-Dinners-Drinks-Friends-Family-Birthday-Good-After-Work-Drinks-Client-Dining-Live-Music-1.jpg', 4.9, 'Western', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Croissant & Co.', 'Lyon, France', 'Famous for its delicious croissants, pastries, and coffee.', 7.5, 'https://static.ffx.io/images/$zoom_0.36923076923076925%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/492e9cc1579bbe69d32942785dd18bce6e112905', 4.8, 'French', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Spring Roll House', 'Da Nang, Vietnam', 'Fresh and crispy spring rolls with a variety of fillings and dipping sauces.', 6.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qUkLoRk8b8TTkUUtsU2aXzfL9GlQj60C9w&s', 4.6, 'Vietnam', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Pasta Street', 'Los Angeles, USA', 'Offering handmade pasta with unique sauces and flavors inspired by Italian cuisine.', 22.5, 'https://cdn-fjadp.nitrocdn.com/sZLOiCOjZRTJJdDZEjFctknNWoWzWyRk/assets/images/optimized/rev-c280065/thisisboise.com/wp-content/uploads/2023/11/Tavolata-Italian-Restaurant-Boise.webp', 4.7, 'Western', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Food Menu Items
INSERT INTO "order".menu_item (id, title, description, price, image, is_valid, status, restaurant_id, created_at, updated_at)
VALUES 
(uuid_generate_v4(), 'Margherita Pizza', 'Classic Margherita Pizza with tomato sauce, fresh mozzarella, and basil.', 12.99, 'https://www.fornobravo.com/wp-content/uploads/2023/07/Margherita-Pizza-rotated.jpeg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Cheeseburger', 'Classic cheeseburger with premium beef patty, cheddar cheese, and fresh vegetables.', 10.49, 'https://rhubarbandcod.com/wp-content/uploads/2022/06/The-Classic-Cheeseburger-1.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Caesar Salad', 'Fresh Caesar Salad with crispy romaine, croutons, and creamy Caesar dressing.', 8.99, 'https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Spaghetti Carbonara', 'Classic Italian spaghetti carbonara with pancetta and a creamy sauce.', 13.5, 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Sushi Platter', 'Assorted sushi platter with fresh fish, rice, and soy sauce.', 18.99, 'https://niihaw.com/cdn/shop/products/shop_sushi_small_platter_1000x.jpg?v=1659431475', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Chicken Tacos', 'Delicious shredded chicken tacos served with fresh salsa and guacamole.', 9.99, 'https://www.allrecipes.com/thmb/UuPQ632-v8TVuGv3kH7buxuO_mw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/242342-fiesta-slow-cooker-shredded-chicken-tacos-ddmfs-3X2-0902-775cf5010b5b46cdbdf2ca50993628a9.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'BBQ Ribs', 'Texas-style BBQ ribs slow-cooked to perfection with a savory sauce.', 16.49, 'https://www.allrecipes.com/thmb/gVocwHi0RMwyjfJ1g6q8VHacxJU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/22469-Barbecue-Ribs-ddmfs-4x3-208-0221b0213517493494a29c1c76a8d1cc.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Pad Thai', 'Stir-fried noodles with shrimp, eggs, peanuts, and lime.', 11.99, 'https://assets.bonappetit.com/photos/63f79c61e1f4511cb9dc2de0/1:1/w_2560%2Cc_limit/022323-weeknight-pad-thai-lede.jpg', true, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tours
INSERT INTO tour.tour (id, title, description, location, price, max_participant, image, rating, is_valid, created_at, updated_at)
VALUES 
(uuid_generate_v4(), 'Sunset Safari', 'Experience a sunset safari in the Serengeti.', 'Serengeti, Tanzania', 450, 20, 'https://orchardtarneit.com.au/wp-content/uploads/2018/11/pexels-417142-1000x667.jpg', 4.8, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Ancient Egypt', 'Explore the pyramids and temples of Ancient Egypt.', 'Cairo, Egypt', 600, 30, 'https://www.pbs.org/wgbh/nova/media/original_images/explore-ancient-egypt-merl.jpg', 4.7, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Northern Lights', 'Witness the breathtaking Northern Lights in Reykjavik.', 'Reykjavik, Iceland', 1200, 15, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/06/1b/93.jpg', 4.9, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Great Wall', 'Walk along the ancient Great Wall of China.', 'Beijing, China', 350, 50, 'https://www.adventuresaroundasia.com/wp-content/uploads/2018/11/Wild-Wall-.jpg', 4.6, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Paris City', 'Explore the beautiful streets and landmarks of Paris.', 'Paris, France', 200, 30, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/e2/2e/47.jpg', 4.5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Amazon Rainforest', 'Adventure deep into the Amazon Rainforest.', 'Manaus, Brazil', 900, 10, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/c0/c1/2b/full-adventure.jpg?w=1200&h=-1&s=1', 4.9, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Grand Canyon', 'Experience the grandeur of the Grand Canyon.', 'Arizona, USA', 300, 40, 'https://aquabound.com/cdn/shop/articles/AB_Canyon.jpg?v=1632951577', 4.7, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Mount Everest', 'A journey to the base of Mount Everest.', 'Kathmandu, Nepal', 1500, 8, 'https://www.basecamptreknepal.com/wp-content/uploads/2016/06/Mount-Everest-base-camp-trek.jpg', 5.0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
