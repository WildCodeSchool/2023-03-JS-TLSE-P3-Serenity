-- -----------------------------------------------------

-- Table `serenity`.`administrator`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`administrator` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `registration_number` VARCHAR(8) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NULL DEFAULT NULL,
        `firstname` VARCHAR(255) NULL DEFAULT NULL,
        `lastname` VARCHAR(255) NULL DEFAULT NULL,
        `role` VARCHAR(5) NOT NULL DEFAULT 'admin',
        PRIMARY KEY (`id`),
        UNIQUE INDEX `registration_number` (`registration_number` ASC) VISIBLE
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`form`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`form` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_type` VARCHAR(255) NULL DEFAULT NULL,
        `request_type` VARCHAR(255) NULL DEFAULT NULL,
        `request` VARCHAR(1000) NULL DEFAULT NULL,
        `is_read` TINYINT NULL DEFAULT '0',
        `is_done` TINYINT NULL DEFAULT '0',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`practician`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`practician` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `adeli_number` VARCHAR(9) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `mail` VARCHAR(255) NOT NULL,
        `speciality` VARCHAR(255) NULL DEFAULT NULL,
        `phone` VARCHAR(20) NULL DEFAULT NULL,
        `language` VARCHAR(255) NULL DEFAULT NULL,
        `biography` TEXT NULL DEFAULT NULL,
        `diploma` TEXT NULL DEFAULT NULL,
        `other_formation` TEXT NULL DEFAULT NULL,
        `experience` TEXT NULL DEFAULT NULL,
        `association` TEXT NULL DEFAULT NULL,
        `publication` TEXT NULL DEFAULT NULL,
        `award` TEXT NULL DEFAULT NULL,
        `picture` TEXT NULL DEFAULT NULL,
        `administrator_id` INT NOT NULL,
        `role` VARCHAR(10) NOT NULL DEFAULT "practician",
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `serenity`.`administrator` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `duration` VARCHAR(10) NOT NULL,
        `anesthesia` VARCHAR(6) NOT NULL,
        `practician_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_intervention_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `mail` VARCHAR(255) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `firstname` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(255) NOT NULL,
        `gender` VARCHAR(8) NULL DEFAULT NULL,
        `civility` VARCHAR(8) NULL DEFAULT NULL,
        `birthday` DATE NULL DEFAULT NULL,
        `birthname` VARCHAR(255) NULL DEFAULT NULL,
        `family_situation` VARCHAR(255) NULL DEFAULT NULL,
        `job` VARCHAR(255) NULL DEFAULT NULL,
        `children_number` INT NULL DEFAULT NULL,
        `street` VARCHAR(255) NULL DEFAULT NULL,
        `postal_code` VARCHAR(5) NULL DEFAULT NULL,
        `city` VARCHAR(255) NULL DEFAULT NULL,
        `country` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_firstname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_lastname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_phone` VARCHAR(20) NULL DEFAULT NULL,
        `role` VARCHAR(7) NOT NULL DEFAULT "patient",
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention_patient`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention_patient` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intervention_id` INT NOT NULL,
        `patient_id` INT NOT NULL,
        `intervention_date` DATE NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_intervention_has_patient_intervention1` FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`),
        CONSTRAINT `fk_intervention_has_patient_patient1` FOREIGN KEY (`patient_id`) REFERENCES `serenity`.`patient` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`theme_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`theme_ressource` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `theme` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`ressource` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `type` VARCHAR(255) NULL DEFAULT NULL,
        `url` TEXT NULL DEFAULT NULL,
        `description` TEXT NULL DEFAULT NULL,
        `practician_id` INT NOT NULL,
        `theme_ressource_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_ressource_practician` FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`),
        CONSTRAINT `fk_ressource_theme_ressource` FOREIGN KEY (`theme_ressource_id`) REFERENCES `serenity`.`theme_ressource` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention_ressource` (
        `intervention_id` INT NOT NULL,
        `ressource_id` INT NOT NULL,
        CONSTRAINT `fk_intervention_has_ressource_postop_intervention1` FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`),
        CONSTRAINT `fk_intervention_has_ressource_postop_ressource_postop1` FOREIGN KEY (`ressource_id`) REFERENCES `serenity`.`ressource` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient_intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient_intervention_ressource` (
        `intervention_patient_id` INT NOT NULL,
        `intervention_ressource_ressource_id` INT NOT NULL,
        `is_done` TINYINT NOT NULL,
        CONSTRAINT `fk_intervention_patient_has_intervention_ressource_descriptio1` FOREIGN KEY (
            `intervention_ressource_ressource_id`
        ) REFERENCES `serenity`.`intervention_ressource` (`ressource_id`),
        CONSTRAINT `fk_patient_intervention_ressource_intervention_patient1` FOREIGN KEY (`intervention_patient_id`) REFERENCES `serenity`.`intervention_patient` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`ressource_relax`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`ressource_relax` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `url` TEXT NOT NULL,
        `duration` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- INSERT INTO 'administrator'

-- -----------------------------------------------------

INSERT INTO
    administrator(
        registration_number,
        hashed_password,
        mail,
        firstname,
        lastname,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 8
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 8
        ),
        '1@1.com',
        'test',
        'test',
        'admin'
    );

-- -----------------------------------------------------

-- INSERT INTO 'practician'

-- -----------------------------------------------------

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test1P',
        'test1P',
        '1P@1.com',
        'test1',
        '123456789',
        1,
        "practician"
    );

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test2P',
        'test2P',
        '2P@2.com',
        'test2',
        '123456789',
        1,
        "practician"
    );

INSERT INTO
    practician(
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        speciality,
        phone,
        administrator_id,
        role
    )
VALUES(
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        SUBSTRING(
            MD5(RAND())
            FROM
                1 FOR 9
        ),
        'test3P',
        'test3P',
        '3P@3.com',
        'test3',
        '123456789',
        1,
        "practician"
    );

-- -----------------------------------------------------

-- INSERT INTO 'form'

-- -----------------------------------------------------

INSERT INTO
    form(
        user_type,
        request_type,
        request,
        is_read,
        is_done
    )
VALUES (
        "patient",
        "Demande de devis",
        "1Mz4gsU5g2QC6KOOP3dXP9m53151361FkP6Yod8AR",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "V1wsIDEJe3YS9RFTNAkwmjeq2Dyfk7hiJHX91rY9o9926p8XL",
        0,
        0
    ), (
        "admin",
        "Demande de réclamation",
        "fc69y1DkFqLL3507Y1pd4Q33XVoDFE7x2FKhEwJ1tdBbmUh2DYLrSzEJ24b0mKzi6KN68hKL91315920zh3304Xui1Z10NW6R53g5ru6Vh55a71782f0HIWnD3y8LYAY8WCxkj8n87Og6e391s1QY7Xv00bnXRzketI9C6DkR383KVo9k651JR8x5Omu10nxC89QtkVMdo001MXS543dv6cjUR37gQf981Xv5T2BnWlwLelwCbhncvoZO1cC66M242NiySor1l6y8qxP9w1Gs6ZDT9M8JngyKochVx60mcX0I480376fVb0557",
        0,
        0
    ), (
        "admin",
        "Demande de résiliation",
        "HG3U7Rh3OHW0f30pm8w6EpJJe1b3z6q2z4mFP4XaGZb013fD0GRa969H48a42WBSMLZNSK1962LhK1n0CXoM82LklK544gzHNvf28s9dh3J81fpAZ24f6M136AN4n8blbZGn04IgN6R6Su7TjtQtmVGkIn7Rvm2FtA7uiNO5Grgjmbo314No6R600Lzr5jhw8mUdItLF0BgYZXzJfUVoU8Ru3T32J9pbBPrYzB4cYDFVHO6FzsN3D5zP91Vc6ZIbwGeXTU4YyvllUZd0bl78vZQDwnsJ9D350KnJR4Ea74T280Y306GkgJBTCn0S0dD1JxWW5FEwupMIs07o7iF98wiQI025y14w3nMEf8Ey53vW7jO8i52F0DabiUzvkNS4Fsz7Cw1cMLH3dkJ3igGk30mf0aSy4F4RB73i3xe11Ee52",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "3xikLBmH7hPZuWyfFNkuUU6Zlpj19Cd92792Mh3SqzSI3id5hQ3Pfgbngku8006hTo5V0HMBwC7X9Ap8w16Frib6526E2LXLXmbLBJzGQysIcKdG36JmqhHbOZPV7ktKINoOYIS03S3ig04K4VBz23XW0oVJISQc6it14qgz3xWPqXjw8p9l6s7YB5WgK6r94G8D5xr99qm0tT6YUOCpRaFje3PcpMqa0E8mJYTkPTDTnyTcg243NhtcJmD408VZK8VvVsXkZJU1S1k7I622bCt0OUVtijFhkAHXVLj2SzdfS2Yd7lBTkKUfN515S5Kdp1Xwl75M3LtEC0eKqaB7xx0dcMT9W36DHXZbE4krP6m0SNGkE3uXP001AFMMVb2oiCs8W8Gc6nSfPLk474I7EF1FZ2Eg8nGS",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "31LllxPtQ9MyrnKxNvTkqVQamRKo674s72oXk6zI3L19Ow5HjdycYPR5r9XfkQPJr8DbJIJJJrBRD883r81OX8KOwiJ5R2Kmu3GkR5njj19U6Bq1TaxwE1JSdUP8htBjk850b825ePQH8cSZ00VFd5VcmnUca77SV35YyYTJI5hV7f4MVZ0O0W6423tjv7vK50kJHkW0cN3XnVGk31mKs8nEatSj2FJuD6RL18Var34UUfzLrrFFh43HZQd2u6i7d5Cb8N0axuwPO1VFOUbE8wV4Hw1paoY6QJ3U6iesXd5V6p5gfSg7TJHLpWT3caKr1W95jfimJ3UTnCCTMHrL7nKXsTMTo7uPIU59YLNUW870Ucp4v6Dy9N6Hs0C6b6lHU2U1rqpWAwiBY4PmIg68k20eaA3lxWXdK6K02Ui6b0oYDu2lX0S4yl1vE27Qwyf5O00FN1R2GLEgSTMn9jC26S7yyn5ziT6Q2kDVF7HL9xw6aF1zbqnWtfoQTZF7QxcSVfL2gNZLb8JyIZtPs77Z0IYLjzy1RGj1gs2EIEiZpkjwcLf153SvW1J95C5bIcj7820D7zX5GR7XbQwoIFT52D1eC1iE051Zc59fkA8J8yDS09Z",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "842402BNlGcpYM9g2P2Vm5SdzaJFe7999q5WfLN7j7jQtP3uZ6daZj2EzawUr7bjcHe7T7vR58Om9nf3JeIfIin2S1zV2moLYj8zzzv7oLws76UjvU1nnP7bYt2jHnhp0L1j9f29o6bPpO33XC0Y81ABFE1zVy9y3RKMAktM8Fn42WwWzcxFicBTJi7fMguUoR91cq5owx625lb0eA7r3Z43i66KG53hUWRliy7e01lmu1P2Yw67dt3oqj5R4508sjYeXIOC0e95D533mf7uzOePLf4n078g3G4jc9ML65z41dX15V2D4aJEjjPKCclMgs4oQR7DHIETR0Y332Z0R6A0CACJ8fh422R661B0OS1RmQh62O563KUiYmuLXS1fTB1pU6pu2g4kI0sGsS4oytG4r49YOb8jiatPyeBHIS07UOh7OGK9Le8xnq28vvG1da1grpqd7U7GQ724v070O96ti3e6j27QQkQj4V0z945iHbf4s9J5QS9E10ueLjUVflA33lHHLv4G3Q536522Ap600G2qghkx3MfG1Y7evsbH6mFvsvuibM75xac56O1698IY28GSFpDxKbtckJTRKnnHY9UGC5zu36vCUXDAceYfTn8g0Bws1m4DU0RFu03erBo78290Fc1Wgmg56bK7m4G6G98wXDnNCsuLCzRyE3O39U2JK66MVl8iP8fLEMbgtYx0fk162puxH3brOg6aip37EJrl678l7h9sdpWd6yWAloUTpqpk5ovyuIr4AfilF396uDD3U8V8Nzs9ZhHwDW13ub7LVe4wDfcZjGtGJPdctKpKhD1wE5csZf5Ywh8C9I8c3zl77RqHa6Ey9RTU6q8MW4TbH5zzRHjdiU9naICvFaO4A942lP8",
        0,
        0
    ), (
        "patient",
        "Demande de résiliation",
        "3Z59AV7e4OGFE8W6h0eIL491Bu67MrK621T2l69Fu856s9KGhon9p54YV6EHC2OSR0RuuuK7VhgbRfi6Kwv5WXqlrtvv5jav2108lLT9q19QD6g00F8CIyt1zjB327TbkIHS1E4RV1U0Mu6TatVyxk7CaS63Cfi3A4eVN4i5ldb9mywug5Z7b8S8014PY3il53JNU4JpuJEveOAPkDeom04GNEKqtlb09r5mE5G1O4Z18ux382gF3iz3Pa417aPVJSET5SQK5w7DpvX6sM1ldS3l9915UVd5qKxrBA16A91gxJg2UHxhcKA70YKsRcmPz9oEOg9BWd0a81SII2bjjIM2Uj2quOxbS5g0gBIR595mS02RmDSy5",
        0,
        0
    ), (
        "admin",
        "Demande de support technique",
        "U97VgiPi7J9yr0DP8c0fLKTIMwJHMv1dduL4xiRq21IQ9y6YGN85SCBfOz47hu2hG1062qU8v85pSO8tC5FG8jWZYmz3Tp6omt4vAv5dzc3z9c3DEEVi2En7d6w48hNbPS0P1K4B55Wh1zL438kM9MeL6pItw4T8Qa1ePCvJplOZq5s0U32J6123hv6LR9C61TYL8hpcWC09031iB0QTg50N0qEw9WB7H7x2",
        0,
        0
    ), (
        "patient",
        "Demande de support technique",
        "3St216r11hsAe3JK85wDvMDdOU7474344wNVIhug3kOfyPnnl6ty2cqvQl1ryGQH9G8YJ4l9FJK4p6QjR0B7SK89T8NCiQ38785Pfi3a41xtalHnDM4dg1bpqt8Td0V66sS4VA1wAH6PiB22OHx4DSU63c66l40QkZrIfUns0Is2RcKpjR0ETxW0bTTMZ8jh067HMRlgf4o4Vf7D29f3mBto4y56kYq93lCIR1WG64fAeveH6YtKmW61DsC6dwuh833oykW05E51972971xpXwjF8L7t0FG1ykou148cOeUjvrSD650hqFzFYyAcnyBjbIq0LX1Nn7polgu93LwhCulMN0d9QNK52XZ3E11a623QhHi8Gzsky75230yOiNxTij6lcU2MVj475p5WQKKxgg7tMcyOuhLDVwBvRmSlx7qd6Rfn2dld9720Lka",
        0,
        0
    ), (
        "admin",
        "Demande de résiliation",
        "kx4Umvy8OC6ylXvK5nN9SWTAt4Ld4NFpCq01f4MxO521dxz8Rk71KjBB61Kc565K6g8Cj5i23Y6te0tUgK01nmd7iAH15Z4s292OZcwAM7H346RzOipo6obpD5V09a0nUjAfp9Zdr6TroeMx19AtsAHIdvJfdP1GOk4BZc0qp480jMahf4cTen0DsBsG8AYyOaF12t00u12lWg2ZR9qkkD70M9FdrkE2Ein1AdZKcnje7Uk8zYd63N5C9K5MLEdjrJ35IuDOiQ3sN83Ur70ffDyR7De6bL589Mp9Sn19706V2Rp71Z9mkotDi30o60OiKoUi2W986hKTKWOoyyPV84YSB2lS49LhiK8d8AqG0Mf59x229mh4dHUohxV2920skY8835UvC5861cF80w7rGUKE1eDec5305YqHwPZe5hgOONXQYZl65GfIoTE60J",
        0,
        0
    ), (
        "practician",
        "Demande de devis",
        "AtvunI992I84P09j9Hb8hRE37XCCQ68CPcehtbVp2TwQZy10nPJnyD86Wi37Mjpr2XY9y562AG5g8e9sM746g2c15w4OfE8W21DZLZ023cer4yME0UN8yDg01EkDLf4yGb2p0oB2CrYFlp7LW2zpoYs3ymI2e1Ppaz470W5yG68e2GKzTqAEYcOCcXR0D5f8bJch0uQR1C1w53emq4L9AjO6Qkm1806s0kCeCi530Gdc91yY4219D09z51ulP253ScHxVrxqA71X71QEUN4f3p7rMrDl16DB27EfYXu732KDZ902hmJgIG9L4mkMW2oVIR8B8LIx8Ua70OFvto7ECOAL50Cfk4GlL7R34925C2T5EbiauvSmb2iT9M002jar1h3rGCOBgM4M5MUm4EV9Tf2mkt4d1",
        0,
        0
    ), (
        "admin",
        "Demande de devis",
        "hu7qw7UoKWOiWsn3Y6pZejmbhwFZaEejajI55VBUS8qCvkIQb7pvsHTM8Z8A2pIzF22l300H7xD6Nt58n0rTGJQ5lT1DD5CgzA1R1p4VgBHZs9ET7B44TzXEGcV03eZmBOAlQgAK7V0kJ40vbE47vg7Z473xNHi5UmGzuHazod0vZBG71D45A891U9pPSfS3LmPO9ZLbYsTn8DJO1O8frpK3PeVwcZ4OSZ349KfZMGq39zWSaSXyqtYi5329t23f3ip61n3Zs6BR9ux76HAJglNb490Gr3usSnukiSCo55M7kJI18vzBLFclca3s7v41dC31LY67fenOV1B7803yTEjtHonbp63W4t65wSQ26834qf7RFptP9Zuc6cLz4Xs85Q28UFMZcD3875JE35IHxKuELf77H6P4I34bUM6WCHSyC2CsRP8GJvM11A8Av951dJV65920sDQ9E3aa1G9ZwEc1n79297tghy34t6CmYGa9C600i8R1IZ6FA5HBywrfqhk18qfVRSstIouT940OX1Jp6dFP028r0Hs7vYghIM69EvI9472RY7q2u1Hv8W68O1UCTrATOgheai07Xz6K08Rp5270l23FVR16D68xBFx8rI0Vn1uQWCRwDUrXSuMtxph1T3SQXlJcM8wwbhRtq8fVut11BTDMB1VDj866fQWA2NMVr94fBr9rH6JCjp3nIP0o8R5ucsdC2h5u67X4S4re6YE9SA47u4aS05HI6099sC574pu38E6gd7s9Dm0Br",
        0,
        0
    ), (
        "admin",
        "Demande de devis",
        "jpDMcAz7sAzA8NMq224mM97bYtgCu7LcSsF3b17WE63",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "dD6MX7BrMO139J868m7oXdTNsnKI0V7631SoJBEO7LA5pJ37SKX5Et9mLK6V6O4WURk5KbfsXQq85LHMBE47io25Y9ZjhiG1Dm89LL6XIJWp1MFwUv45zDGp5MvO55uJaJEyAxKJ4iP93MTUHvByrc5K5aU5ts4v1WdXhQ",
        0,
        0
    ), (
        "admin",
        "Demande de résiliation",
        "Er0plh7lZV6u9oi6kql7k363GMRFvH5Mwhs8E7YrWgJ8aOIz2zPTJoCZr041aLdWr0lhwsIbM27rpvoPKd7Pz6O52wESfJjwk285F8qS9SJHo8tBX31qx42Z9bEHf7cMF7jfV5vxQeqPkMNiHpO9yhpCT0235q2R9J0v857ers5U3Q5JIZSgF003kg98ay2DCfyh9kePW15hsp37UGcK7kn00457Hr2z28j3tF591hidr7oD997i8OjQtvz1yssA832n3krwbaHY8fJ3v24f19QKyw3KqyVLxQz47wZFJHR6Mgl7bN5pENog9ijcx2E74xbIl30W7kKWae6pLrg1xrr6QxC526ISc5HqOczd594y4J76oXi8U12OEko528H4UV6gboQmKxc4YRA9x1564819SbxDe4tqAZ4Us8yat54gsv1ry77G6Wj0OWzi4CZDg91ql14Kl34M36lI1dFsrn9e86P2T80420Q58z8Y4hJX4UkNu4gtfZR8ddl3v63Z7ujVtuGgP8VEai96kP5y9oky66EGn86uHS6O9YP5IyEt11x058cmefA1l3tZ9gMN53U3cZp1layBckrph4e6Mr8B8604oP2uiEF8tEBSq9t21xGbTL3w517iPp931LCUa3H66H1GOsY878h6AqR7tf5eqG687Y3Ijpcgu",
        0,
        0
    ), (
        "patient",
        "Demande de support technique",
        "JHD1dT9bQKX8EI07KkuS6SOkX9t0eH0ZC9n7l2LdEey535Un2J5KdT7M7gi9Z473Dzob924VhN99H50bpWHd3T97vrp28Vls1Nk692fXTM62jrKma9SkjYoN1NXtUMPQDlgU0QAjC91uvQkB",
        0,
        0
    ), (
        "patient",
        "Demande de résiliation",
        "lBi6OI7fK62M9Zi8r3vaQYCXL1El01OBarpL0z8PM27sj03I",
        0,
        0
    ), (
        "admin",
        "Demande de renseignements",
        "gfNiCT0Qkc60Jz6j41Qx6Ctf7eeYv0Y5ZrnELNNI19552p4gG12go4iiavi7O3cP349LYlCLtdgjpy8gs68V2t967IBT72H2D08BwSl3OVK47Q57B2n2LtJE1SxwV1b0WP0Y44084krTeOvg7nN5JvU644Vd31SsjbfwQYk4Plhp14NR0Fh6JPO1EKsKQmkxT8uy8y3j73u25kiWtolPC16oOQrDDJ2xCx8P8hkC6Hv6tF61Z6thT3Gh10RTOw42BGiS4UmF9V62kNvkujX03ii1c6VLII0Ky42d47b3kmbU7w0QOie15QdMAXSt1xORu807MI4FtcuKQ039R4FM14S15MJ39KuqJbq54YP1Au78CiAaaD7qGF9ik2Uo3o930309X1u89CafKIRb21861DftdZ2T1n4UrtLGt4quEXjQSiI8LqI2fpKifxdcNhHB93KrCdqkht2ZfFrUbWtc4t5fBReCKvJS3LVuWbhKLokTmn0Fz2h34cYpHKu7pJ2EOW6w5HxKeu7lAnEXN1fNG7OYK6dnO1za7b7E5eWrLen6GDlrh38mGpiZIwsbv84TV0440m7q8gh6mGPj4WfLfJC0HX22d8cerW2MsY4UyRry4oqV3a7Kf06WTIx43o23rr4m7HrDyWGOXHeX0F387q7bCF29Rq29Ay8x0j8747YAJ0s6LXIMD99cg8qGIKlGsh2Gedavg6Lw6OtKGQ0S7G99kI366J2X2Nj2K6TblS1rlG1JLP786gp7UTtl77G3q0X955U0VI1oX243xa3PHZT6s4958wi059k4AD0tE4k3u4cr5E13o2Q55A00125HwXas4zj6dI1ybJP8F0sNsiHiHRpz3LNnAF5HRzN6CG7DA7pq8wHy86ZpJe7FZLay314j2HvGo97kPV7jWIS3DAplX6hskRnkJ23mCAEiDkDkC4Si1q7oNPJwaR54L12yTX3GKG40lpv5pq1608u4cjK9NU0MJJnT4",
        0,
        0
    ), (
        "admin",
        "Demande de devis",
        "KRwN6W1NLuA0YLtVigP2lw16x56DRFrMgwZ5EluRCUx9dZB44S0xfFjV9dxeYuBRy07i2LV8MaY16m7YOL5s77s40hStc48kkG9Hx4ZE2GL4jIWG3jJ17Z6gKv7Pai973152lC2fW47QeTyML7rz3Ez815504e2d46UhSrU966uaWTi09B9P5S6LJ9qW6F2au8U64Cp4DOTCcdi2kqcStY97egy0Hj17O1KcqHwro9qOIa4x8emlYU0K4KuLm272GK6FoBxZR7evCzh91KT6Zl4RK37Pp5pa4Uk7TkHuPrRDncm6QPL27VoJ96dk8Zy5bZ85cf6Ue3gAb5Y65T0tXUwU7jtv2g44qz4H9Y6rHFmShnYZu40XCrN5cM1dsPvTED4cg6tj97pI8Cme455AUROPX5if3N9w3E479es8rg4s7C62o6511hR70y141Ux44m2ypJj6lFluJ42EvAa612n12R6Ool2OF0CE11dvq9y3zORq2E61MyluCA1sN78za395rzjr9nQ8vQ7E2jNGZ3Aq648ub1CL10NFMmIO6cqdLY8R9tO91yOqk0zdRZ8r719cDPPzcNoCVf754ttym9IYSAV5id6QhND0dGhYOIbIS2SAlB4Yg9675wNQYr098Zqiye0FW3zgu7N2DaRwLriFz4NYnE7z7P9Q91E5836mrHy3Mk9ZC6zfNJaPqm5cL13pfmn2JF1isc4m83BPzTibF0JSN96P0V6R3yEf3qnKDkNxRp9t1v405mX5dLNQ781D6698fnbMRK5ABKh8z92wXSWRTD0fjH493XjFm9yxZMh3wWne4640JY5Y4sWEe5j7722Wcm7ApD0LJf0tDj287a06ixVU6Pf2x281kK4lL1YmTh4J5qCOEPuM12Bjrop",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "tmeNh6r4k32U8cN838dz17Uv7052j16MrF139V5G4FZ41LNS5kPvzJUd04vOEToGBTu6HCMK6BLmD1oG5ZrdHGoI8ik4l4Oev9TWdpRm58jaN3GRM6bw0Zpgd9O2hx6o9",
        0,
        0
    ), (
        "admin",
        "Demande de résiliation",
        "L8XCr3mgAihw7WV3VL56ZHUz42WzTnFXhRWd6se0l3350mTmbT3J0sqY19Tjdzh2o5plv7NYp5t9gX6aawGIs3R7c4583el5W03ZE21xxYTmE88K3M9tgtx9wuI36r4m16ye6X7TAGM1sKzY3M5VqF3fktkVAjxI27pDfo5f3ir0KtUKd2P0GJ8ngPSCWQ3OTOXbj60S5KrbL2z2g9x8tVn1Y31s154QXVXevpyK4EtULfg29H1ngX6M086Ro7z79vkbLaKULzar53xn0z8Pu51SF7vn7jUqwC676R47QUZ7Ai1clB6kQJTe7323C1Zm78VJX0Fr1x1n4ym0g5QzsfHt0pCokdw6X9uAQ8Z5b375jO5fT3YZQuf4Qj54Rnv0MWU676U2JLWa6RHEJijoL89IKvtU20Km2k80X5N1EE8QZkjX664SwQ9M7LNtbo5r31eM4G2217z5JpS78r8U31HtA4oxQP1bY3pzv48u04maKg25sTeTG65fXudSQ60w85twjS0otf7y6odzz35co6ZJ29kqf397ubV9DoL7MIwHHyp6UR959snv8sgEPCodJ4Uo7cqH3w1pNqdPm6U7CBskIQXcLoy1qeEcXj0sjFszFtXBPFz13eEuIo18k0z7ow1699auEplYfQ4GOy7KFvv729m07iNHrBql601C6bxoh76S2u5x21KW28F061hnM4ALBg6v26IL6oD6468Jmi6ra4vnc6lv80DyJLTRD0AewPYLzh16P6fa6NOaApOFs3QbwYPv50Q0d93zjF61096Db2",
        0,
        0
    ), (
        "practician",
        "Demande de résiliation",
        "Okji35l8aruhlz6HeE78wpDJaUUV287B5s76ZqJ86aE3F48hmm372T6lE068ZQ4jHRQVZV407W00tXKVDbLn38wp97eC42Q1r5iWEmYZ1VrCuD8N5GfA99VJIP75w95738ecPnPbKa4r47G2qG8DsceBtA5TiOm0Fl1f8E8jH2r82Iv8p2lh41X27Zll3c7H1eeU4906G4xTaAG9zG7f9vR2M5irK11Er25UCheSvbXa7S4MCt582y0y8F2X4Tf9O5rQEZPSWE0Br2GnuNW2S2BalvLU31sy6guFiRv0tki0Ebx7G55vE93QwLJ9RILmig8Pe9lqpUXM6qQ9CPahJ2MZOycLF9kSi0yU6xXveGshW4ZbHSGvb9y1r24fdbG97sQw5pSpg5VRD107cUeOWc5SYNnTZNu3zbl76PkQXXdKNT65E19Ox4oFJO4Yi482eT6o6ViQ7X5GymH5AoD5hI2xW49r91Qg8Sh046XrZ6kC069TaTTHR6zzQjTf7e2viLIt06BX9AlrPx5H9KRnOC07hNlFFTK7Y7qG3vFYF4Ai12PY2948oeajDl2C2678k8GZy9ovEJux1MAEVK7g2RiCztZ435y8CZZfQfI85lsSSO1Ax5u031xSgTJk3J3j03cKaFA3NV1wu2yQH80I8B2Dnwd9G43x91n024GEHvNeE1K98M15Rbe4bTC0363ji5MxmUM7v922733O1n27R9BHd4bYVxH2kclkFTXrm72yCE5610o437h65afAE63RRP7zWFMKIYNhA1MF36sqrPZU1530nteffCGU4DbMPEX64iX5pdTAW1gltlIK2niPtTgM28i5gCrw8VH9xGBI6bBMl8lfvSC41L7ze22rn3L6PcW3",
        0,
        0
    ), (
        "admin",
        "Demande de devis",
        "flXcu9um85TKrO9oZ142MYw9VEfzct67JRq6iA8qHZ675yK0Am0vt8PhddPtr8w0HdO84H1MQB1l2396beviZtI56iR43GL5c0L1948pHrrfE9q7D4OvN5k4HFPVIdzrAyvvGAHtsEj9u3SoMna442m0J2zLpsr6UuDQTA0n30KJfi3z8r4BP8906v1027TIi1mfbKzg9N9d7ZgpG5OmdN0XhdfNOTrH454ks7095di56My74BExXbA0kg599U74wuW77WQ6ieQ1994iUoTWF91vk4G39eh2Yb3g414Lez4oDfn2iP9b5iRksKEECElljnr9Pg6043oJMKleYUx891EX4J4RDl73mS285oY3AvM1Lj5vHH29je18ElL1c3BVMlDvk20CfU1EDj4w76X0A0q3vTGKM3CTUc4H5H4vwQkOFO5a6umTwC1hk09wW8",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "B79SM8iiOkUgvvq1p308AuWplc0r9A4hNsMIaXocQh576Y67F8e18nzHwbwOpA1C0xM8W9J93EINxpzW8g4zJ6165jL8r6k24318Xd2qXB5i7e9s96zyh16y1f5eYlq0kl1PZ2kEbVr543Mkc203x6f7OdpRiL2K0H95A62r7Ps1O2w0LgNXNfj99f6N4icthV9FShe8jrVE9rAEft7qnZ7cZ2CQlXSWB62DxUyyo6Ak34LT5t2fZ61Vl332mTN28J3jZXyf07B73IxemI7NF4E3FYip6v8Q694U7gDdkpjgGJ6FWt2uFjtKMO14w5q7fIwN8bpk46OX2VW3Hk8hhHDj53l9p0867ev7qRkBWLa3Tjt5Z9n9pxA3yw1epqaowt9oBvMKQQUeHx0bcdr35hoAY848RiTWdA7Fw4vFzrb0hdof",
        0,
        0
    ), (
        "practician",
        "Demande de devis",
        "h4RN6vEV3vF2u1ofRRm490600nB60gsU51E8dOU4DY3Hc1y8iY7B6cg7y798H3hh7HQFXs7G76SL6A1Cdn1HQa4ibSA6ZpK0IFKABKrJ61FtA6iQP8LRG925I5veJ91t5BBwqG339eYZ3661L17GoHkJQzMXfuW00H3S0H5lqSePlGkMIAJUj7zz7d6YrVHB79kbmkMkb90HNAKPX0rEcYUlUh5mgV36Pn0mKED0VLr6UU85X35KT3KJ85ekI1M7QSnyge1267uh813ZnziQ0pIX55h51tF8oBZu3vO20B5D3glNt3Ebw43QBsSdnnFa8OrOTfzx4j9OgTWbzO19pYhYc36oRGV1S64wo5z4992Q8AjJq26hEU9I9IHzYWS76eghHDN9a95vr62yTDum4a4kuTOG2I81hT17EI4iARG1NLsOgbBeuJ78v87LDqnHQNLiOT5Uv2tr0Kr6BGu7pHzBBlgLgI7Xy7LADDS62o09u0jTB6BE8a4Oxp3cgPUcnY0C8AYi1ga544LkP86X2NyN7hFs0f7X4JJCg8fc6Z1p8G85xHP3fgheF7GyIcbNCDxJ9L9hj44HpId9Ih6HiuUtQ16IsR7tEWV8gv148Vf70p73KX6h46dk4RXBJDQKG4",
        0,
        0
    ), (
        "practician",
        "Demande de devis",
        "27gD6vE2Qd0jP7FxPf3rfe7Bdn4A74Ev70RCufrtnZF9iXRS7Id4baU20wRNq4XNgjR42w0g4ot4S2vZ8YaEHtSyUEjJagVwe1F598qr33j00W61F1Q7ZHEywbQA12V9505hq3469ya8w02ulvZ512u",
        0,
        0
    ), (
        "admin",
        "Demande de devis",
        "99vaAw9M311u6xHGXz8FqMm5d3nC681hGM36l0csBUj02g4L3sFjo72s2r0022a2LVI4dRxW1412782e21R0PiB3tit33BYrA3jMPjq3xG6ClVHlmylV6g3wQZ5yMHzvTpP3Z3T8Oy0e8Cb7P9g01IW1n4BVp4YyPF108I8Hn70GSgl9i6oz1IudfrDn3beeujZ46Mrtve6jzXK4004XkEp2b8460R5Iw2J72b18IeVG7oZ8Kf8WGA3OIvWiKhGPM3CGvc6PGnYxTqvx4b0l5rx19JNsA7zu2FsAdPmNJb6lsS3A5k4801q3E8t4C54IzMc8biYQo6sW67G3N55khn9Qvt2M3VSuH7Xjq7037rDP837Zxs31lT394hKgL5BmkcAkOWa1ucSbu46N6dlw4jH3IYV4WSK7q8SKPz75FMj9We2mHiePI84q5y7Eo1s48XA8y59k2k8KCnV7xj16H6srJtVC0376g4uu9M18xMiC57rt15v2x0MATHz3I2rKxX8zsqIy24k5OjYRC9T3fuW8T2p8q8DzEOd6I3b1Px9z3459ELOy7zOyZip50ODdcHU1DAJS25Hx67PS5y5Sj530s",
        0,
        0
    ), (
        "practician",
        "Demande de réclamation",
        "HXV6XJ0KNeXtdY0AGD1BURXfZW2L9t46guCtw3AimlJWwcAhAs8MVAEhzyrcpY9Bp1927ZE7lbDYeBVFxUpGjm92oBWLLpAb28B8kl5wk3I3npTj9grz6fiYlTMPa9mD8x88D99W4zQ95843dpHK88i7G2Sv2v3r8L8VCEQ9kEE0vFX9QiFDzFBUaIs9b3Rm3595o23U7iO5Rc0Rn9BQNI1cl8mJQpxBY6uU2WwGSZ1kFy81614zvTPFs2dF59A867dNP7OnWB3nPaVS76x07URzs5t18076BpH67YCYXX5z1ld5TQrd34k7D",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "l367Y2WmGMeiUXaY89F01lFG0fjI2sM2qjD7AE516H9Rk15T42Yu4RoAFH6k1WWgnY5EE2yX7DP93kvFAC2rDFP08rADpWeC8oyEj2NPCERm2cqz5IsLBVxKoq4x0lPkNnOpA8aGg4u7VODkn05OTMF156l5duFfyr1qR8GlaXfoaR7wajaF2j6xdpDoAqu1CIxn98MnqN3GNcTR05UnLUV961OaTugZhNVetfnP6sB34jhf6EYClaGVk1tIb0733OY0NevsYus2vD3MT63gjPYortNY3Zi7mR0ZXq9sz7z0d6RFp6A4BMU30jUZTTs1l1M0J466YNzZ6ZhWz7atL1h29c2CtT5bEF40yaLW1sG0TDZeyIHnVJv6nmk8pbt0JrN1i60yrRu3fK82jAjBGdn8NRAJTUU0hRcL7Cl99hY31xhr3krcwdj01C6pgy92nJzJ0mI75gE08QIRVzbvZcm0Ik9BCL3HY88B7R2OgWS3qO2mPkvdcHN4",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "gVpEJ00QWj4fRacd80uZ9m1zY1Acof9W27oxA4DrGkxiZa618amk88M0g5mkH29Cx00CZm3VdY0XR2ikJ3ZmOTVLVq9Clp99NA97ydz71B6285sc6r8pl857V5QCH6Fd8eJr2237ReOpWJf3HZluYSPa0ZiP9ji18f7sWR0JKeqBWUAIJ85N8e1r0zh4m7hmd80pt22w37XSlGq1X1EzPqX4L6idl6nG73066n5Pkdw0sh3",
        0,
        0
    ), (
        "practician",
        "Demande de réclamation",
        "j7pEERNU7FBK630FhphvUCJ7qw3El83kB5NjTV4179Am1wp7NQZo2PY7L6zhQU5tYSJu2860G7A8Pt1lXu37d1eWZ4m91i0lJ56fK02sxNz44AqTw47KzroXDJz2AF1YdT7JdARQbq8X2T8sy0HBWrEnM828s7VjjFRDk9WDk69kWT",
        0,
        0
    ), (
        "patient",
        "Demande de réclamation",
        "6pfwZGn2kMEthBH8GHS4435CWKQgPyyg9swP6QCa71gERi02LGrJi1DC6Uq87e6t1pFM90Q6Zby7nNr3sim6YjmckR8o7tl7OP0gpS37Mw9MP7sFTOm4mXjQ563SUFur1FLeRg8hcTzHjwr0AMqX4270xD66rnYPW7WH4458Eqf7GjfK2Ry8xElgX9Wx2ICKRF6xvN75fToZ39bJNc95dhm3Kwe33i0GRmEBx6aDdl984vn2VluSK3BNP7Dv167h8WZDT17oLAIP8h12y1axAxjQZRLFInUoU8r243gahZh5flQNz5UuZ45P7f1I79m7M72ObT531Y15ln0F6jYaeE1p0sauAgOcIr0N9SBsel9Cwy5O3X2J1QTs33Ew2FHz58P7t5cPW5u3X96YA65K8a6988CHTQMe64r",
        0,
        0
    ), (
        "patient",
        "Demande de réclamation",
        "66mwlCw42CrW80q0Rhm3Ia74Q9tHQ1XBMKJ7Eu186i755Tl7g49vIfIR31S9Ct394cbsT7L4Gm67LabTcEkj65uEz2qA9wHWV062zPJ41iR4fC83kB8hKy129t1186pV2TNI03z6RX79380v8v9o431216T1YQt98u8bi1qI1J7jm4oMm9JlI3rbkkld24xN2s53y5JXra3rrv5x4rO5JG0V2f68t20YiHh68YlmTPA1E101q55l4rjhk22Od6r2S2yAgYBabu1hwbnIcdK2uFwgVMlOZW01zwYM8Y1JgVrG4I8zefu",
        0,
        0
    ), (
        "practician",
        "Demande de devis",
        "6Nce1ZjLhjV6JPQO0mZf7cU4bOCjxPMt90r4te1f1z7zk1U1YI8f96F8Tn9GnFlYjz6KSggb1085sj1kezgBWK2zltRh1URU3l2UEfhtL58RpXw3GGEEbkNCXhs2Q8BhRYSX7n59jSxWAnVlmRpNik6dq5DvRkF8T24Q561u3Qw4h5viiVMKpr8J8dm0nJwg2SQ6FZuWWl3q8Pb38O3i8xbQi46ogx0olH8o34BBX2rdc8FERUovQKIkd4tt3l889X9A1es4yANB6nK705T92Q7rf5ve609HumHx33EEpGTe8p5FWav3X6Lr8YE8372e5eiw9w18qhtq4o0sG77eU9bf07p2OEY1ha868q5WFocNq8aM8cXHI6P8U5PA5618v7oYBfKgadigA30wC8H92PL2Q0iO6C3Ne83iei849V6Au4ulWmTPX9pPU54O37GPlY0jH9Y6Q7O71hqW7I11bA291jm38PJuVSLZ93w8ao0icz6EyeTCz2c888GrIEVH32ChdDTl7VVpDGdKaJ843V9FsduY60PWq90zm7BT6xyqUls8XPux4A9fj2LzI4wz0Y72PT7nE00OtXG8TFLT9RQzlvtw9aFe98774st6Y9C1V8lS8lX9sD4zxeAwiOzknQ7x2U1byT7nasunB98taL8135n4vy7fbx30880EltmB338w2JNw057Wh2fEbs2SzJi9M8G5I5uo5i44tU3GnoRw1Tz2p3yefWmY63p9DHOa9JA6w8D7uA1AMVYh5xTqwaBMt65R4K613kqkp63bnnkPVVh7gDK913M5wRxPP4UOmw3iK01kY1kJpgHi115f8FI4eAU4676Y19fQ7WAAOj68J9vZGLmj15zCk231uvBckPVTD9WD810DzKo2X3NS6H114OfX92OLUA6YD2811rPc0xQ5q8SNyGw19rRXMp0aY5C0TfpI3WJ95XV1FbbSfASzsvADK98GA1o",
        0,
        0
    ), (
        "patient",
        "Demande de support technique",
        "LC86X0dkq5b4Ojw75vz1li468Ey7JMq9wwRZ6Uh9Z5k3BsN6182u24G2IpJheCc1mBP84u7slAARIWx3EREJ1ulf5GVp9lIF88F9MIyH9Y0Jf3nG6U753S5jWZoxJdjAl9OWvJ91u03JIrhxpYukfDhSH0IbNWgfss20oyRz34pPTdDwhD69Ig3fAnqu7k823FnkLC0537bpOgRh55Z12nrw4fq0cyEp354973iPjgump1rMP4VyRYp22Bzn79TR9sXdFXdLC15hYmpC5qodY9ExRuiAk934C5ASurIwiMD0G666603koVWi3r51kOjWZjIsB57U8LFzl6si74G5HF8cU2ed162vcmTe6FMU4kP9c2C1Ax8UegF9iMO1rwjeu5573BzcUsvZ491k3pP7W101siGaRmv1mGtE70s4SX3t0rQ176mp1",
        0,
        0
    ), (
        "admin",
        "Demande de réclamation",
        "VTyLG22FcGP3iQ4Lcf797lsltvuzE12Dj650O9ARh9Kd7DKW5Vcc3HusXTp3ZS52VJjPhbB66BLGmic4Ey2x3b7VPNCJK0m194sG0JaPD59l7skt73X6QnFo6lFv58UH3KmeQ204gcSIIKU8bR2fwSXWLwaTcoM0B81Yb8uRV2TKXZ1gA1JHzp0LBobB7YPx0ropW6gSW6pPIu6q3G2P2Ft2h6iTvD0r0lqjkuzJvCT9mezxG5UWcgas8Tr72BGR9AQX4op37746R828XIPjuR3P1Ou3DzU1p7PCuwoP920c5nWjCiGjY1W1evwZMqOV7643H4se7z6M8J8T3J1DS0KQufB1nB6yG7vCpJ2VZP6y4rM65D2d1ty0hdw4C95cKt21LL37Mkc60s4nrqj6S577lu4rjJ0geB5qU0HoEn7Pp1AFGDyHeJ0YL47y730eDx24h0TtOp4aeT104ymeF9CvCmo0c34O7ejeK03R5tk79ZIeTMgti1969b89Dw224Tlg7TQ6x0JtqVZV1PnPAM77TP1jyAsqtlBlXKDRY3d6Em5u22Q8IoJfGNE5IouP12RWUKWHtySfzg7YmGZ8L2k4H1k0B1q0ENKWMQf9I12SwzqOIb9qTFIhK5YzG0QAgEAsXaWXX60W3jO6L34pTo9ffuyZ2MGqfnhL64IhLqo73F71XHtP1f3XvRShUx93z6A3xW7I20ou3GK7b3w2VQmme1nTRoZZMRfSMRkxcM7vNy31xP7U272QPSxl8uiEJ54glZbVdTwCN0Jhn9210y98bLv70a957yYdNUZ6u951c3j9uJ38Hh7is4Suu8ZvSRqTe2mPCT5iGqQmi81Rup2DdZ6RWMTbGMGD2B8a81SZrmKdb833L625WSMxZ6RXhM8Y8qs51guF9B4POt6ZTc8vmM8G7wra7uX3lJs85seomQy5Wy0enNNKc13NngEph5Kwli1Db28a3lm0MoqPk0",
        0,
        0
    ), (
        "patient",
        "Demande de réclamation",
        "1vY9sn65fyw00ZC5o61ftlMwzQvd5e14Lb4yru1z0if3EO3yfXZ64Q52WWt69Os6dzZr9s3G7jhl6mmU91Nz5ie8bi3IGagFVjsvPwRBmx3GoqiV09v2jbx37T24Ge2PSqX0j1xdPGgfC1L31llT374J7Z8N2VyJ46q83NuByuH8p6071DmcI7Y9",
        0,
        0
    ), (
        "admin",
        "Demande de support technique",
        "39y0Tjc1N6G4a75mZRikUpDq6N68843k5RejgGoE8M426R9V87W2rtFU7sgR233Fr3BDGvpXszS27L5ix9FFPBiXOj6VnD42uqX8lVuVJzK9mv3aLW90bE6xCKK0zDPI521kf9sog953JJXJmdVn002b3vNq6G1xi4kp880yaMXtL9rlyY9XM9W0z91gslPL6yxR4t5i67747zz3Elg97BV91DV93gn1kvK0l164gX9kHQOY1KKqB8kAS0Mh651J864eG540b701GC9BAqFgHJNjFz20b18Vyan",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "5ytGKkYHRHQ06Boe299HxhMLiMd4u72x1q3x39CeVAzqAe0yo56X43H8xYH5x4YFZe8wF97osZOr3q3hu642tnJobXIk885go797c",
        0,
        0
    ), (
        "patient",
        "Demande de support technique",
        "51BEA898Z80k9Lop7X6qi298qp0W5Ls6m48z2zI1989wIW01AHqNUUD5qo0DwLlU2s3geqRrZZy9T1v464FqJ6I2U746z73n95O3pEse9PRJ7NMjh8alMqN40H9n0B4rI606O3VSiI80gWheDgwobN7Z0CzS64tag8p0LXXk5KID2pHgf54apNzT45pa829LJC5727uMQ174mlILa47RHcY0vvrl1tXg268l251Xepd544fKoi9Q4h3J6p3XKa2y6IMxlM1SK70Sr9AA6u1vfRt0621i7tQ213T0Mps1CB46EzHOfX07j1p79TCmkrVE218XBT1nQ27znfYSkEzg7j1168W09t53Jo3foe9s83Ui3Vz677043YB7ZHo19GiVf3Crn0KU1V89f8EcVE3Ysv8HffpNjm7QZ3Zgp9lPA7g8d7Kb1iQ8iYe34UHt01OF0d1U1f2iFHE92hoNR52u57bHNJTTx4T4w4726vsKX37OmmvVPDz2vgii91G2CVVmWnmOIHF7o16OX36b2M978a67OTN7cg147210uiRIPYmlVwiOZK49Ki16iWx4rc8n9f2DE24vxJ7k611KUxWuHWmz4qSKH9UpADYsjO841bywpu4SdsUx0i7j103Xg0WCO8B3I93gAZtZ61zFEj6HKpL9YO802uk25X442noRRVPCGh96IA30l9bB3DU48Cg263L36d27p8ws0h9cQr070oxKrbijFkiEhCoozaFx8kSy4Ucx845Ttw2qjgO1HPlZtx03LZbUtJ3cAhU87u7iTa5RUVGouKAy3u4M69DsDGPSPT112AJ2e7fux3QdhdJDXy0e2S57l5g6cmX3h6201p1SsjWXqlZ0g08ve8Wf49U3auT2h1P5D8o1NbvCrGT7DlDaiSwWjPiOw",
        0,
        0
    ), (
        "practician",
        "Demande de résiliation",
        "8qNdkuZpiR51bESl6qfr7Hwa3V2yGMCjX9X6cf9kDoCvkNrJs59R8mu1Pw7s1YC4JrXevp9sBoN9AJV8F3677smQ6x1g43nm6Ds652CtdTO66Y9GbEDN8w96GG9h919VPi55S5kerSY2a0tT38H5DMP97L992GaF5oHjbQ6SUnk2Btyle8AMqgU63mLS7VX89c3P434euEph5f09MO3oS50U9W1tpp7EN7b61FB47XzKS2oruiJk54qYM2t0Wdrl2iJ9Z5BNFmt2N1ZztA8bKVstP8rz7hxIUbz2R950RO07fE2394bJF74WlXQ3OKe53pRxg9N2fUN9PM3qcLUV93yknS5RYp17241m91E3yK94euFLDmq1vq9IR5dU35QfF98ebVcop4SgORmyo0xlb1n31sRTFj3nbf7VBW0Dq5x7SM6938tZc7TCGwiwlh7u56VQsoy3GP5e2NVnV58ZCGck33AXZnTns8shv3HfJ32KW9uTZfB5On19pBS5hubw7CnOomL1n9j191pIeEsx8VRk",
        0,
        0
    ), (
        "practician",
        "Demande de réclamation",
        "S5GoZY2MeS01D41K703UdFOALA8pCkYdy4nvL0j2i2x1tl9Lw9T13mal2VAh7xspsYEJG392VLcm0e9o34ma77ISA2HYG8MqyzA4lZVaQsu1tl3P6B5poFXv5OlD33Bo12Z4XYwR83Ay174AL3YFw36sNxCI8gLUL0sPH3Kvf7A6E4fHmZP1PQel9yVUdjHCtzaoTHK0h0Hv5EQHC44F5WTbjSb21wIc901l5reiRxKUt9T4dEtS80xM46ULZ900YLCb1Z9Ex1kXVWfsPw99v97908QNswKIu5ak2S4t24g5LkOjNKb8130p09PBV8xGc5b09No2a3219GzK440T48qQFEi3ILC4A8Jl59qjW8Ub5k8nu2bs436S2gRbjFYsW0C7ymMvaQ995lOoXe4mlTzTVCT1tQtr7vEOz1E4E2Bl922Rn1gwfZEsPtiUZXmtDF8Ur95x73oP4OgyZ6FpzQV1EHF99SH66I926Vg128EOQQ9ns67Mb4s3wwoo81mX4yt5r50V0K6I0ibH1n50J77725kU86500OqPYRme4u0UVdsjU285W76xHjvLg40Ki2F0XFAt9le6tUCih3two8kB2Y6vh3PXv01h15U005136EV7W9pD6Q520IorZ1a6C3Qm1p1B9JnQBOYxyFwz33u0ubGEa74HsI369WSleu2xkbwplc1BAP2Vs8k89bm4hXp9cIu67q482UAf9p9h7l9ECPTU1YNwqSc5NFB0u5y79QMgQ8G9uBHO32tqSFc99OY5sYIcaU03dAVDcx3xmq0L62V35U0cDcXUbkgJ0wW5121n62LhGkc2TTnfj8sjouf3",
        0,
        0
    ), (
        "patient",
        "Demande de résiliation",
        "M9GDqu2D1iw4SRrN34A1P90M10Q7eS3BMQbtw44PoMu94pGNy4hi6O79dVhfx226vQ1oe8eYRtM4175W9Xc7No002AbykMo57hIre9rwLX02iPoNfZni9fi8Bo1a1FLzTJwMKU9Gw0yc8ZZhi6c8olLEpq32N82t546Hb56fxWUJR5dO4uhVa6ZrH312CvJvLj7aCWta05x8upGFkNu32gCQ1fq425Dc3lIZVY3U2o97d070o1IN5WSG07nb5K5bOiRwDO5y1tZR4jn4BMWaEyv3gy17d7K23B4cA3HW9iQB5tK3rL4OJ10a35dex481r02ys71yKz8R0O3d3u5t6H68kXSBBGv80313Z7569obv9zC8OgvnDH5i1ym5oNgRN6Gfa0h9vFQF2a0SFjjXY4uV3177T7v37BHwht0zQX455Oe5gqqmlHfZO1WjqFORMdLjh36B40wH6D8EUUKiCTwnz28EIv3s24QsqG89snSI74k3Nx8NID6P0A660208OQK44e5R25N5B2B1dIaezH2oSz261BgT9qILWZL2xS1x47jFs49n5OP03Yc4rV181q0N3a0v2DAtPyS4CWLkMLGUpjQLoz0l110F4VnUNbnmX0f708oUZB48JEZfJqq212T7W5mlN5jh1mjO58CHrV8WG4153558Vu90C5l0SL0255BH4kDSB5tx7y438KK3hT3zxzhzlTp8zJPt3IIoUn6647v148ZrLLw3VW343H06Lvy58XLj5c2D11tIPu6Gq",
        0,
        0
    ), (
        "admin",
        "Demande de support technique",
        "8l3N43Zyv0pRr6lfdRia7aUQX788rV67FZW2202Qq25C10IAG5O0zQSamjK22krN69x9XVI59n1l0Vk083U8F5h381AFth2cp8JoO40fU22GpHXZF20W3nQRk93iwUCZd1uXu6HFOkJ95O718E7q2fS21WJ2eNmIwIU9tHMkz5W6JBYggRJtD8co60vk0GNl89W1N9q2ysnav49HHc7bP3eLDF73sPO0uN3730XIeA8R0qE0723y86962ojOcRE7ZI6R64u0483c7200sesI65EX0UQlA5TccO6L921bf6Kq9Ji7C2lELYfGm228PdGwKRS4Dgd2051lg4LEv6lm6keu5S0XId6PjSEf0YC54GAerO7Pev6215422354p1BF54Ex9lok10z0NB4bK8lRNN0Kh9d163yh1JfKn17pCdYwoj81AteofdFla455qGd6T98VNV2bj01y4gfDNKFUoz25VjKB54xVY4HYQL01M22fDRX7sm9q66JLl85n2k0t0jdq2R38dhKSFVFpSH7M2rPMTAP3EUBubr09Kkgf1c6827E7h4zb30mlAv8szoRndyV47DNRMij0QbL4jg361uyv4SpE0icNNwmui2e9tm1442e72GU0GHb0G12r50J570148JZ65fM6CyV4R7bW98nlF3Q1",
        0,
        0
    ), (
        "admin",
        "Demande de renseignements",
        "8jGaOD6TMYs0t5PS1BK0264dTMajHD2v525M49P2qRUm027T8Mh80sI9o364504m7u21Mo5tfzkyFDJLyh4c6roL3n058B7385X45bm26246KgwOcm0aXk8u7F9l7MsB5L05Vemmdnn51tR6gbBK79THTAUab9nRY2g86s1v5DIxrzB99i935xZz4tqd6g409972Loo2bv2J52MW4yL941b6rg0SSYXDR6ERt9dNf4Yi4Om39DcIN579Q5M7L",
        0,
        0
    ), (
        "admin",
        "Demande de réclamation",
        "q27g4hYS6vto93Kbs1xPX35D28x30cwG48u320Vt80vJ9AD2cmvV7dZMKrRQp402Avwfl5x92JTMbp8dyA9Mh15Ex657gLsifqmUk8ph7V4Lvy4Lbpk1d0Zc2DpfQFT6sI3262x505Xejf9Gp3IdWSs6KvIykoWWkD2fktPf6ZG5Pd6d1DQCHWq46bX8sg52MtW92ND7Gjk4Ctg99089w4r70voe9Xk4K3268Pdg6494KO63Xo7UE4j12v6UA8e4kwAprrLkLh1e7IOF1D08WGzj021e4d259ptw5SpcE9LTbszH22lTV368iz026BWy54UrJCUz6X0L0ed1V47IQ9XrHUA8f02MmLVsd6pzF7N2IG50FmZ1jB5LpmRajG98",
        0,
        0
    ), (
        "admin",
        "Demande de résiliation",
        "bv1mJkqqyK7j39kd0YZ05XD2eg",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "6pqW6Fo8XxRcNBaBznB99jfd9iShzLtFaWo9a8dwl2Qu22HLkR5339071OIA59kepws6KZ63404ISpK56bxYW8P8wH0Kv13UZ4g6gjhIMrS63R5ZK73cx0yl3MMPL1A2257xfTLxL2UFs3MO6rt84KC37a2GryR5v7bAdWet11nPzmmHjgC2cR56hq9100JNh3evS7LRdS507TsbK8V7M5NIfVgSml73Ta1H9cpm76j50kgZuPi4JqxwQaMUP66VF7LzuH8nEddQpOAgI5o386U5Ky9F319WGhsLC4E55LO4g921EU579hHESgwxCqFE55L8G39tX8k3KXnnBBPraPQqY9mJbTxKIWiL52XJP3Nw0h0T2853xN7l5mKWL8bkyybU0L7UMUc955JzlZRF39lKF53h4Ey4OKiDS046e2i7CF1vdwp61fhBlYN965V6QA2X2V8TiG2H1U32JSP8Pe2jA9G1jUt0UVlNIZ7FjUsJvjlPZ5o976nThV9RUOK3dVTRKNGoiSK0MQ4mFUEd8gEM47ZYP60P553Yip4T5FV1qTiZcxPTN5A6beda10k164FSA7J6VT3VAeNQT82942zAe0f7Sfs10kYG213CXFMJ2DyWHM",
        0,
        0
    ), (
        "practician",
        "Demande de devis",
        "Q435Rw4yaMY484VO9HQl1952GMs1hY84EcLObFcO5jRGOFUGwfPGcD7r3YbLybzComapH4lD8yaX42peCcnTilFVh8tk6pH3kG4M97sb1opgFx6a4fLw9HbdU2U1uWxeCQHjCq1b0hi2nJV14qXet3efc8F0tYLQaQh2sSv5lh3z5vk0t5RCmzwntz760h9X9Rwv0B1DQI5uxV0GLF1MA6524hJ88yj8btby3aGGl0be5zvs98Gl3l0OzKA85qLn8D18ZMg2HZegqh5DnLhqIq6QlE50xMbbk7b1132516b2kqx44xs34vAB2v36HXK1RHx330OTt3Ep8IR2uZorSo8SpvGd1x36ImpjgbD7x862i88PaZ0PD9hpit76cv86Qo7WVVI9x0vGDAZ47D8jsQmfSQboco3h106l2bRCoevUWul9rlA18D40w3z3mrp1jkV28I8RI7t4UTiM2b631po20hXr6aBR8hVEf3zR4UQ5dDG3rZ3TM419w7v0hcRMP9T0qFI14ib0654AZmY1tXYMAz81GDQ716AWwKXsAwOzJMBzBDvIuUCmE12H46ZGRfjJQ286EwJtlpuyx80Krz7G6EwIDIXApHmtku9C7so8Tseud6uFR8HSt6J1D9Xw0UWc3822wEjCfrgwjx80SYC846S4",
        0,
        0
    );

-- -----------------------------------------------------

-- INSERT INTO 'intervention'

-- -----------------------------------------------------

INSERT INTO
    intervention(
        name,
        duration,
        anesthesia,
        practician_id
    )
VALUES ('intervention1', '1h', 'AG', 1), ('intervention2', '5h', 'AL', 2), (
        'intervention3',
        '2h30',
        'Aucune',
        3
    ), ('intervention4', '1h', 'AG', 1);

-- -----------------------------------------------------

-- INSERT INTO 'patient'

-- -----------------------------------------------------

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient1@patient1.com',
        'test',
        'patient1',
        'patient1',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient2@patient2.com',
        'test',
        'patient2',
        'patient2',
        'patient'
    );

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        role
    )
VALUES (
        'patient3@patient3.com',
        'test',
        'patient3',
        'patient3',
        'patient'
    );

-- -----------------------------------------------------

-- INSERT INTO 'theme_ressource'

-- -----------------------------------------------------

INSERT INTO
    theme_ressource(theme)
VALUES ('Comprendre'), ('Administratif'), ('Préparation'), ('Anticipation'), ('Checklist');

-- -----------------------------------------------------

-- INSERT INTO 'ressource'

-- -----------------------------------------------------

INSERT INTO
    ressource(
        title,
        type,
        url,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        "Gray's Anatomy",
        "pptx",
        "ca6C80pXCRi1tHVN8T8EEFhS9gGw205TI18TjJDuX0Kl2O5MBwJ80ojSW5s4w09Cj19Q65NGwllUkdg7nC581pcchnB69O5X3u6QQtsRE4XBrqyPUJJ3g8k0zpqsUw7CaDW2c2XnP7zI5DoL2FCR8W82ozzlPGFrGT02BKK8FkUjmF3x25f588uv5kQRLUDX23Rxt63J766K78T3ximwxqZz3cR97PE2qf",
        "9W1nw3vOB",
        3,
        2
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "Y3tsLu1CPdyb8wZZr6Pt7Pah8RqqvVIa3L07DY24BY22weN4V3ltoq1T25K33cvP4Iy68KvxZP3U3V1h5k79q0tr3pDJu3n3q2IWb66MYVFH9sr4aHm0Hn75tsZpipJlMYDF5R41Dwhz7ww1y6rm8tG1CUSDKelp6Af3yM9bV35d1Je53eTjo5q4XCK6oXDtvp53xw7C8k7Qw7MZgwS82ZP5z6IUHhUtjW5NsrIOWx",
        "Pz0SE4z5CyL9STu31PpFu15Jn0yn8i4hhYMl0Y1z1B7D0NX3D49TY3O4jiRo9I4xcW8v3n3sd1h930H7Jh4R2H7S4fuSmIJltTJwv4Kpzsf7Kk7z1nMdtNuEL5kiF2K8P6CV8XfmUVtLXizQ2aIe24cDah5n4uo03",
        3,
        3
    ), (
        "The Merck Manual",
        "docx",
        "MQ967iVW8cpEDaQXZR471O7Sru8844DFG0h3HiwExb6F0LEeN5OAa1u8D8oKO5O8GH1oMC63UlLjdsUF7OaS20c0oIzr7qdn0J0G4Zl262sJErGPdK2x1er2cZXA7z4iX4zdCYSE96jpqP1y6ZVC7Y3pXO20qfHZg2uM8aE5VASAq1aSs6Fv7bqbwgjW52em2yJ39H3rx71",
        "n1DYdfg4KHgbxW63S9M06dAHR7h0xhWRj5H92h71FNLRX2s8WI25W9e2hMwkwU01H2jDnjub3392i3xLitmC2m36u2sEuZgnpd3Jb46Qj0jAFTmrESo3KSqfR2WN026Uj28m91N2SYH65p8e68j7U2389yb0KyEhCAYj87paB904Ymyi7X67o1KpJi962849gKTSG8MhnOC3U",
        1,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "docx",
        "F9AwoAWz625SwmrrLhADGs94hpqGdlDDYJ24uNjhGeM901pA3HoWx83YPH15fudN0EpqHch2wf8FRRqL89rhn9a28Nvrurk0do0m9Ge435f20Sb5hs2f5ssU2766qrtGG60B46P16b9y1njrC8T7Z7oW529fa5t",
        "LY8Z5R0TX56BEc9z39o4YCGTIsXAdCqlvz",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "8u2P86HF6P73LMeqoeMu6EKz9C09cMVjro1l5n827WNCkg7IDHkmfDt7aw0IFIKh8",
        "ol98z50w69kFEbpI7s7iWfCM92382Oa0E1tfnR1fBKMzxQ84Ft8pm33838glgAML8dI227yc2S9z00535FNJfOwIJ40tAN8ygt5kL202778PViF2N8qNtFA5RDq076XDpAo5Cu2rmZ1Ctzbga6Z24w00F2k1JjpZO1Fsa94565BY9S2wufGmIgfo",
        3,
        4
    ), (
        "The Merck Manual",
        "avi",
        "U8TpF7y04a7ci8JEE8MxQtEd9T1x6dcTE7a2VlMdjxje32K2auHUK8AY",
        "ZyvTQSnSXmPySbl8jWC69jR45W94BXko45tc54n6Zh19hZed1IQ0o4XjyFJq9p512svIZYEyXP9j02xfXfVAD79g4i720km84p8ENDhFtICl1aKU30687j8JAv2DSpBN",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "pptx",
        "GZuv3fqNp27J6y36MEViommTMIdx2N4Tgl06a0097nJK7qt70knRws24UhsKZ4CFneR4IB55d0gMGqA44tY5c146t1mi278Hxb3GmM1gQ321S76rXlunDp73Nw28VD6U1x718311e5qpy",
        "k767IRSy20J8Fh9rPFUv3p8t77oSM27RlLll5uZ1yp9oYgRiGeiNmp4woQ635x5goacmi1YNY1OO6dxHo7v22i186Ug71Lc1k3i3gK7N06wjZB81cV7zNxb1mP6qYg7L9lT3aTiWeb4Bf7PshULEEMl4f5MoAPz53rT6mf5f09368pp5AS14o3Dx7fT0rcfnwQfN2",
        2,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "rM7t13731lRf6CmW21vJQD026DEDGj1731YPem469SM486s4yoU5e41053p9890u0fkMVFruxquybC1A6054Q15gM68YaxZtcVnQy1tYz1u64uW005EKs5X2IZ0Vvs3jE73gFKF770qwXt2iEMZyaN1L2EOf9uiguur75oaUFV7t4VE7qRI7i",
        "e0",
        1,
        4
    ), (
        "The Merck Manual",
        "jpg",
        "Y6guQ23ZPhQm3fwT92ur8MQq0aoKsbzls0K73IBaHaXXRQJ6wX6nBE10CflV6l81yx9J8487BRAj4ZEP4xeamt61z1Fq1q4Am3b1t9FBBsTbe4Ki97tqk2Gd6FAuq5z68tU1j3Gs0P19LmLk4qTg4T1583Ahh96O7e8575phmVRwY9l1kn22Nb6z8T",
        "8TQZK6CpI4Qle0T46DAy9Krt14H8d6JiEIB2BYI8ckK7m2uno9CZ6AU37DZp93MeVl9b45519P4m88AJDKic555WSV0bJlI3JZ7IktG6540H6fbKVKN3Adary08Q5dzHhjW78z383Q8abaw1WPhxpVnPM2245nx4B2",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "2jd4Ljr9ddOFzT65rKheJn4J2Fy5Q4R397leDTscc9tH2zaSDtlYRqj78jB86dwlx5QP7GE3htT0iSQi0yVC6vn170",
        "e78gkx4N06vjdXgG8G7k3WB2ZywfB06i0z2RIzo8VOPhRY61Q0j77DK9eh5t3Yc5Wjn69XQ6aQg1cX85onFC4p6GjU5BDhPDFh3ln84GCczUKd412RDO76",
        2,
        1
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "hVz40LtWc1XD8T9LxI8K317m63Ilzb6EZapH43zdcrh6gJcxkd72qsFgYyC6def87dU2rQffKfdHa21000yE507fq0XoSaDVDv5969S5G5RK615gN9WUk1Q9uDA3mjC2y5Tq0HkAl4hJkk0RD4h0bY2JPrLQCX6P9MoBRUt47EY6ELTq632EYU53Y3X3W387uP8jS085HjVE8whFUZ5KjNjFf5XJlb7aoojQA4aY499pTQ",
        "0lQ1G219T4jyo4HJLROHKNXB8jo70jFQlqZHN9D606f43V6zAr5N34v7MT7grBQ9nfFYKY5Nu8h8o6swzFwhAfrmn5d4t2sWmTu4tcq4cSL00eo04s2CXf6ipLH06l7D3uRinKV78nEF2xC452Teb1soGqDR52Vkq5vnDcELNpzk0Dys51tPPNux4Wiad0MA25nmx3mI6329cAn806gzo187k",
        3,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "FdmzR6c6AOBhTeD6ZKTA9eeXTmjR3IlqFom06L5FJf91T47tDCtzRaYFFKwqxlM700n2ss8D60q88iQOx1G7op7Hby7P5dUOh46zXe7K9tpsP584FeE0VZ1IJ4nR8jl424b3P1QXZwAOHypz0Yzuf3vUIOXxvlR9nMAL62v9hc2ARH8F4hMYE9T3uU01EpjXR0p5qHL7tDL03k3",
        "0IIc199qUvbveifYqIhT",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "7rj7H5QNb2o1OuCSpLqaE",
        "A65BV",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "29Ad90oGl0rpPvM836h2N5g6pPgfS8nsrSzz2f041keG2Rqxc5ONRutdXFgPaB3b86zoTfc2YOwechhMu4iKdC8RO67obLxV91z7w228yg2E7i3Fwk5LqO8uDEJNjD30Pb98OpW2j6RszS7du4g0ReF2xcps7DST56GbKWEBvL7bw217RQu1rQC8jL7ly3XCWeh8MuKG5qVIlNmcq24g5h",
        "0m6DB0dV7Rp47bBXG7U4sP7mJFA01Z7qpD47U96RFj4CoBc431DV6w21gQq6DZ64CE0UKOnb11QAP4W0JJ8QpiPJi88sxVODCMs32rr1Lq13luF2se9H4KRv146F08IvvKdYkK7R41m4c9Eo2p66uC3v0j8rS6fOjzosmgJVnSaJvesFR9yu470y5HtPrXpmq9qGs02HHx2076HFZ48U7zR3BZ3jI09A49",
        2,
        1
    ), (
        "Gray's Anatomy",
        "docx",
        "mnH41JDj1t74P65447JFNQMFAA5Fr0q3jTLe3ymo4VdtSb3oVAgBf739KR8RkDAmHrPrg8b1IL6iYbc5f8zXu642W9S4E8DQ9l605930FlJDl5rDFjx0r27wS909E1RYE6fBH925jy6jXZ6R04BZlQBc2hNPQKI6K55GlI97ws2Bij7Qq60h4cTa2V5TqQ1jW58VrG5boXioy0XgmH4uNz80oF897Ehlpe84KRIf97i7Z26xiOE1z88M3O8",
        "93vW1fcOjj27jw0yk7VXyC9l1ue7aJh1R55wVlZm7C03mi73p71C8j5dlZ97oO4bxa5gBno88CT32hncXqDQ0191B75AitkpdfG014Fco607OxDt0T2Nz39kBbVGMzcfYjf11Y30VdC5cZiIYQeis74E71f2wQF56x1mkY0f1eb49iC11l70YY8i6z1qT7NLDgPB88rDAi8F6U24x1O27W732L94DAJ4fLPyj0Q9oJo3",
        3,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "XHv4g9IvkX27PcV2lyUX4pP7N0njTU9IEI1o2ieSFsylL1S7X12307IRkNzxuIr7I87oQ9R8zYA49Dt6gR38E9GxV2KQjE6y86F7RM04tPoj2swLECTemIO8dp22jrP0Z3r6D8olUgfYkvL6aU627Y8H6XVr4DzD2CxR9vjqac3Jw2XVbxhi7tzc7E4t91LKOwPD3e1jGa8Blpq8bcHhmcw0B5fM8CKVt2Q4KD96WJ4940AGKw842x2g5hXx403",
        "jHTY10aF7zqVM3pZFEJC7Qn43khiWv3vI95RA4Iqxjj3kOw8j9Bw1136oB2Vj2hzmJ5V0tdVfW1WEA9us0mWDGO",
        2,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "13u88ZE50ryR9A6tev3c811hHKVzZy3y7894v7WCl00n7E1YhWPrP3pT1izBu28WP1q34RYr9v86327Avl2QpL98L1MOaHyrysnkL27io0X12whEygi3k11XtQ26Nr68eI0TN4Dm6A970",
        "b6aYH93CMG0NoRY1x87jK7p46h3Ipgx5l5D7pZf9wXq4PfG648Pfkn5GUU5uz1Nb9O8TuGllWp7U3gFhSL49WHSy21F4vhkjb4e4Cyc86trnoyiNF84m56YTz",
        1,
        3
    ), (
        "Gray's Anatomy",
        "pptx",
        "0Qj5mZXg583LThMOTjAN089f4qg2DRMA17RVy2uk51K2OK7Zi49ZeR1GXz5KpoKjEU",
        "le87MLVH8kxpEb1v2SB4vaVDCiFyPq1rdJ78WAO2534YSlFhRmqk1fOMWFA7ZD41w91X015N2",
        1,
        3
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "A723C7tgqVR45831r5Tyb67Q7ER0Xa5SI53h9ON67b7Pc3",
        "uZQW17f0WX5Y7N8dS64UOd8Fpk5okJ9Fx42wHx0bCP4Vy9EowuE8vgtxzipkkXvdEl1tWij4c3RG1cnIy336TBNy0RD125KFJ0BuZstk3HLzMoxwu9U9a53j8tIKhKpA8EgK4eS2p1oB5U7nXLYgy7Fgj0bl5ozeyQLXILZ9VUuVF41L8bsL97nMbaFST8ImU2",
        1,
        5
    ), (
        "Gray's Anatomy",
        "png",
        "J8qypIM7p6Y9dOOvPtG3nc20Es5LiucOZ69eSR8gl8ZBDVw44U98UlPEJu3784U0x6oy09pBX0d49HF2Y10bl2z2OWxsxkl3r2WmQsY37368EmUd2ylmoWKG32wd6qnFt58p33JTC5bo49Wm8244y7pUGABz3Cc34S78R6pA52Lwp22234",
        "FouF5V8oAYKEp7I4a5n40NN47HA1WuH7D8xOjX18W9PEtP6M0mjEZ7jt007jlez51a7h8fQ31NECcU1jaC7q804QE8656SQ0xvW3HhgTrC8IBW8uZyH8X4CTCH76a4MTfUxl482IR0a3z3cPtz9bl6YaX71n6M25WZ1jNY61gk13076mC2W9R6c9A96nZ9",
        1,
        5
    ), (
        "Gray's Anatomy",
        "pdf",
        "lG759HqUl1C1e9WQi4jKFT0YvA2FH6RtZj4sLGSEj8Tx25Y44U0i2A9sAbol241dZKgj7LmBeKq9a4sEXu1lN9g4TCc615iT7r55Qr8d62K69b2x9IQ7duNx6z8cAy9W4hw07Phl3oz8y3k4rWVJi4x74LvolWE1V7W1B7P7Fr368",
        "MCzleONN1krMU4zg1xJhhRWd8npbUunG9uw3317Qo8HXi8SZqP207l9mR8svnP12Rv7D9N9vf03bQ0xuYaK48ll1FWoXJbnESfnXF19N5N0ch1y1xuqeY1l5NgNNP9038n8lXlzm6ZJXG20EGw39eiR6ze46hu5iji4CPxcAY0Mw5R90S0AdKHxyLvVbn57PW3iYjziE8Rfx344qLrbG37TDDnm4Uj1304jZ7h0jgu",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "avi",
        "mUF1hGWgyf2W05JgQ78fkzVQ896ugCiFGbzV9jR2uWigDT213Ly1JbzM33j1y3e6xchU5iZur5vh1HsBM30OB4NrdlknO56K2d7XY7Q4g9qE088Gza2CWyYq72C79WWRuj4Vf1D6m0TxCad2u02dlV4dxl5Jc03792SlMN5SXG4",
        "eFpyDV29OUTA0RM84qJbsFb8XmV6Z6slsMohZ1sKOeoKtTG349pV9G7L7brg8kM1JHaGQsWTOC26U0p4AB02KZIRPuIaI39r500LfavI3al1jan7FO65oIM1Y045zU62",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "c9hF42ooa3UGSl8wSmP5uKxPb59mZ50hNhI2Ow5nNup1n10q4YaFOYp5CXx528AOL413C7YVI8sxrkcfstR4w5Kjzr1tw5gZowPpK0H1zYD7RYdc0G3Acw765ET4P8T0U08fWDV1Z90f74Y48uXqD3Pbh8988bOhwOFpSEVXX4SB374Pa6UA81pITwjX1zUB0fSMG4JGO5BeV7Y7MBc",
        "im44202h2560f3iC1qUkJzujlWr4J6A18T40ODKkh8AHb6HocL1Ul3Hi711RZD8g281o87K58mkc4Q71B8lM3eDPt6MOs",
        3,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "P2m2I82r5805eH6K7y3QPg1684B39IO1YAi28Fpp01Fu9W2o82d933PihnJjmJn843cKHBJ0eV301kw82G2zdrC6Ec8sQ2cdLVWnu564P59t2sRu163nX5pf4rC127c35S59jTuAq4Zd444f3OVbyW1mrq8hL0yA7zsNKo",
        "0dD5HTshFyTcQpE44Cb4e8qjiVBeE6EB2kBTo72Xh9B32d180a6P8008b5J8796h9El3z37w1i",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "png",
        "MsP3OKYNyAs9Ma7Hiy1LWdZc6779q10q20nt9LTzTax16D6ccU5sr4YOG19mR2K74trOgBlwe4384Vz7yo2",
        "3m6QFk1ClAzn3I7On5Lbhu0wtoILiGXv566MRg59Wlbm6iGDD3Pwk4Ixr92VEvF223Ce97Ea2eF8Wv1ZiWRcb62o18f3r6CwW7oy6fU7j8x4o0Oqi6MA5RH71ff7m5c0oDmKm1RC13X42AIW1Mho7uy5tHMOAYtTxJgX1mJwDEte8GntQG2W206pDbdMNniEqUU33B1qrs0N7ApHJ16138",
        1,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "19vW9188JU66g1u97y6xV0OBuo5w9cCEJO5JX8BlFp8s14NuZuJX2N3ANH551aCnjVbla4Pc4EWg73Bw591QS7n958rGOZNijKbZdSc0a6UA3fO0a5ZD7517Dkg0",
        "Y",
        2,
        1
    ), (
        "The Merck Manual",
        "pptx",
        "50NFP35Cl3v08lKox2rIny4814fzwbS1Bs2mF55oG61ZC13t6o763SuHMyfIlCqhHv3y0ftu1J64jFZ02PxFHg05OiO369lSUMhKKTR1L0u4LfT0CekeQ2Gky29bk8FtlCtkLS24XXA2K3v0820R",
        "5i73UwLx35Bkg15V5J4k37Z355HkZU91S0w87bPHt971X2U3k8V9l31JBVAFPKDyxnJ74K1f4bllQS41cE3JtUnI212hC4QpD8U3UZAoX04h9LJce3ic70u2Mo4r71QLXf2p0wuV4rDbLsCv2UmYRdAjTE9sBuTOhZqndzqgll54fnpyVkHaN4kS1lmZCbDC058dknCQ8fXn4u0rIHqPC9418zOpp22MZ8",
        1,
        2
    ), (
        "The Merck Manual",
        "png",
        "HAfmd0Apgu78exH4IB5A1b7oxxEJnacry45L1lA1vT251o79dG4yv2yB2NZZFMCZe6dyJXZL21is1VoK175WQd9fnX9E6jVHTrS38txF9i6QgPf3P3RqlCuDdZMv6THbq036Ws91rS8hU56T06BfI0I2eulC92oNUSvC0sf0BG4Y3Gs810X7YM4k0D6h7A1e9EjT64Ir6hX8z38vZ7VpmNm",
        "121eBsfH77kMnFih1L5L3u3G9jRd4T8A5F64k58Jg4qx9TPX6bJ1o8YHC9vllGv0L9f0r09cznA6x7gsgU9nP35x1rK1fru815S8dMV1r70",
        2,
        5
    ), (
        "Gray's Anatomy",
        "mp4",
        "X897izT1Y61D70vuBnTEoywJ0Ej494341jq696Z08bPUvsq2tT78033Ay7Lm8a9cFx9D830DmTD6ik58lI54j0z9eiJaPK1lh5x44sR72J2Q3r0e80f62c6J3FUWvVb6imZVTyQhQ5J5DXRbjU3S1WTGt3Z4ARHo3h31QrbVm1bxg50PieK1388ekxUxC69ho78R0oYRxHuoNrHk91a",
        "v8Zxv1n4iIb82H85C8r6Qrpd9gF01roRX2064jEqeHIdRd82aoooV1iZt1JKL74T28j6vGIj5dYEKy7i6npy1M8RTUujj2355k5aZ8yaWtSVLMQ6k87704yJFNd1u9uq01Fj1t7PkZNd1jH1Tw2ZU4k5EO31XZ0q8feBx0CjFl8mSKJ2914zI7JCxP09224Mi7irqg542kWqLIuybHC034Ne492305bXK8hD33J",
        3,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "png",
        "4M73sH2EC27pKR49dk1p1099gxEu9miX8395MYV2Kpn57Y4jBGCRyikSEY8qXdsh8KvaWyPHfoDstl7ci48S2AJaS1CKDI94wyxEwMk62M5rj94vUS6cy2A4531gYSFVkn3Mq1g8cPsRwL727WBx3O9ukK6w5ccW3X4",
        "0JG6uxV3bRMZYTq1031BLq9s4hIhYxNxAY0dZOXD98Po9RAX3cq781ZebZpQgd2TWnl93E7Xy9P3z6ls01AO1O886ldDAm9K6s2N19b6GR97S6Evm31adkPU6GyqCC2gt23HL3Y69KDOj322VYHbvBuJL06iN7N2j8z4Fet1wVl08blz177",
        3,
        1
    ), (
        "Gray's Anatomy",
        "jpg",
        "UVy1sBDz0b7R1g5F2e9tUNC2MZLQ9Ua9alUt",
        "XkfYemc8JeyJsNeg77D6c5DJ2ZwTBc42RxkuIy46km7j3U15g0KK03DR1ZwWY5l8TV25R089IH5EmJ36V9jSg31XKbe91IST6W1yMHDDsO8DmIRPa2KgQLj6LMc2CTPF0q3vpl06p99mnTn167X4bk5x657wVATawr6I8LpN9N6Mc6pfer65V5409",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "r12KLvjWxucK3Py768CIChJ4BjeWg8bFN5yGcgKU8b60awcWad1k7Gm0LcVgYkZT6WDl05fTcJYEj7p6afS6pY9p3TFk4K7GeAo2UyA90p2RPOK32B2Qh3aLInl2Hzs8PApR4IwN7hJx3WBd9VcGY1WmP2jhT0qrjAJ57sZS08X019li7gz0m2R",
        "6z0pF5UCK5X572mLP5vUZHp7I4bx7x4833ZU7Z5V1DUgA85F3RwFDCKH5QW3c8w5N5ZHPes7U6gbx5t4WYH1Msi6s8EASthHt7KvsLUO58b80LRQS85D",
        3,
        3
    ), (
        "Gray's Anatomy",
        "docx",
        "626E2GYo4xUqEm5tau73hGLDfT95K7RfRXPoXR816h99JV6ah22vr5qp89dBbU95lE1Xo0Dsyu5u8OA95YXd1288le5r1bc5jmphNBv6VSHM8NS78NaOP4u271a6vtdjUQrzQogfUQcZ3wLR4367uh6R1w4u40YY4632a41I35s3",
        "B5r463bF7iYSbdrDklL49dOR7c8f3IKC2BflT1ah93wASSisj2UX9w58jOy25DU17YbDbB2J8QowmL32v67xtL0KR3JOOtyVv5057K8Cu184i5piF7HM2q3Mqs5WyKd5Kp23Mv6wNKBg0t88i90h47Nxfn3x6R4z4WHEj",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "9im8D1nDnK13nNPJ8z7J6s352NA6Cxlno02S496Tc88dPkHL0JhD3",
        "A1C093EXRArm76ua803vd8RJIpJPu2Jr9Hz9632S60D58aJ66dbzP71bo71l30yHx1ak1V7Hp2F05327U11jCHp6qu7V29WojDk5xtAc6UZW3O1",
        2,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "C5n44K9WYa58yf72k1UolhpcqL9ddtHy",
        "n0ATKIxf4c6t3J4mJ0nE6X0Mh7P219Tskiukrw4WpWyTn4X5sZyyZy0z11859gTe84qhJBWDJM01a9k1335X0ONASM35NyX82IgGfzB1Ii6JFK3TaDNir7kr8lh91T9aYVWeI9EJEIA5TwtizyhXwIrw4a05F7Yboss142Shx9oHie3Y5GzeD40sbN5nFh27J60itBXzthWDS0ia67WU78",
        1,
        3
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "png",
        "vg9hHUwe5Gu4dgH83473Dn12vRanM56zWQ9cxM68Av5666ce8E7y5QuNMkbe6Ys1lG7fy8FR5w7fURUkiuWoEqZrTW9Hjyf7RIX2pKFL6C8cB2hJaBFA9427Qmn3Hgm2Y7qK231EkwfeA4E8SIC58v1064PfB1nN1ppjy8wAMY2R61pBlxp693lw30TFv062CZQ9I5oYl7SvlYD8a5oI0qA7hp73G239U5X82ybcOT3T6kMzkv3mI4",
        "gt3zQrG62kKkhKn6ryDMxB69Cx1jf2YRYp29ef3LtyTaNl952Do0EH532jLKc3oVe5OCJH4C60178usHUdlFoD52b5os7ygeEP3mFq3068gc1Kr5N4B7Rh202Wl71HH2o41mJB0S2Jb218f7PTYw42vs5t2b07Q82Ybn7gKX8k1Z347D3c92G9pC3cs70LPLXCfp1VbvNq5f46smLhKOczXk8tyb",
        3,
        2
    ), (
        "Gray's Anatomy",
        "pptx",
        "bdb0QlrA5aQmb4nB4zUIeb2mf8O6I9239HG8AtnE9rfR5lgOZ5b700fix4tEpOqG05Ha712KjB2M2gVJhk753H1a5RGb6RV6LOU7q4AbvduJ747p6A5s45o3jBf96th1HyUijHO9YkxX7hGz16Q1luPex1ivDN0u9BEJQNGB4gYMV2ysfx",
        "89I9Is5p61TfO1meV5OFHh0Bja9KbYyBm8KBgU766sdJ536EN0EB39Kx0X1oB91V4Z7py",
        2,
        4
    ), (
        "Gray's Anatomy",
        "avi",
        "MWfTaulMSL0W845B2S03WvQc3X0RfxwGZ690Cg9X65g7hilCYR68RU94boVy034awwo85OBg0wS0Eht8w56qsiFqxLWGDm79XiZIh05c5WHnHFwc2WQyaNnQcN039x56C7Gc0kKarlM1mTJ69CUCK912Lclv2II65w022pIJY14fWNf",
        "GQ9Z9rx0zS412Kz29dh7P4HGC",
        2,
        3
    ), (
        "Gray's Anatomy",
        "pdf",
        "nR9Anb7o4rBzH7DAp653675c1ACNY41lv5R5Ds3oaZDrODabTG4MLCsMs7T6m989S2r5C17d976m5PoBOytHcVX87bBN9jwzVEQgwP4rYiimvCiym2BuI3dL52oNFtwWAvzxh8MnhA61oZ46apWf98F95wJwF79I1G6eZdctpS0S5I1QNVSD0p96PPZNcD8EoLMCBXG46RJFX3dvEpxKiV2vB2i6wd8ya243LATNYJ04l9CERC7ZHijcN8EA",
        "b89SDvBcPEMMXFuGO7v10pM1lvEZJBfc3v6v9fueA4uA7J3tsGy049cf3N0F0Skoy8m7ph55kqU12BN8T9J20qz1sLXS6S49ehB08E8pAal8ahZRI38b2BivK8HmUD2wVP2q6U0f4R7yp",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "mp4",
        "57BPmksQs5eZiNHQ5on09cl4J3RPq7hnySne3o7bXj0HWO08z1ubAGEY8rpa6saEas175mNx5YZoWfd2ikRrdvS75W19rc2xLJi57RpJ8J3LCC41GT8ak097o3",
        "fz52O232w0f9Z3P9AC3g45c",
        1,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "knyi09ak6rB6ztAK3B2874G5ZD1HmkzmcL52llcoF9JYRU64O4Y3Hm2BZz12owJVdT6L7JlyckTfbX2XI8HVV54fg0vmXlA1L07r52v59oGuc30X89jgQ6Smah4F884I9",
        "DRdSNByL9rGedFk5lsMKKQ7Yyi9h1R4g9v3T5e64y4egQr9vSR",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "avi",
        "7Q2A50VcrQaTRnbU5sW07r7dEml9VGWVXlzpoO9N9Z6jjG83Ig9sdh2WW33Q40FR36g0CR9Rggm44p69phnCK596Tlx9E1N1YLz4PznneZz4bVHnECmnQZgkJmR3dtjdBZcjAtH98n3KmjQFxQHzw9476le7FvTx9Zxy30H5C199mNmD2EFiT7m4Fm0vsB0FU1X2PjL13",
        "C6m3lmIbSn2s9zb9BhEjyHp7p0354XvIWju79os45uZ7q2FibEd9nTe3rZf070hA12J57Ef96DC071Aj61bkCd1VyaN998CRH29z8wU5OX26l3BG8Zzh98s7Bx12SPeLf2RptHEc269rppl662hIv5fa5Chg3lj1aApvyHZjIAPkUVZu4Xf6gewnv1Z7fj1VYXeFqNFibHf9qT2NfJBk5oPydcWR2V4FZTWd884uGea27D",
        2,
        5
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "9dQwOXj6uyK4K7Go686Y55467nj2NITZ3WhbG0KaL281z3Lgo4WmKD0EbBEiDCeN",
        "8EBi9FMsiMLGf87ylBxi23N6y3e9o3ZagYO52NJ22iZ9v7861aZv4ok5v2gYEk7TTX94j4W1lr1fl29Cvon64Bo97imR578925gtB1qEBJp3KPRX3xcfvBIeTZiMsS06JI66tYZJFXDy0WD9lPnnO94F2CO",
        2,
        4
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "GDl6QN0nQK4QkKHOqZ5CUz4jW8Sh2U96QXsZ6ZqF7Q231Tr6I7NCsXK7k1G80b8Yv535b31I324rc06472TQ7W4Hj90X",
        "J895u0UU5",
        2,
        2
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "76xzLxk6IZkHS95KWw4HF3eE6VVRlAtys4XbP2f67Slwc1XUB1hYxK9uJ893119Af03y1YIef5bk3N0ZW6uVAUd2N1MB2I9AAO9CRO0kXemrzIhN10Tagltp4IQV57dGFhl2Nal2Bo2FymV2E7PUyArwtE4T9h5F4HZgR085C6Mv2bsdMwOj7egh2s",
        "JHh19QNiL73biZnV3Dhpvc0mas06ZiaD7MxPe3RATjjFI8yZR39ksbZAg0Wwsv558Y31hHPSpN1sHl6ru767reGdzj9dSRmjJp66vSEpuu9l3R9L3a84F1k57V2h4r",
        2,
        1
    ), (
        "The Merck Manual",
        "pdf",
        "f1aEDa2091y4LSy63BwKT5pO0R4T1",
        "9FOSSmlRZm2H08oh68SJ8Y9j52mXJR9F7uV8654P6V0r7yXVSeO30ex6425md9uRzwn36IeThe2Rp2pRFvS3tH96y2xW3w",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "DoO9Xudtd9ZTpCfJS7Yl76u5albHv1MqF5431mm0HXqB2cCNvMPdh09mI0t75HID1nwstVnKh31WDMyuuyLXmF16gb2GbrFrSQb8vF29Is67k6JlAr2g23l4661h4M7tj8dH82TlSL3zT16FJ0HAi4w3g0ZST7UFC5jYRP1p2If7q140ERljHYui18frRV",
        "7j7fs4r1plOh45KT5UdSw1U17SkQHz8RP6jBDo63UVhC3e852l6K88Q9LdftdP8i3A14562OVoH3E68Oio0A66Zmf6V",
        1,
        4
    ), (
        "The Merck Manual",
        "pdf",
        "6qsFgV48Fe88Aas9v9vvP12GdS7pgCUn23PwHQ55cT9Q8M5b0BIMTwKXqpa09g2BQn3a3M5IJeV9rp88YqwAj92k5R9K77wkV6S8R75LjOD6LAHnG53sqg5a0pJr2f3",
        "d1i4lt78zH1I3DvZ9Un2xf6XXPlJ8U83NGaoUxd33erUdo1tNtLc3I08TKUEOUhLFzH54o67cz9AQQF1xv254PcU25yp21A29HySCTemAPCb",
        1,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "y2w0aNN207FFaLLU3VioG9PeA3x5L1Wyx3nE3vkuvp2kPd067mBr9WABB2P843kbCx19EiV07a",
        "DA6QM3390k2Aj2u5oKjo0N4A8F7bvW6jQ2M0ChQ830qgJ6r7u3p1CjaQ8ZTq5787GC7wvl5C578EWf5Zy488z6M2JJ4Tbh4ajD8z9l",
        1,
        2
    ), (
        "The Merck Manual",
        "pptx",
        "5Tgas2SO485d59qRxp6T635Y5Y841Q3umW9craztLpLm3B5Gvk23SmX9tL2Db4OrqGKPVO7GZ458THVXK6IJoogP2o8AgY7PGT84aSNjD3W9EVg57eL7C3wTPQBy4Goz204T0xnh7a4377NhL09",
        "19ox0W6i56AAoVGHV2U02Z99NU6054Rac8Wa3aFy71Pa0q0R365Vwwa8Qy8twGEO64pJaf4lAzQ4pal8983a54U52m8qyL31B2gNMUL4GaV7F0y",
        1,
        4
    );