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
        `role` VARCHAR(10) NOT NULL DEFAULT 'admin',
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
        `create_time` DATE NOT NULL,
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
        FOREIGN KEY (`administrator_id`) REFERENCES `serenity`.`administrator` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
        FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`) ON DELETE CASCADE
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
        `phone` VARCHAR(20) NULL DEFAULT NULL,
        `emergency_firstname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_lastname` VARCHAR(255) NULL DEFAULT NULL,
        `emergency_phone` VARCHAR(20) NULL DEFAULT NULL,
        `role` VARCHAR(10) NOT NULL DEFAULT "patient",
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
        FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`) ON DELETE CASCADE,
        FOREIGN KEY (`patient_id`) REFERENCES `serenity`.`patient` (`id`) ON DELETE CASCADE
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
        FOREIGN KEY (`practician_id`) REFERENCES `serenity`.`practician` (`id`) ON DELETE CASCADE,
        FOREIGN KEY (`theme_ressource_id`) REFERENCES `serenity`.`theme_ressource` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`intervention_ressource` (
        `intervention_id` INT NOT NULL,
        `ressource_id` INT NOT NULL,
        FOREIGN KEY (`intervention_id`) REFERENCES `serenity`.`intervention` (`id`),
        FOREIGN KEY (`ressource_id`) REFERENCES `serenity`.`ressource` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `serenity`.`patient_intervention_ressource`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `serenity`.`patient_intervention_ressource` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intervention_patient_id` INT NOT NULL,
        `intervention_ressource_ressource_id` INT NOT NULL,
        `is_done` TINYINT NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (
            `intervention_ressource_ressource_id`
        ) REFERENCES `serenity`.`intervention_ressource` (`ressource_id`) ON DELETE CASCADE,
        FOREIGN KEY (`intervention_patient_id`) REFERENCES `serenity`.`intervention_patient` (`id`) ON DELETE CASCADE
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
VALUES (
        '12345678',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'christophe@kobalski.com',
        'Christophe',
        'Kobalski',
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
VALUES (
        '123456789',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'Louis',
        'Pasteur',
        'louis@pasteur.com',
        'Chirurgien',
        '0634567890',
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
        'Marie',
        'Strognoff',
        'marie@strognoff.com',
        'Neurochirurgienne',
        '0123456789',
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
        'Rodolphe',
        'Krueger',
        'rodolphe@krueger.com',
        'Cardiologue',
        '0123459090',
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
        create_time,
        is_read,
        is_done
    )
VALUES (
        "patient",
        "Demande de devis",
        "Je souhaiterais obtenir un devis pour une consultation générale",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "Pourriez-vous me donner plus d'informations sur les horaires de consultation?",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "J'aimerais avoir plus de détails sur l'équipement disponible dans le cabinet médical",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "J'ai des difficultés à utiliser le logiciel de gestion des patients. Pouvez-vous aider?",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "Je voudrais un devis pour une séance de physiothérapie",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "Quels sont les tarifs pour une consultation avec le spécialiste?",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "Pouvez-vous me fournir des informations sur les formations continues disponibles?",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "J'ai un problème avec la mise à jour du système. Pouvez-vous aider?",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de devis",
        "J'aimerais savoir combien coûterait une consultation pour un bilan de santé complet",
        "2023-07-04",
        0,
        0
    ), (
        "patient",
        "Demande de renseignements",
        "Est-ce que vous faites des consultations le week-end?",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de renseignements",
        "Je suis intéressé par l'achat d'un nouvel équipement. Pouvez-vous me donner plus de détails?",
        "2023-07-04",
        0,
        0
    ), (
        "practician",
        "Demande de support technique",
        "J'ai un problème avec la fonction d'impression du logiciel. Pouvez-vous aider?",
        "2023-07-04",
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
VALUES (
        'Opération des ligaments croisés gauche',
        '1h',
        'AG',
        1
    ), (
        'Abblation de l''apendice',
        '2h',
        'AL',
        1
    ), (
        'Opération de la cataracte',
        '1h30',
        'AG',
        1
    ), (
        'Arthroscopie du genou',
        '2h30',
        'AG',
        1
    ), (
        'Chirurgie des varices',
        '2h30',
        'AG',
        1
    ), (
        'Déviation de la cloison nasale',
        '1h45',
        'AL',
        1
    );

-- -----------------------------------------------------

-- INSERT INTO 'patient'

-- -----------------------------------------------------

INSERT INTO
    patient(
        mail,
        hashed_password,
        firstname,
        lastname,
        phone,
        role
    )
VALUES (
        'fabrice@coulon.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'Fabrice',
        'Coulon',
        '0612345678',
        'patient'
    ), (
        'luc@resse.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'Luc',
        'Resse',
        '0634567890',
        'patient'
    ), (
        'marjorie@louparde.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'Marjorie',
        'Louparde',
        '0123456789',
        'patient'
    ), (
        'rene@gossian.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'René',
        'Gossian',
        '0123459090',
        'patient'
    );

-- -----------------------------------------------------

-- INSERT INTO 'intervention_patient'

-- -----------------------------------------------------

INSERT INTO
    intervention_patient(
        intervention_id,
        patient_id,
        intervention_date
    )
VALUES (1, 1, '2023-07-04');

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
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        "Gray's Anatomy",
        "pptx",
        "9W1nw3vOB",
        3,
        2
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "Pz0SE4z5CyL9STu31PpFu15Jn0yn8i4hhYMl0Y1z1B7D0NX3D49TY3O4jiRo9I4xcW8v3n3sd1h930H7Jh4R2H7S4fuSmIJltTJwv4Kpzsf7Kk7z1nMdtNuEL5kiF2K8P6CV8XfmUVtLXizQ2aIe24cDah5n4uo03",
        3,
        3
    ), (
        "The Merck Manual",
        "docx",
        "n1DYdfg4KHgbxW63S9M06dAHR7h0xhWRj5H92h71FNLRX2s8WI25W9e2hMwkwU01H2jDnjub3392i3xLitmC2m36u2sEuZgnpd3Jb46Qj0jAFTmrESo3KSqfR2WN026Uj28m91N2SYH65p8e68j7U2389yb0KyEhCAYj87paB904Ymyi7X67o1KpJi962849gKTSG8MhnOC3U",
        1,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "docx",
        "LY8Z5R0TX56BEc9z39o4YCGTIsXAdCqlvz",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "ol98z50w69kFEbpI7s7iWfCM92382Oa0E1tfnR1fBKMzxQ84Ft8pm33838glgAML8dI227yc2S9z00535FNJfOwIJ40tAN8ygt5kL202778PViF2N8qNtFA5RDq076XDpAo5Cu2rmZ1Ctzbga6Z24w00F2k1JjpZO1Fsa94565BY9S2wufGmIgfo",
        3,
        4
    ), (
        "The Merck Manual",
        "avi",
        "ZyvTQSnSXmPySbl8jWC69jR45W94BXko45tc54n6Zh19hZed1IQ0o4XjyFJq9p512svIZYEyXP9j02xfXfVAD79g4i720km84p8ENDhFtICl1aKU30687j8JAv2DSpBN",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "pptx",
        "k767IRSy20J8Fh9rPFUv3p8t77oSM27RlLll5uZ1yp9oYgRiGeiNmp4woQ635x5goacmi1YNY1OO6dxHo7v22i186Ug71Lc1k3i3gK7N06wjZB81cV7zNxb1mP6qYg7L9lT3aTiWeb4Bf7PshULEEMl4f5MoAPz53rT6mf5f09368pp5AS14o3Dx7fT0rcfnwQfN2",
        2,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "e0",
        1,
        4
    ), (
        "The Merck Manual",
        "jpg",
        "8TQZK6CpI4Qle0T46DAy9Krt14H8d6JiEIB2BYI8ckK7m2uno9CZ6AU37DZp93MeVl9b45519P4m88AJDKic555WSV0bJlI3JZ7IktG6540H6fbKVKN3Adary08Q5dzHhjW78z383Q8abaw1WPhxpVnPM2245nx4B2",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "e78gkx4N06vjdXgG8G7k3WB2ZywfB06i0z2RIzo8VOPhRY61Q0j77DK9eh5t3Yc5Wjn69XQ6aQg1cX85onFC4p6GjU5BDhPDFh3ln84GCczUKd412RDO76",
        2,
        1
    ), (
        "Harrison's Principles of Internal Medicine",
        "pptx",
        "0lQ1G219T4jyo4HJLROHKNXB8jo70jFQlqZHN9D606f43V6zAr5N34v7MT7grBQ9nfFYKY5Nu8h8o6swzFwhAfrmn5d4t2sWmTu4tcq4cSL00eo04s2CXf6ipLH06l7D3uRinKV78nEF2xC452Teb1soGqDR52Vkq5vnDcELNpzk0Dys51tPPNux4Wiad0MA25nmx3mI6329cAn806gzo187k",
        3,
        3
    ), (
        "The Merck Manual",
        "mp4",
        "0IIc199qUvbveifYqIhT",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "A65BV",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "jpg",
        "0m6DB0dV7Rp47bBXG7U4sP7mJFA01Z7qpD47U96RFj4CoBc431DV6w21gQq6DZ64CE0UKOnb11QAP4W0JJ8QpiPJi88sxVODCMs32rr1Lq13luF2se9H4KRv146F08IvvKdYkK7R41m4c9Eo2p66uC3v0j8rS6fOjzosmgJVnSaJvesFR9yu470y5HtPrXpmq9qGs02HHx2076HFZ48U7zR3BZ3jI09A49",
        2,
        1
    ), (
        "Gray's Anatomy",
        "docx",
        "93vW1fcOjj27jw0yk7VXyC9l1ue7aJh1R55wVlZm7C03mi73p71C8j5dlZ97oO4bxa5gBno88CT32hncXqDQ0191B75AitkpdfG014Fco607OxDt0T2Nz39kBbVGMzcfYjf11Y30VdC5cZiIYQeis74E71f2wQF56x1mkY0f1eb49iC11l70YY8i6z1qT7NLDgPB88rDAi8F6U24x1O27W732L94DAJ4fLPyj0Q9oJo3",
        3,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "jHTY10aF7zqVM3pZFEJC7Qn43khiWv3vI95RA4Iqxjj3kOw8j9Bw1136oB2Vj2hzmJ5V0tdVfW1WEA9us0mWDGO",
        2,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "b6aYH93CMG0NoRY1x87jK7p46h3Ipgx5l5D7pZf9wXq4PfG648Pfkn5GUU5uz1Nb9O8TuGllWp7U3gFhSL49WHSy21F4vhkjb4e4Cyc86trnoyiNF84m56YTz",
        1,
        3
    ), (
        "Gray's Anatomy",
        "pptx",
        "le87MLVH8kxpEb1v2SB4vaVDCiFyPq1rdJ78WAO2534YSlFhRmqk1fOMWFA7ZD41w91X015N2",
        1,
        3
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "uZQW17f0WX5Y7N8dS64UOd8Fpk5okJ9Fx42wHx0bCP4Vy9EowuE8vgtxzipkkXvdEl1tWij4c3RG1cnIy336TBNy0RD125KFJ0BuZstk3HLzMoxwu9U9a53j8tIKhKpA8EgK4eS2p1oB5U7nXLYgy7Fgj0bl5ozeyQLXILZ9VUuVF41L8bsL97nMbaFST8ImU2",
        1,
        5
    ), (
        "Gray's Anatomy",
        "png",
        "FouF5V8oAYKEp7I4a5n40NN47HA1WuH7D8xOjX18W9PEtP6M0mjEZ7jt007jlez51a7h8fQ31NECcU1jaC7q804QE8656SQ0xvW3HhgTrC8IBW8uZyH8X4CTCH76a4MTfUxl482IR0a3z3cPtz9bl6YaX71n6M25WZ1jNY61gk13076mC2W9R6c9A96nZ9",
        1,
        5
    ), (
        "Gray's Anatomy",
        "pdf",
        "MCzleONN1krMU4zg1xJhhRWd8npbUunG9uw3317Qo8HXi8SZqP207l9mR8svnP12Rv7D9N9vf03bQ0xuYaK48ll1FWoXJbnESfnXF19N5N0ch1y1xuqeY1l5NgNNP9038n8lXlzm6ZJXG20EGw39eiR6ze46hu5iji4CPxcAY0Mw5R90S0AdKHxyLvVbn57PW3iYjziE8Rfx344qLrbG37TDDnm4Uj1304jZ7h0jgu",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "avi",
        "eFpyDV29OUTA0RM84qJbsFb8XmV6Z6slsMohZ1sKOeoKtTG349pV9G7L7brg8kM1JHaGQsWTOC26U0p4AB02KZIRPuIaI39r500LfavI3al1jan7FO65oIM1Y045zU62",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "im44202h2560f3iC1qUkJzujlWr4J6A18T40ODKkh8AHb6HocL1Ul3Hi711RZD8g281o87K58mkc4Q71B8lM3eDPt6MOs",
        3,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "0dD5HTshFyTcQpE44Cb4e8qjiVBeE6EB2kBTo72Xh9B32d180a6P8008b5J8796h9El3z37w1i",
        2,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "png",
        "3m6QFk1ClAzn3I7On5Lbhu0wtoILiGXv566MRg59Wlbm6iGDD3Pwk4Ixr92VEvF223Ce97Ea2eF8Wv1ZiWRcb62o18f3r6CwW7oy6fU7j8x4o0Oqi6MA5RH71ff7m5c0oDmKm1RC13X42AIW1Mho7uy5tHMOAYtTxJgX1mJwDEte8GntQG2W206pDbdMNniEqUU33B1qrs0N7ApHJ16138",
        1,
        1
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "Y",
        2,
        1
    ), (
        "The Merck Manual",
        "pptx",
        "5i73UwLx35Bkg15V5J4k37Z355HkZU91S0w87bPHt971X2U3k8V9l31JBVAFPKDyxnJ74K1f4bllQS41cE3JtUnI212hC4QpD8U3UZAoX04h9LJce3ic70u2Mo4r71QLXf2p0wuV4rDbLsCv2UmYRdAjTE9sBuTOhZqndzqgll54fnpyVkHaN4kS1lmZCbDC058dknCQ8fXn4u0rIHqPC9418zOpp22MZ8",
        1,
        2
    ), (
        "The Merck Manual",
        "png",
        "121eBsfH77kMnFih1L5L3u3G9jRd4T8A5F64k58Jg4qx9TPX6bJ1o8YHC9vllGv0L9f0r09cznA6x7gsgU9nP35x1rK1fru815S8dMV1r70",
        2,
        5
    ), (
        "Gray's Anatomy",
        "mp4",
        "v8Zxv1n4iIb82H85C8r6Qrpd9gF01roRX2064jEqeHIdRd82aoooV1iZt1JKL74T28j6vGIj5dYEKy7i6npy1M8RTUujj2355k5aZ8yaWtSVLMQ6k87704yJFNd1u9uq01Fj1t7PkZNd1jH1Tw2ZU4k5EO31XZ0q8feBx0CjFl8mSKJ2914zI7JCxP09224Mi7irqg542kWqLIuybHC034Ne492305bXK8hD33J",
        3,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "png",
        "0JG6uxV3bRMZYTq1031BLq9s4hIhYxNxAY0dZOXD98Po9RAX3cq781ZebZpQgd2TWnl93E7Xy9P3z6ls01AO1O886ldDAm9K6s2N19b6GR97S6Evm31adkPU6GyqCC2gt23HL3Y69KDOj322VYHbvBuJL06iN7N2j8z4Fet1wVl08blz177",
        3,
        1
    ), (
        "Gray's Anatomy",
        "jpg",
        "XkfYemc8JeyJsNeg77D6c5DJ2ZwTBc42RxkuIy46km7j3U15g0KK03DR1ZwWY5l8TV25R089IH5EmJ36V9jSg31XKbe91IST6W1yMHDDsO8DmIRPa2KgQLj6LMc2CTPF0q3vpl06p99mnTn167X4bk5x657wVATawr6I8LpN9N6Mc6pfer65V5409",
        3,
        5
    ), (
        "The Merck Manual",
        "docx",
        "6z0pF5UCK5X572mLP5vUZHp7I4bx7x4833ZU7Z5V1DUgA85F3RwFDCKH5QW3c8w5N5ZHPes7U6gbx5t4WYH1Msi6s8EASthHt7KvsLUO58b80LRQS85D",
        3,
        3
    ), (
        "Gray's Anatomy",
        "docx",
        "B5r463bF7iYSbdrDklL49dOR7c8f3IKC2BflT1ah93wASSisj2UX9w58jOy25DU17YbDbB2J8QowmL32v67xtL0KR3JOOtyVv5057K8Cu184i5piF7HM2q3Mqs5WyKd5Kp23Mv6wNKBg0t88i90h47Nxfn3x6R4z4WHEj",
        1,
        5
    ), (
        "Current Medical Diagnosis and Treatment",
        "docx",
        "A1C093EXRArm76ua803vd8RJIpJPu2Jr9Hz9632S60D58aJ66dbzP71bo71l30yHx1ak1V7Hp2F05327U11jCHp6qu7V29WojDk5xtAc6UZW3O1",
        2,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "n0ATKIxf4c6t3J4mJ0nE6X0Mh7P219Tskiukrw4WpWyTn4X5sZyyZy0z11859gTe84qhJBWDJM01a9k1335X0ONASM35NyX82IgGfzB1Ii6JFK3TaDNir7kr8lh91T9aYVWeI9EJEIA5TwtizyhXwIrw4a05F7Yboss142Shx9oHie3Y5GzeD40sbN5nFh27J60itBXzthWDS0ia67WU78",
        1,
        3
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "png",
        "gt3zQrG62kKkhKn6ryDMxB69Cx1jf2YRYp29ef3LtyTaNl952Do0EH532jLKc3oVe5OCJH4C60178usHUdlFoD52b5os7ygeEP3mFq3068gc1Kr5N4B7Rh202Wl71HH2o41mJB0S2Jb218f7PTYw42vs5t2b07Q82Ybn7gKX8k1Z347D3c92G9pC3cs70LPLXCfp1VbvNq5f46smLhKOczXk8tyb",
        3,
        2
    ), (
        "Gray's Anatomy",
        "pptx",
        "89I9Is5p61TfO1meV5OFHh0Bja9KbYyBm8KBgU766sdJ536EN0EB39Kx0X1oB91V4Z7py",
        2,
        4
    ), (
        "Gray's Anatomy",
        "avi",
        "GQ9Z9rx0zS412Kz29dh7P4HGC",
        2,
        3
    ), (
        "Gray's Anatomy",
        "pdf",
        "b89SDvBcPEMMXFuGO7v10pM1lvEZJBfc3v6v9fueA4uA7J3tsGy049cf3N0F0Skoy8m7ph55kqU12BN8T9J20qz1sLXS6S49ehB08E8pAal8ahZRI38b2BivK8HmUD2wVP2q6U0f4R7yp",
        3,
        5
    ), (
        "Harrison's Principles of Internal Medicine",
        "mp4",
        "fz52O232w0f9Z3P9AC3g45c",
        1,
        4
    ), (
        "Harrison's Principles of Internal Medicine",
        "pdf",
        "DRdSNByL9rGedFk5lsMKKQ7Yyi9h1R4g9v3T5e64y4egQr9vSR",
        1,
        1
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "avi",
        "C6m3lmIbSn2s9zb9BhEjyHp7p0354XvIWju79os45uZ7q2FibEd9nTe3rZf070hA12J57Ef96DC071Aj61bkCd1VyaN998CRH29z8wU5OX26l3BG8Zzh98s7Bx12SPeLf2RptHEc269rppl662hIv5fa5Chg3lj1aApvyHZjIAPkUVZu4Xf6gewnv1Z7fj1VYXeFqNFibHf9qT2NfJBk5oPydcWR2V4FZTWd884uGea27D",
        2,
        5
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "8EBi9FMsiMLGf87ylBxi23N6y3e9o3ZagYO52NJ22iZ9v7861aZv4ok5v2gYEk7TTX94j4W1lr1fl29Cvon64Bo97imR578925gtB1qEBJp3KPRX3xcfvBIeTZiMsS06JI66tYZJFXDy0WD9lPnnO94F2CO",
        2,
        4
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "J895u0UU5",
        2,
        2
    ), (
        "Robbins and Cotran Pathologic Basis of Disease",
        "docx",
        "JHh19QNiL73biZnV3Dhpvc0mas06ZiaD7MxPe3RATjjFI8yZR39ksbZAg0Wwsv558Y31hHPSpN1sHl6ru767reGdzj9dSRmjJp66vSEpuu9l3R9L3a84F1k57V2h4r",
        2,
        1
    ), (
        "The Merck Manual",
        "pdf",
        "9FOSSmlRZm2H08oh68SJ8Y9j52mXJR9F7uV8654P6V0r7yXVSeO30ex6425md9uRzwn36IeThe2Rp2pRFvS3tH96y2xW3w",
        2,
        2
    ), (
        "Current Medical Diagnosis and Treatment",
        "pptx",
        "7j7fs4r1plOh45KT5UdSw1U17SkQHz8RP6jBDo63UVhC3e852l6K88Q9LdftdP8i3A14562OVoH3E68Oio0A66Zmf6V",
        1,
        4
    ), (
        "The Merck Manual",
        "pdf",
        "d1i4lt78zH1I3DvZ9Un2xf6XXPlJ8U83NGaoUxd33erUdo1tNtLc3I08TKUEOUhLFzH54o67cz9AQQF1xv254PcU25yp21A29HySCTemAPCb",
        1,
        1
    ), (
        "Gray's Anatomy",
        "png",
        "DA6QM3390k2Aj2u5oKjo0N4A8F7bvW6jQ2M0ChQ830qgJ6r7u3p1CjaQ8ZTq5787GC7wvl5C578EWf5Zy488z6M2JJ4Tbh4ajD8z9l",
        1,
        2
    ), (
        "The Merck Manual",
        "pptx",
        "19ox0W6i56AAoVGHV2U02Z99NU6054Rac8Wa3aFy71Pa0q0R365Vwwa8Qy8twGEO64pJaf4lAzQ4pal8983a54U52m8qyL31B2gNMUL4GaV7F0y",
        1,
        4
    );

INSERT INTO
    ressource(
        title,
        `type`,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Carte d''identité',
        'checkbox',
        'Obligatoire',
        1,
        5
    );

INSERT INTO
    ressource(
        title,
        `type`,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Carte vitale',
        'checkbox',
        'Obligatoire',
        1,
        5
    );

INSERT INTO
    ressource(
        title,
        `type`,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Moyen de paiement',
        'checkbox',
        'Obligatoire',
        1,
        5
    );

INSERT INTO
    ressource(
        title,
        description,
        practician_id,
        theme_ressource_id,
        `type`
    )
VALUES (
        'Attestation anesthésiste',
        'Obligatoire',
        1,
        5,
        'checkbox'
    );

INSERT INTO
    ressource(
        title,
        `type`,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Carnet de vaccination',
        'checkbox',
        'Obligatoire et à jour',
        1,
        5
    );

INSERT INTO
    ressource(
        title,
        `type`,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Attestation mutuelle',
        'checkbox',
        'Si possédé',
        1,
        5
    );

INSERT INTO
    ressource(
        title,
        practician_id,
        theme_ressource_id
    )
VALUES ('Kinésithérapeute', 1, 4), ('Psychologue', 1, 4), ('Nutritioniste', 1, 4), ('Infirmière', 1, 4);

INSERT INTO
    ressource(
        title,
        description,
        practician_id,
        theme_ressource_id
    )
VALUES (
        'Les ligaments croisés',
        'Les ligaments ont pour rôle de relier les deux os d''une articulation afin d''éviter une laxité trop importante de cette dernière, c''est-à-dire qu''elle aille dans tous les sens. Les ligaments participent également à l''''orientation des mouvements de l''articulation. L''insertion des ligaments sur l''''os va donner une structure rigide de l''articulation.',
        1,
        1
    ), (
        'Comment se déroule mon intervention',
        'Lors de l''intervention, le ligament croisé déchiré est stabilisé puis refixé à l''aide d''un fil solide. On procède ensuite à une suture du ligament croisé précédemment déchiré afin de soutenir l''auto-guérison. L''opération a lieu sous arthroscopie et est par conséquent mini-invasive. Les lésions associées (déchirure du ménisque ou lésion du cartilage) peuvent être traitées lors de la même opération.',
        1,
        1
    ), (
        'Etre à jeun ',
        'Ne rien boire, ni manger (même pas un chewing-gum), ni fumer, durant les 8 heures qui précèdent l''intervention.',
        1,
        3
    ), (
        'Consigne pour prendre une douche préoperatoire',
        'Une douche si possible avec un savon désinfectant, type « bétadine », selon la prescription médicale
 Les étapes à suivre pour une douche pré-opératoire efficace :
Enlever le vernis, couper et curer les ongles.
Se mouiller le corps et les cheveux.
Appliquer le savon antiseptique - Commencer par les cheveux.
Faire mousser jusqu’à ce que la mousse blanchisse. 
Laver le visage et le cou en insistant derrière les oreilles.
Insister sur les aisselles, le nombril, les plis de l’aine et les pieds.
Savonner en dernier la région génitale, puis anale.
Rincer de haut en bas. Renouveler la toilette (étapes 2 à 8), puis rincer.
Se sécher avec un serviette propre, mettre des vêtements propres.',
        1,
        3
    ), (
        'Quelques conseils pré-operatoires',
        'Vous devez réaliser la préparation cutanée conformément au document qui vous a été remis par votre chirurgien. 

Attention, le rasage au rasoir mécanique du site opératoire est interdit ; il entraîne nécessairement le report de votre intervention. 
Les ongles des mains et des pieds doivent être brossés et sans vernis à ongles. 
Les bijoux sont interdits (y compris les piercings) ainsi que le maquillage. 
Vous devez arriver avec les dents brossées, les cheveux propres et attachés.',
        1,
        3
    );

INSERT INTO
    ressource(
        title,
        practician_id,
        theme_ressource_id
    )
VALUES
(
        'Compléter l''espace ''Mon compte''',
        1,
        2
    ), (
        'Votre retour de mutuelle',
        1,
        2
    ), ('Consentement éclairé', 1, 2), (
        'Consultation pré-anesthésique',
        1,
        2
    );

INSERT INTO
    intervention_ressource(intervention_id, ressource_id)
VALUES (1, 51), (1, 52), (1, 53), (1, 54), (1, 55), (1, 56), (1, 57), (1, 58), (1, 59), (1, 60), (1, 61), (1, 62), (1, 63), (1, 64), (1, 65), (1, 66), (1, 67), (1, 68), (1, 69);

INSERT INTO
    patient_intervention_ressource(
        intervention_patient_id,
        intervention_ressource_ressource_id,
        is_done
    )
VALUES (1, 51, 0), (1, 52, 0), (1, 53, 0), (1, 54, 0), (1, 55, 0), (1, 56, 0), (1, 57, 0), (1, 58, 0), (1, 59, 0), (1, 60, 0), (1, 61, 0), (1, 62, 0), (1, 63, 0), (1, 64, 0), (1, 65, 0), (1, 66, 0), (1, 67, 0), (1, 68, 0), (1, 69, 0);