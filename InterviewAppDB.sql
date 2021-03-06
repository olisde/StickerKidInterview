PGDMP     )            	    
    x            TableFootball    13.0    13.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    TableFootball    DATABASE     s   CREATE DATABASE "TableFootball" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "TableFootball";
                postgres    false            �            1259    16395    games    TABLE       CREATE TABLE public.games (
    "GameId" integer NOT NULL,
    "Player1" integer NOT NULL,
    "Player2" integer NOT NULL,
    "Player1Goals" integer NOT NULL,
    "Player2Goals" integer NOT NULL,
    "GamePlayed" date NOT NULL,
    "Updated" boolean DEFAULT false NOT NULL
);
    DROP TABLE public.games;
       public         heap    postgres    false            �            1259    16398    games_GameId_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN "GameId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."games_GameId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 1000000
    CACHE 1
);
            public          postgres    false    200            �            1259    16400    players    TABLE     �  CREATE TABLE public.players (
    "PlayerId" integer NOT NULL,
    "TeamPlayerName" text NOT NULL,
    "TotalGames" integer DEFAULT 0,
    "Wins" integer DEFAULT 0,
    "Losses" integer DEFAULT 0,
    "Ratio" real DEFAULT 0,
    "GF" integer DEFAULT 0,
    "GA" integer DEFAULT 0,
    "GD" integer DEFAULT 0,
    "IsTeam" boolean DEFAULT false NOT NULL,
    "P1" integer DEFAULT 0 NOT NULL,
    "P2" integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.players;
       public         heap    postgres    false            �            1259    16416    players_PlayerId_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN "PlayerId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."players_PlayerId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 1000000
    CACHE 1
);
            public          postgres    false    202            �          0    16395    games 
   TABLE DATA           x   COPY public.games ("GameId", "Player1", "Player2", "Player1Goals", "Player2Goals", "GamePlayed", "Updated") FROM stdin;
    public          postgres    false    200   &       �          0    16400    players 
   TABLE DATA           �   COPY public.players ("PlayerId", "TeamPlayerName", "TotalGames", "Wins", "Losses", "Ratio", "GF", "GA", "GD", "IsTeam", "P1", "P2") FROM stdin;
    public          postgres    false    202   C       �           0    0    games_GameId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."games_GameId_seq"', 143, true);
          public          postgres    false    201            �           0    0    players_PlayerId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."players_PlayerId_seq"', 29, true);
          public          postgres    false    203            5           2606    16419    games games_pk 
   CONSTRAINT     R   ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pk PRIMARY KEY ("GameId");
 8   ALTER TABLE ONLY public.games DROP CONSTRAINT games_pk;
       public            postgres    false    200            7           2606    16421 
   players id 
   CONSTRAINT     P   ALTER TABLE ONLY public.players
    ADD CONSTRAINT id PRIMARY KEY ("PlayerId");
 4   ALTER TABLE ONLY public.players DROP CONSTRAINT id;
       public            postgres    false    202            8           2606    16422    games Player1    FK CONSTRAINT     �   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "Player1" FOREIGN KEY ("Player1") REFERENCES public.players("PlayerId") ON UPDATE CASCADE ON DELETE CASCADE;
 9   ALTER TABLE ONLY public.games DROP CONSTRAINT "Player1";
       public          postgres    false    202    2871    200            9           2606    16427    games Player2    FK CONSTRAINT     �   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "Player2" FOREIGN KEY ("Player2") REFERENCES public.players("PlayerId") ON UPDATE CASCADE ON DELETE CASCADE;
 9   ALTER TABLE ONLY public.games DROP CONSTRAINT "Player2";
       public          postgres    false    2871    202    200            �      x������ � �      �      x������ � �     