
CREATE schema privacy;
CREATE schema tour;
CREATE schema reservation;
CREATE schema "order";

CREATE TABLE privacy.auth (
                              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                              is_valid boolean DEFAULT true NOT NULL,
                              user_status integer DEFAULT 0 NOT NULL,
                              login_type integer DEFAULT 1 NOT NULL,
                              mail_address varchar(64),
                              password varchar(64),
                              first_name varchar(64),
                              last_name varchar(64),
                              role_id uuid,
                              last_access_at timestamp DEFAULT CURRENT_TIMESTAMP,
                              last_login_at timestamp,
                              ip_address varchar(64),
                              user_agent text,
                              created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                              updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE privacy.custom_token (
                                      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                      is_valid boolean DEFAULT false NOT NULL,
                                      is_used boolean DEFAULT false NOT NULL,
                                      token text NOT NULL,
                                      auth_id uuid NOT NULL,
                                      created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                      updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE privacy.token_history (
                                       id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                       is_valid boolean DEFAULT false NOT NULL,
                                       device_id uuid,
                                       auth_id uuid NOT NULL,
                                       refresh_token varchar(1000) NOT NULL,
                                       created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                       updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE tour.tour_services (
                                    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                    title varchar(255) NOT NULL,
                                    description text NOT NULL,
                                    location varchar(255) NOT NULL,
                                    tour_id uuid NOT NULL,
                                    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tour.tour (
                           id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                           is_valid boolean DEFAULT true NOT NULL,
                           title varchar(255) NOT NULL,
                           description text NOT NULL,
                           location varchar(255) NOT NULL,
                           price varchar(255) NOT NULL,
                           max_participant int NOT NULL,
                           created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                           updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE tour.booking_tour (
                                   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                   user_id uuid NOT NULL,
                                   tour_id uuid NOT NULL,
                                   booked_at varchar(255) NOT NULL,
                                   status int DEFAULT 1 NOT NULL, -- 1: in-progress, 2: paid, 3: canceled
                                   created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                   updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);



CREATE TABLE reservation.reservation (
                                         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                         is_valid boolean DEFAULT true NOT NULL,
                                         restaurant_id uuid NOT NULL,
                                         table_id uuid NOT NULL,
                                         note text NOT NULL,
                                         user_id uuid NOT NULL,
                                         start_at timestamp without time zone NOT NULL,
                                         end_at timestamp without time zone NOT NULL,
                                         status int DEFAULT 1 NOT NULL, -- 1: in-progress, 2: finished, 3: canceled
                                         created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                         updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE reservation.restaurant (
                                        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                        is_valid boolean DEFAULT true NOT NULL,
                                        location text NOT NULL,
                                        name text NOT NULL,
                                        description text NOT NULL,
                                        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE reservation.restaurant_table (
                                              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                              is_valid boolean DEFAULT true NOT NULL,
                                              table_number int NOT NULL,
                                              restaurant_id uuid NOT NULL,
                                              number_seat int NOT NULL,
                                              detail text NOT NULL,
                                              created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                              updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);



CREATE TABLE "order".menu_item(
                                  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                  is_valid boolean DEFAULT true NOT NULL,
                                  status int DEFAULT 1 NOT NULL, -- 1: serve, 2: not serve
                                  restaurant_id uuid NOT NULL,
                                  title varchar(255) NOT NULL,
                                  description text NOT NULL,
                                  price varchar(255) NOT NULL,
                                  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "order"."order" (
                                 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 table_id uuid NOT NULL,
                                 is_valid boolean DEFAULT true NOT NULL,
                                 restaurant_id uuid NOT NULL,
                                 user_id uuid NOT NULL,
                                 items uuid[] DEFAULT '{}' NOT NULL, -- array of UUIDs
                                 status int NOT NULL, -- 1: in-progress, 2: paid, 3: canceled
                                 created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                 updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
